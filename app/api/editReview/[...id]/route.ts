import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongo/mongodb";
import Review from "../../../../models/review";

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params; // Await params
  const { title, description, rating } = await req.json();

  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Find the review by ID
    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found." },
        { status: 404 }
      );
    }

    // Update the review fields
    review.title = title || review.title; // Update title if provided, else keep the old value
    review.description = description || review.description; // Same for description
    review.rating = rating || review.rating; // Update rating if provided

    // Save the updated review
    await review.save();

    // Return a success response
    return NextResponse.json(
      { message: "Review updated successfully.", review },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { message: "Failed to update the review." },
      { status: 500 }
    );
  }
}
