import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { usStates } from "@/lib/quote-validation";

const leadTypes = [
  "VCare Alert",
  "Durable Medical Equipment",
  "Reverse Mortgage",
  "Senior Insurance",
  "Walk-In Bathtubs",
  "Final Expense",
  "Home Security",
  "Genetic Testing",
  "Other",
] as const;

const requestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  companyName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  leadType: z.enum(leadTypes),
  otherIndustry: z.string().trim().max(120).optional(),
  targetLocation: z.array(
    z.string().refine((code) => usStates.some((state) => state.code === code))
  ).min(1, "Select at least one target state.").max(usStates.length).refine(
    (states) => new Set(states).size === states.length,
    "Remove duplicate target states."
  ),
  leadCount: z.coerce.number().int().min(1).max(10_000_000),
  requirements: z.string().trim().max(2000).optional(),
  recaptchaToken: z.string().optional(),
}).refine(
  (data) => data.leadType !== "Other" || Boolean(data.otherIndustry && data.otherIndustry.length >= 2),
  { path: ["otherIndustry"], message: "Please specify the industry." }
);

type RecaptchaVerificationResponse = {
  success: boolean;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string, remoteIp: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { success: false, "error-codes": ["missing-input-secret"] } as RecaptchaVerificationResponse;
  }

  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "Unknown IP") {
    params.append("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  if (!response.ok) {
    throw new Error(`reCAPTCHA verification request failed with status ${response.status}`);
  }
  return (await response.json()) as RecaptchaVerificationResponse;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Please submit a valid request." },
      { status: 400 }
    );
  }

  const parsed = requestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Please check the required fields and try again." },
      { status: 400 }
    );
  }

  const data = parsed.data;
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
    if (!data.recaptchaToken) {
      return NextResponse.json(
        { success: false, error: "Please complete the reCAPTCHA before submitting." },
        { status: 400 }
      );
    }

    try {
      const forwardedFor = req.headers.get("x-forwarded-for");
      const remoteIp = forwardedFor?.split(",")[0]?.trim() || req.headers.get("remote-addr") || "Unknown IP";
      const verification = await verifyRecaptcha(data.recaptchaToken, remoteIp);
      if (!verification.success) {
        console.error("Lead generation reCAPTCHA verification failed:", verification["error-codes"]);
        return NextResponse.json(
          { success: false, error: "reCAPTCHA verification failed. Please try again." },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Lead generation reCAPTCHA request failed:", error);
      return NextResponse.json(
        { success: false, error: "Unable to verify reCAPTCHA. Please try again." },
        { status: 502 }
      );
    }
  }

  const leadType = data.leadType === "Other"
    ? `Other: ${data.otherIndustry}`
    : data.leadType;
  const details = [
    ["Name", data.name],
    ["Company", data.companyName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Type of leads", leadType],
    ["Target states", data.targetLocation
      .map((code) => usStates.find((state) => state.code === code)?.name ?? code)
      .join(", ")],
    ["Number of leads", String(data.leadCount)],
    ["Additional requirements", data.requirements || "None provided"],
    ["Date & time", new Date().toLocaleString("en-US", { timeZone: "America/New_York" })],
  ];
  const html = `
    <h2>New Lead Generation Quotation Request</h2>
    <ul>
      ${details.map(([label, value]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</li>`).join("")}
    </ul>
  `;

  try {
    await sendEmail({
      to: process.env.EMAIL_TO || "leads@vcarealert.com",
      subject: `Lead Generation Quote Request: ${data.companyName.replace(/[\r\n]/g, " ")}`,
      html,
    });
  } catch (error) {
    console.error("Lead generation quotation email failed:", error);
    return NextResponse.json(
      { success: false, error: "We couldn't submit your request. Please try again or contact us directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
