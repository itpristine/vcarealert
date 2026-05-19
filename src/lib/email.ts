async function getAccessToken(): Promise<string> {
  const tenantId = process.env.AZURE_TENANT_ID;
  const clientId = process.env.AZURE_CLIENT_ID;
  const clientSecret = process.env.AZURE_CLIENT_SECRET;
  const refreshToken = process.env.AZURE_REFRESH_TOKEN;

  if (!tenantId || !clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Azure OAuth2 environment variables");
  }

  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
        scope: "https://graph.microsoft.com/Mail.Send offline_access",
      }).toString(),
    }
  );

  const data = await response.json();

  if (data.error) {
    throw new Error(`OAuth2 token error: ${data.error_description || data.error}`);
  }

  return data.access_token;
}

interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendMailOptions) {
  const user = process.env.EMAIL_USER;
  if (!user) throw new Error("EMAIL_USER is not configured");

  const accessToken = await getAccessToken();

  const message: Record<string, unknown> = {
    subject,
    toRecipients: [{ emailAddress: { address: to } }],
  };

  if (html) {
    message.body = { contentType: "HTML", content: html };
  } else if (text) {
    message.body = { contentType: "Text", content: text };
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/me/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, saveToSentItems: false }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Graph API sendMail failed (${response.status}): ${errorBody}`);
  }
}
