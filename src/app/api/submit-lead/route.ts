import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

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

    // 1. Send Email using Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail", // Or your preferred service
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self or a designated sales inbox
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
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue even if email fails so we can try sheets
      }
    } else {
      console.warn("Email credentials not configured.");
    }

    // 2. Log to Google Sheets
    if (process.env.GOOGLE_SHEETS_CLIENT_EMAIL && process.env.GOOGLE_SHEETS_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      try {
        // Handle escaped newlines in private key
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n');
        
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            private_key: privateKey,
          },
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: "Sheet1!A:N", // Adjust if your sheet name is different
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                firstName, lastName, age, gender, phoneNumber, emailAddress,
                streetAddress, city, state, zipCode,
                mobilityIssues, searchingForDevice, serviceId,
                submissionDate, pageUrl, ipAddress
              ],
            ],
          },
        });
        console.log("Logged to Google Sheets successfully");
      } catch (sheetsError) {
        console.error("Error logging to Google Sheets:", sheetsError);
        // We log the error but still return success to the user so they see the success page
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
