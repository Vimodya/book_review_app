import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token"); // Get the token from cookies

  // If the token is missing, redirect to the signup page
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to signup page
  }

  return NextResponse.next(); // Allow the request to continue if the user is authenticated
}

// Define the paths that the middleware will run for
export const config = {
  matcher: ["/addReview", "/about", "/app/review"], // Add routes that need auth checks
};
