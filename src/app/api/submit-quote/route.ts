import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

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

    // 1. Send Email Notification
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: Number(process.env.EMAIL_PORT) || 587,
          secure: Number(process.env.EMAIL_PORT) === 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"vCareAlert System" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Lead: ${firstName} ${lastName} - ${device}`,
          text: `
New Quote Request Received:

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
Remote IP: ${remoteIp}
          `,
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // We continue even if email fails, to try saving to Google Sheets
      }
    }

    // 2. Update Google Sheets
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          },
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
          range: "Sheet1!A1", // Make sure this matches the sheet name
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [
              [
                date,
                firstName,
                lastName,
                age,
                gender,
                phoneNumber,
                emailAddress,
                streetAddress,
                city,
                state,
                zipCode,
                device,
                mobilityIssues,
                searchingForDevice,
                heardAboutUs,
                comments || "",
                pageUrl,
                remoteIp
              ],
            ],
          },
        });
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
