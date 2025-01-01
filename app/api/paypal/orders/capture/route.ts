import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

// const PAYPAL_API_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://api-m.paypal.com"
//     : "https://api-m.sandbox.paypal.com";

const PAYPAL_API_URL = "https://api-m.sandbox.paypal.com";
async function generateAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Add validation to ensure body contains required fields
    if (!body || !body.orderID || !body.tier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { orderID, tier } = body;
    console.log("OrderID:", orderID);
    console.log("Tier:", tier);
    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API_URL}/v2/checkout/orders/${orderID}/capture`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    // If payment was successful, update user's subscription
    if (data.status === "COMPLETED") {
      const user = await currentUser();
      console.log("User:", user);
      const email = user?.emailAddresses[0]?.emailAddress;
      console.log("Email:", email);
      if (user) {
        const additionalUsage = tier === "Basic" ? 15 : 50;
        await prisma.user.update({
          where: { email },
          data: {
            subscription_tier: tier,
            max_usage: { increment: additionalUsage },
            number_usage_left: { increment: additionalUsage },
          },
        });
      }
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to capture order:", error);
    return NextResponse.json(
      { error: "Failed to capture order" },
      { status: 500 }
    );
  }
}
