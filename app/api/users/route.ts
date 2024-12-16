import { NextRequest, NextResponse } from "next/server";
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
    const id = body.data?.id || null;

    console.log("Extracted Data:", { username, email, id });

    // Validate extracted values
    if (!email) {
      return NextResponse.json(
        { error: "Email is required but not found in webhook payload" },
        { status: 400 }
      );
    }

    // Save to database
    const user = await prisma.user.create({
      data: { name: username, email, clerk_id: id },
    });

    console.log("User created:", user);
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
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error processing webhook:", error);

    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
