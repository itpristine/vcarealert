import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendMailOptions) {
  const user = process.env.GMAIL_USER || process.env.EMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;

  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!user) {
    throw new Error("GMAIL_USER (or EMAIL_USER) environment variable is not configured");
  }

  let transporter: nodemailer.Transporter;

  if (clientId && clientSecret && refreshToken) {
    // Google OAuth2 Authentication
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken,
      },
    });
  } else if (pass) {
    // Gmail App Password / SMTP Authentication
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  } else {
    throw new Error(
      "Missing Google authentication credentials. Please set GMAIL_APP_PASSWORD or Google OAuth2 variables (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN) in your environment."
    );
  }

  await transporter.sendMail({
    from: user,
    to,
    subject,
    text,
    html,
  });
}

