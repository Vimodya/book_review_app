"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import ImageSlider from "./components/ImageSlider";
import ReviewCard from "@/components/ReviewCard";

export default function Page() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/getAllReviews");
        const data = await response.json();
        console.log(data);

        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-row justify-between w-full">
        <div className="w-1/2 h-full bg-gray-200 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#a58a72]">
              Welcome to our store
            </h1>
            <p className="text-lg mt-4 mt-12">
              Discover the best products from our store
            </p>
          </div>
        </div>

        <div className="w-1/2 h-full">
          <ImageSlider />
        </div>
      </div>
      <div className="flex justify-center font-bold text-2xl mt-12 text-[#a58a72]">
        Browse a Book to read
      </div>
      <div className="flex flex-wrap justify-around w-full mt-12 mx-8 gap-x-4 gap-y-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review._id}
              image={review.coverImage}
              title={review.title}
              description={review.description}
              author={review.author}
              submitted={review.submittedAt}
              id={review._id}
            />
          ))
        )}
      </div>
    </div>
  );
}
