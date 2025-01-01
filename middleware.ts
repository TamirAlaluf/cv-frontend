import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter that allows 100 requests per 15 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "15 m"),
  analytics: true,
});

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/about",
  "/privacy-policy",
  "/licensing",
  "/tos",
  "/api/users",
  "/api/s3/(.*)",
]);

// Add these routes to match your actual app structure
const isProtectedRoute = createRouteMatcher([
  "/api/feedback",
  "/api/optimize-resume",
  "/api/paypal/(.*)",
  // Add all your valid authenticated routes here
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Get MAINTENANCE_MODE from environment variable
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = request.nextUrl.pathname === "/maintenance";

  // Handle maintenance mode logic
  if (isMaintenanceMode && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // Block access to maintenance page when not in maintenance mode
  if (!isMaintenanceMode && isMaintenancePage) {
    return NextResponse.redirect(new URL("/404", request.url));
  }

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";
  console.log("IP:", ip);
  // Rate limit check
  const { success } = await ratelimit.limit(ip);
  console.log("Rate limit check:", { success });
  if (!success) {
    return new Response(
      JSON.stringify({
        message: "Too many requests, please try again later.",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  // Continue with normal auth flow
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(request)) {
    try {
      await auth.protect();
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized: You must be signed in to access this route.",
        }),
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
