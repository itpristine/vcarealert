/**
 * One-time script to obtain a Microsoft OAuth2 refresh token for SMTP.
 * It will update the .env file directly with the refresh token.
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL } from "node:url";
import { exec } from "node:child_process";

const ENV_PATH = path.resolve(process.cwd(), ".env");

const TENANT_ID = process.env.AZURE_TENANT_ID || "PASTE_YOUR_TENANT_ID_HERE";
const CLIENT_ID = process.env.AZURE_CLIENT_ID || "PASTE_YOUR_CLIENT_ID_HERE";
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || "PASTE_YOUR_CLIENT_SECRET_HERE";
const REDIRECT_URI = "http://localhost:3000/api/auth/callback";
const SCOPES = [
  "https://graph.microsoft.com/Mail.Send",
  "offline_access",
  "openid",
];

const authUrl =
  `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?` +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    response_mode: "query",
    scope: SCOPES.join(" "),
    prompt: "consent",
  }).toString();

console.log("\n1. A browser window will open. Sign in with your Microsoft 365 account.");
console.log("2. After sign-in, the script will update your .env file automatically.\n");

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost:3000");

  if (!url.pathname.startsWith("/api/auth/callback")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    const desc = url.searchParams.get("error_description") || error;
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end(`<h2>Error</h2><pre>${desc}</pre>`);
    console.error("Error from Microsoft:", desc);
    server.close();
    process.exit(1);
    return;
  }

  if (!code) {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("<h2>No code received</h2>");
    return;
  }

  try {
    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
          scope: SCOPES.join(" "),
        }).toString(),
      }
    );

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end(
        `<h2>Token error</h2><pre>${tokenData.error_description || tokenData.error}</pre>`
      );
      console.error("Token error:", tokenData.error_description || tokenData.error);
      server.close();
      process.exit(1);
      return;
    }

    const refreshToken = tokenData.refresh_token;

    // Write refresh token directly to .env file
    if (fs.existsSync(ENV_PATH)) {
      let envContent = fs.readFileSync(ENV_PATH, "utf-8");
      if (envContent.includes("AZURE_REFRESH_TOKEN=")) {
        envContent = envContent.replace(
          /AZURE_REFRESH_TOKEN=.*/,
          `AZURE_REFRESH_TOKEN=${refreshToken}`
        );
      } else {
        envContent += `\nAZURE_REFRESH_TOKEN=${refreshToken}\n`;
      }
      fs.writeFileSync(ENV_PATH, envContent, "utf-8");
    } else {
      fs.writeFileSync(
        ENV_PATH,
        `AZURE_REFRESH_TOKEN=${refreshToken}\n`,
        "utf-8"
      );
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<h2>Success!</h2><p>Your .env file has been updated with the refresh token. You can close this window.</p>"
    );

    console.log("\n=== SUCCESS ===");
    console.log("Your .env file has been updated with the refresh token!");
    console.log("You can now restart your Next.js dev server.\n");

    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/html" });
    res.end(`<h2>Error</h2><pre>${err.message}</pre>`);
    console.error("Fetch error:", err);
    server.close();
    process.exit(1);
  }
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000 for the redirect...\n");
  exec(`start "" "${authUrl}"`);
});
