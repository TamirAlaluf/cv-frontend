import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email");
    console.log("Email:", email);
    if (email) {
      // Find single user by username
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log("User:", user);
      return NextResponse.json(user);
    }

    // Existing code for fetching all users
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Webhook Body:", body);

    // Extract email and username
    const username = body.data?.username || null;
    const email = body.data?.email_addresses?.[0]?.email_address || null;

    console.log("Extracted Data:", { username, email });

    // Validate extracted values
    if (!email) {
      return NextResponse.json(
        { error: "Email is required but not found in webhook payload" },
        { status: 400 }
      );
    }

    // Save to database
    const user = await prisma.user.create({
      data: { name: username, email },
    });

    console.log("User created:", user);

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error processing webhook:", error);

    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
