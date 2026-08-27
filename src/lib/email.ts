import { Resend } from "resend";

interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendMailOptions) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not configured");
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || process.env.EMAIL_FROM || "onboarding@resend.dev";

  const payload: {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  } = {
    from,
    to,
    subject,
  };

  if (html) {
    payload.html = html;
  }
  if (text) {
    payload.text = text;
  }

  const { error } = await resend.emails.send(payload);

  if (error) {
    throw new Error(`Resend failed to send email: ${error.message}`);
  }
}


