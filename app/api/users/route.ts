import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Configure the nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email service provider
  auth: {
    user: process.env.EMAIL_USERNAME, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});
export async function GET(request: NextRequest) {
  console.log("GET request received");
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const email = request.nextUrl.searchParams.get("email");
    if (user.emailAddresses[0].emailAddress != email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (email) {
      console.log("email", email);
      // Find single user by username
      const user = await prisma.user.findUnique({
        where: { email },
      });
      console.log("user", user);
      return NextResponse.json(user);
    }
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  } catch (error) {
    console.log("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log("POST request received");

  try {
    const body = await request.json();

    // Extract email and username
    const username = body.data?.username || null;
    const email = body.data?.email_addresses?.[0]?.email_address || null;
    const id = body.data?.id || null;

    console.log("Extracted Data:", { username, email, id });

    // Validate extracted values
    if (!email) {
      return NextResponse.json(
        { error: "Email is required but not found in webhook payload" },
        { status: 400 }
      );
    }
    if (!username) {
      return NextResponse.json(
        { error: "Username is required but not found in webhook payload" },
        { status: 400 }
      );
    }
    if (!id) {
      return NextResponse.json(
        { error: "Id is required but not found in webhook payload" },
        { status: 400 }
      );
    }
    //check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email?.trim() || null },
    });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Save to database
    const newUser = await prisma.user.create({
      data: { name: username, email, clerk_id: id },
    });

    // Send a welcome email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        subject: "Welcome to Our Platform!",
        text: `Hi ${
          username || "User"
        },\nWith email: ${email},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`,
      });

      console.log("Welcome email sent to:", email);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error processing webhook:", error);

    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
