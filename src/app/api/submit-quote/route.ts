import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { appendQuoteRow } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      firstName, lastName, age, gender, phoneNumber, emailAddress,
      streetAddress, city, state, zipCode,
      device, mobilityIssues, searchingForDevice, heardAboutUs, comments, pageUrl
    } = data;

    const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const remoteIp = req.headers.get("x-forwarded-for") || req.headers.get("remote-addr") || "Unknown IP";

    // 1. Send Email Notification via Microsoft Graph API
    if (process.env.EMAIL_USER && process.env.AZURE_CLIENT_ID) {
      try {
        await sendEmail({
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Lead: ${firstName} ${lastName} - ${device}`,
          text: `New Quote Request Received:

First Name: ${firstName}
Last Name: ${lastName}
Age: ${age}
Gender: ${gender}
Phone Number: ${phoneNumber}
Email Address: ${emailAddress}

Street Address: ${streetAddress}
City: ${city}
State: ${state}
Zip Code: ${zipCode}

Device Interested In: ${device}
Mobility Issues: ${mobilityIssues}
Searching for Device: ${searchingForDevice}
Heard About Us: ${heardAboutUs}

Comments: ${comments || "None"}

Date & Time: ${date}
Page URL: ${pageUrl}
Remote IP: ${remoteIp}`,
        });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    // 2. Update Google Sheets
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      try {
        await appendQuoteRow([
          date, firstName, lastName, age, gender, phoneNumber, emailAddress,
          streetAddress, city, state, zipCode, device, mobilityIssues,
          searchingForDevice, heardAboutUs, comments || "", pageUrl, remoteIp,
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
