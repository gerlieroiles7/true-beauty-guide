// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.email ?? undefined;

    const storeId = "197834";   // ✅ your actual store ID
    const variantId = "888480"; // ✅ your actual variant ID

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email,
              custom: {
                fbclid: body.fbclid || null,
                _p: body._p || null,
              },
            },
            test_mode: true,
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: storeId,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: variantId,
              },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.data?.attributes?.url) {
      console.error("❌ Lemon Squeezy API Error:", JSON.stringify(data, null, 2));
      return NextResponse.json({ message: "Failed to create checkout", error: data }, { status: 500 });
    }

    const checkoutUrl = data.data.attributes.url;
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
