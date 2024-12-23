import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongo/mongodb";
import Review from "../../../models/review";

export async function GET(req: NextRequest) {
  await connectMongoDB();

  try {
    const reviews = await Review.find();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}
