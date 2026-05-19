import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { appendLeadRow } from "@/lib/sheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, age, gender, phoneNumber, emailAddress,
      streetAddress, city, state, zipCode,
      mobilityIssues, searchingForDevice, serviceId
    } = body;

    const pageUrl = request.headers.get("referer") || "Unknown";
    const ipAddress = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
    const submissionDate = new Date().toISOString();

    // 1. Send Email via Microsoft Graph API
    if (process.env.EMAIL_USER && process.env.AZURE_CLIENT_ID) {
      try {
        await sendEmail({
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Lead for ${serviceId}: ${firstName} ${lastName}`,
          html: `
            <h2>New Lead Submission</h2>
            <h3>Personal Information</h3>
            <ul>
              <li><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Age:</strong> ${age}</li>
              <li><strong>Gender:</strong> ${gender}</li>
              <li><strong>Phone:</strong> ${phoneNumber}</li>
              <li><strong>Email:</strong> ${emailAddress}</li>
            </ul>
            <h3>Address</h3>
            <p>${streetAddress}, ${city}, ${state} ${zipCode}</p>
            <h3>Qualifying Questions</h3>
            <ul>
              <li><strong>Mobility Issues:</strong> ${mobilityIssues}</li>
              <li><strong>Searching for Device:</strong> ${searchingForDevice}</li>
            </ul>
            <hr />
            <p><strong>Service Requested:</strong> ${serviceId}</p>
            <p><strong>Submission Date:</strong> ${submissionDate}</p>
            <p><strong>Page URL:</strong> ${pageUrl}</p>
            <p><strong>IP Address:</strong> ${ipAddress}</p>
          `,
        });
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    } else {
      console.warn("Email credentials not configured.");
    }

    // 2. Log to Google Sheets
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      try {
        await appendLeadRow([
          firstName, lastName, age, gender, phoneNumber, emailAddress,
          streetAddress, city, state, zipCode,
          mobilityIssues, searchingForDevice, serviceId,
          submissionDate, pageUrl, ipAddress,
        ]);
        console.log("Logged to Google Sheets successfully");
      } catch (sheetsError) {
        console.error("Error logging to Google Sheets:", sheetsError);
      }
    } else {
      console.warn("Google Sheets credentials not configured.");
    }

    return NextResponse.json({ success: true, message: "Lead submitted successfully" });
  } catch (error) {
    console.error("Submission API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process lead" },
      { status: 500 }
    );
  }
}
