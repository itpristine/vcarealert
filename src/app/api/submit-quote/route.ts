import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { appendQuoteRow } from "@/lib/sheets";
import { quoteSubmissionSchema } from "@/lib/quote-validation";

type RecaptchaVerificationResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string, remoteIp: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { success: false, "error-codes": ["missing-input-secret"] } as RecaptchaVerificationResponse;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp && remoteIp !== "Unknown IP") {
    params.append("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  return (await response.json()) as RecaptchaVerificationResponse;
}

export async function POST(req: Request) {
  try {
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Please submit a valid request." },
        { status: 400 }
      );
    }

    const parsed = quoteSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message || "Please check the form and try again.",
        },
        { status: 400 }
      );
    }

    const {
      firstName, lastName, age, gender, phoneNumber, emailAddress,
      streetAddress, city, state, zipCode,
      device, mobilityIssues, searchingForDevice, heardAboutUs, comments, pageUrl,
      recaptchaToken
    } = parsed.data;

    const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const forwardedFor = req.headers.get("x-forwarded-for");
    const remoteIp = forwardedFor?.split(",")[0]?.trim() || req.headers.get("remote-addr") || "Unknown IP";

    const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaConfigured = Boolean(recaptchaSiteKey && recaptchaSecret);
    const recaptchaMisconfigured = Boolean(recaptchaSiteKey || recaptchaSecret) && !recaptchaConfigured;

    if (recaptchaMisconfigured) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA is not configured correctly." },
        { status: 500 }
      );
    }

    if (recaptchaConfigured) {
      if (!recaptchaToken) {
        return NextResponse.json(
          { success: false, error: "Please complete the reCAPTCHA before submitting." },
          { status: 400 }
        );
      }

      const verification = await verifyRecaptcha(recaptchaToken, remoteIp);
      if (!verification.success) {
        console.error("reCAPTCHA verification failed:", verification["error-codes"]);
        return NextResponse.json(
          { success: false, error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    }

    const escapeHtml = (value: string) =>
      value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        };
        return entities[character];
      });
    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeDevice = escapeHtml(device);

    // 1. Send Email Notification via Google Apps Script
    try {
      await sendEmail({
        to: process.env.EMAIL_TO || "leads@vcarealert.com",
        subject: `New Quote Request: ${firstName} ${lastName} - ${device}`.replace(/[\r\n]/g, " "),
        html: `
          <h2>New Quote Request Received</h2>
          <h3>Personal Information</h3>
          <ul>
            <li><strong>Name:</strong> ${safeFirstName} ${safeLastName}</li>
            <li><strong>Age:</strong> ${escapeHtml(age)}</li>
            <li><strong>Gender:</strong> ${escapeHtml(gender)}</li>
            <li><strong>Phone:</strong> ${escapeHtml(phoneNumber)}</li>
            <li><strong>Email:</strong> ${escapeHtml(emailAddress)}</li>
          </ul>
          <h3>Address</h3>
          <p>${escapeHtml(streetAddress)}, ${escapeHtml(city)}, ${escapeHtml(state)} ${escapeHtml(zipCode)}</p>
          <h3>Device & Needs</h3>
          <ul>
            <li><strong>Device Interested In:</strong> ${safeDevice}</li>
            <li><strong>Mobility Issues:</strong> ${escapeHtml(mobilityIssues)}</li>
            <li><strong>Searching for Device:</strong> ${escapeHtml(searchingForDevice)}</li>
            <li><strong>Heard About Us:</strong> ${escapeHtml(heardAboutUs)}</li>
            <li><strong>Comments:</strong> ${escapeHtml(comments || "None")}</li>
          </ul>
          <hr />
          <p><strong>Date & Time:</strong> ${escapeHtml(date)}</p>
          <p><strong>Page URL:</strong> ${escapeHtml(pageUrl || "Not provided")}</p>
          <p><strong>Remote IP:</strong> ${escapeHtml(remoteIp)}</p>
        `,
      });
      console.log("Quote email sent successfully via Google Apps Script");
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
    }

    // 2. Update Google Sheets
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      try {
        await appendQuoteRow([
          date, firstName, lastName, age, gender, phoneNumber, emailAddress,
          streetAddress, city, state, zipCode, device, mobilityIssues,
          searchingForDevice, heardAboutUs, comments || "", pageUrl || "", remoteIp,
        ]);
      } catch (sheetsError) {
        console.error("Google Sheets append failed:", sheetsError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
