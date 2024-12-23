"use client";

import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/NavBar";
import ImageSlider from "./components/ImageSlider";
import ReviewCard from "@/components/ReviewCard";
import Modal from "../../components/modal/EditReviwmodal";
import SearchBar from "@/components/SearchBar"; // Import the SearchBar component
import axios from "axios"; // Axios to handle the API request

export default function Page() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null); // Store the selected review for editing
  const [searchResults, setSearchResults] = useState<any[]>([]); // For search results

  // Fetch all reviews initially
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/getAllReviews");
        const data = await response.json();
        setReviews(data);
        setSearchResults(data); // Set initial search results as all reviews
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleEdit = (reviewId: string) => {
    const reviewToEdit = reviews.find((review) => review._id === reviewId);
    if (reviewToEdit) {
      setSelectedReview(reviewToEdit);
      setIsModalOpen(true); // Open the modal
    }
  };

  const handleSave = async (updatedReview: any) => {
    try {
      const response = await fetch(`/api/editReview/${updatedReview._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedReview),
      });

      const result = await response.json();
      if (response.ok) {
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === updatedReview._id
              ? { ...review, ...updatedReview }
              : review
          )
        );
        setIsModalOpen(false);
      } else {
        alert(result.message || "Failed to update the review.");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Failed to save the review.");
    }
  };

  const handleDelete = useCallback(async (reviewId: string) => {
    try {
      const response = await fetch(`/api/deleteReview/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert("Review deleted successfully.");
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        setSearchResults((prevResults) =>
          prevResults.filter((review) => review._id !== reviewId)
        ); // Remove deleted review from search results
      } else {
        alert(result.message || "Failed to delete the review.");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete the review.");
    }
  }, []);

  // Handle search query
  const handleSearch = async (query: string) => {
    if (query.trim() === "") {
      setSearchResults(reviews); // Reset search to all reviews if query is empty
      return;
    }

    try {
      const response = await axios.get(`/api/Search`, {
        params: { query },
      });
      setSearchResults(response.data); // Update search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between w-full">
        {/* Left Section: Welcome and Search Bar */}
        <div className="w-1/2 h-full bg-gray-200 flex flex-col items-center justify-between p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#a58a72] mt-8">
              Welcome to our store
            </h1>
            <p className="text-lg mt-4 mt-12">
              Discover the best products from our store
            </p>
            <p className="text-sm flex justify-center mx-12 mt-12 ">
              Welcome to the ultimate platform for book lovers! Our Book
              Reviewing App allows readers to explore a vast collection of
              books, share their thoughts, and discover new reads based on
              personalized recommendations. Whether you're an avid reader, a
              casual bookworm, or someone looking for your next great read, this
              app provides an intuitive space to track your reading journey.
              With features like detailed reviews, ratings, and author insights,
              you can easily share your experiences and help fellow readers find
              their next favorite book.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full p-4 mt-12 ml-14 mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Right Section: Image Slider */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <ImageSlider />
        </div>
      </div>

      <div className="flex justify-center font-bold text-2xl mt-12 text-[#a58a72]">
        Browse a Book to read
      </div>

      {/* Displaying Reviews */}
      <div className="flex flex-wrap justify-center w-full mt-12 mx-8 gap-x-4 gap-y-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          searchResults.map((review) => (
            <ReviewCard
              key={review._id}
              image={review.coverImage}
              title={review.title}
              description={review.description}
              author={review.author}
              submitted={review.submittedAt}
              id={review._id}
              rating={review.rating}
              onDelete={() => handleDelete(review._id)}
              onEdit={() => handleEdit(review._id)}
            />
          ))
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={selectedReview}
        onSave={handleSave}
      />
    </div>
  );
}
