import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongo/mongodb";
import Review from "../../../../models/review";

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    await connectMongoDB();

    // Find the review by ID
    const review = await Review.findById(id);

    if (!review) {
      return NextResponse.json(
        { message: "Review not found." },
        { status: 404 }
      );
    }

    // Delete the review
    await Review.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Review deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
