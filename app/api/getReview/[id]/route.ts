import { NextRequest, NextResponse } from "next/server";
import Review from "../../../../models/review";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ review });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching review" },
      { status: 500 }
    );
  }
}
