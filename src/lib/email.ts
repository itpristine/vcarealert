interface SendMailOptions {
  to?: string;
  subject: string;
  text?: string;
  html?: string;
  message?: string;
}

const DEFAULT_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwyO0SdcGlfxWmLVDD_E_1t__VSNKE3WiQ0af420Fe2HtJLhW9UFzumO_gQ_nbeW_Cp/exec";

export async function sendEmail({ to, subject, text, html, message }: SendMailOptions) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || DEFAULT_SCRIPT_URL;
  const recipient = to || process.env.EMAIL_TO || "leads@vcarealert.com";
  const emailContent = html || message || (text ? text.replace(/\n/g, "<br>") : "");

  if (!emailContent) {
    throw new Error("Neither html, text, nor message body was provided for sendEmail");
  }

  const response = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: recipient,
      subject: subject,
      message: emailContent,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`Google Apps Script email request failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json().catch(() => null);
  return data;
}
