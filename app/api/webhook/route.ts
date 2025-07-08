import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import "dotenv/config";

console.log("🔐 Loaded Signing Secret:", process.env.LEMON_SQUEEZY_SIGNING_SECRET);

export async function POST(req: Request) {
  const rawBody = await req.text(); // Needed for signature verification
  fs.writeFileSync("payload.json", rawBody); // ✅ Save the *real* one the server sees
  console.log("🟢 payload.json saved for signature check");

  console.log("🟡 Received raw body:", rawBody);
  console.log("🟡 Raw body length:", rawBody.length);

  console.log("🔑 Server Signing Secret:", process.env.LEMON_SQUEEZY_SIGNING_SECRET);

  const signature = (req.headers.get("x-signature") || "").trim();
  const secret = process.env.LEMON_SQUEEZY_SIGNING_SECRET || "";

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  console.log("Signature from header:", JSON.stringify(signature));
  console.log("Expected signature:    ", expectedSignature);

  if (signature !== expectedSignature) {
    console.error("❌ Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
  console.log("✅ Verified webhook:", body);

  // ✅ Improved Extraction Logic
  const email =
    body.email ||
    body?.data?.attributes?.email ||
    body?.data?.attributes?.user_email;

  const valueCents =
    body.value ||
    body?.data?.attributes?.total ||
    body?.data?.attributes?.subtotal;

  const value = valueCents ? valueCents / 100 : undefined;

  const currency =
    body.currency ||
    body?.data?.attributes?.currency ||
    "USD";

  const _p = body._p || body?.meta?.custom_data?._p;
  const fbclid = body.fbclid || body?.meta?.custom_data?.fbclid;

  console.log("📥 Extracted email:", email);
  console.log("📥 Extracted value (converted):", value);
  console.log("📥 Extracted currency:", currency);

  if (!email || !value) {
    console.error("❌ Missing required fields:", { email, value });
    return NextResponse.json(
      { error: "Missing required fields: email or value" },
      { status: 400 }
    );
  }

  const hashedEmail = crypto
    .createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest("hex");

  const fbEvent = {
    event_name: "Purchase",
    event_time: Math.floor(Date.now() / 1000),
    user_data: {
      em: [hashedEmail],
      fbp: _p || undefined,
      fbc: fbclid || undefined,
      client_user_agent: req.headers.get("user-agent") || "",
      client_ip_address: req.headers.get("x-forwarded-for") || "127.0.0.1",
    },
    custom_data: {
      currency,
      value,
    },
    action_source: "website",
  };

  const fbPayload = {
    data: [fbEvent],
    test_event_code: process.env.FB_TEST_EVENT_CODE || undefined,
  };

  console.log("📤 Sending to Facebook CAPI:", JSON.stringify(fbPayload, null, 2));

  try {
    const fbRes = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events?access_token=${process.env.FB_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fbPayload),
      }
    );

    const fbData = await fbRes.json();

    if (!fbRes.ok) {
      console.error("❌ Facebook responded with error", {
        status: fbRes.status,
        body: fbData,
      });
      return NextResponse.json(
        { error: "Facebook API error", details: fbData },
        { status: 400 }
      );
    }

    console.log("📡 Facebook CAPI response:", fbData);
    return NextResponse.json({ success: true, fbResponse: fbData });
  } catch (err) {
    console.error("❌ Facebook CAPI network error:", err);
    return NextResponse.json(
      { error: "Failed to send to Facebook CAPI" },
      { status: 500 }
    );
  }
}
