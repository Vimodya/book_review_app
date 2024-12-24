import { NextResponse } from "next/server";

export async function POST(req: any) {
  const user = { id: "user-id", name: "User Name" }; // Replace with actual user data
  const token = "generated-auth-token"; // Replace with actual token logic

  // Set the token in a cookie
  const response = NextResponse.json({
    message: "User logged in successfully",
  });
  response.cookies.set("auth_token", token, { httpOnly: true, secure: true });

  return response;
}
