import { NextApiResponse } from "next";
import Review from "../../../models/review";

// Handle GET request
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return Response.json(
      { message: "No query parameter provided" },
      { status: 400 }
    );
  }

  try {
    const reviews = await Review.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    return Response.json(reviews);
  } catch (error) {
    console.error("Error searching reviews:", error);
    return Response.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
}
