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

  let error;

  if (html) {
    const res = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(text ? { text } : {}),
    });
    error = res.error;
  } else if (text) {
    const res = await resend.emails.send({
      from,
      to,
      subject,
      text,
    });
    error = res.error;
  } else {
    throw new Error("Neither html nor text body was provided for sendEmail");
  }

  if (error) {
    throw new Error(`Resend failed to send email: ${error.message}`);
  }
}



