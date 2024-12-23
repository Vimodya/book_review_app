import { NextResponse } from "next/server";
import Comment from "../../../../models/comment";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  try {
    const comments = await Comment.find({ reviewId: id }).exec();
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const { text, author } = await request.json();

  try {
    const newComment = new Comment({
      text,
      author,
      time: new Date().toISOString(),
      reviewId: id,
    });

    await newComment.save();

    return NextResponse.json(newComment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding comment" },
      { status: 500 }
    );
  }
}
