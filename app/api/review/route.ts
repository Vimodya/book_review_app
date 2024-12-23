import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongo/mongodb";
import Review from "../../../models/review";

export async function POST(req: NextRequest) {
  const { coverImage, title, isbn, author, description } = await req.json();

  if (!coverImage || !title || !isbn || !author || !description) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();

    const newReview = new Review({
      coverImage,
      title,
      isbn,
      author,
      description,
    });

    await newReview.save();

    return NextResponse.json(
      { message: "Review added successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during review submission:", error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
