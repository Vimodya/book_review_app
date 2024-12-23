import { NextResponse } from "next/server";
import Review from "../../../../models/review";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const review = await Review.findById(id).populate("comments");
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(review.comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { text, author } = await req.json();

  try {
    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    const newComment = { text, author, time: "Just now" };
    review.comments.push(newComment);
    await review.save();

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding comment" },
      { status: 500 }
    );
  }
}
