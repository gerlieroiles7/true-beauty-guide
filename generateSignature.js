import 'dotenv/config';
import crypto from "crypto";
import fs from "fs";

console.log("Working dir:", process.cwd());
console.log("Signing Secret:", process.env.LEMON_SQUEEZY_SIGNING_SECRET);

const rawBody = fs.readFileSync("./payload.json", "utf8"); // DO NOT TRIM OR FORMAT
const secret = process.env.LEMON_SQUEEZY_SIGNING_SECRET;
console.log("Signing Secret:", secret);

if (!secret) {
  throw new Error("❌ Signing secret is missing. Check your .env.local file.");
}

const signature = crypto
  .createHmac("sha256", secret)
  .update(rawBody) // rawBody must be EXACT
  .digest("hex");

console.log("✅ X-Signature to use in Postman:", signature);
