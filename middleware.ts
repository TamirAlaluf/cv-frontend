import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/about",
  "/privacy-policy",
  "/licensing",
  "/tos",
]);

// Add these routes to match your actual app structure
const notValidRoutes = createRouteMatcher([
  "/api/(.*)",
  // Add all your valid authenticated routes here
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  console.log("middleware");

  // Check if the route is public first
  if (isPublicRoute(request)) {
    console.log("public route");

    return NextResponse.next();
  }

  if (notValidRoutes(request)) {
    console.log("not valid route");
    try {
      await auth.protect();
      return NextResponse.next();
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized: You must be signed in to access this route.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    console.log("valid route");
    return NextResponse.next();
  }
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
