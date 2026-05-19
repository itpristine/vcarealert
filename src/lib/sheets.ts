import { google } from "googleapis";

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureHeaders(sheetName: string, headers: string[]) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:1`,
  });

  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
  }
}

export async function appendQuoteRow(row: string[]) {
  const headers = [
    "Date & Time",
    "First Name",
    "Last Name",
    "Age",
    "Gender",
    "Phone Number",
    "Email Address",
    "Street Address",
    "City",
    "State",
    "Zip Code",
    "Device",
    "Mobility Issues",
    "Searching for Device",
    "Heard About Us",
    "Comments",
    "Page URL",
    "Remote IP",
  ];

  await ensureHeaders("Sheet1", headers);

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    range: "Sheet1!A2",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function appendLeadRow(row: string[]) {
  const headers = [
    "First Name",
    "Last Name",
    "Age",
    "Gender",
    "Phone Number",
    "Email Address",
    "Street Address",
    "City",
    "State",
    "Zip Code",
    "Mobility Issues",
    "Searching for Device",
    "Service ID",
    "Submission Date",
    "Page URL",
    "IP Address",
  ];

  await ensureHeaders("Sheet1", headers);

  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID!,
    range: "Sheet1!A2",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}
