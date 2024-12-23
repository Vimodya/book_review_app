"use client";

import { useState } from "react";

export default function AddReview() {
  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);

        uploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (image: string) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      });

      const result = await response.json();
      setCoverImage(result.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      coverImage,
      title,
      isbn,
      author,
      description,
    };

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <div className="flex justify-between items-center w-full max-w-4xl border-b pb-2 mb-8">
        <button className="text-[#a58a72] text-lg font-medium">
          &larr; Back
        </button>
        <h1 className="text-xl font-semibold">Add Submission</h1>
        <button className="text-red-500 text-lg font-medium">Cancel</button>
      </div>

      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cover Image (Upload)
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Book Title
            </label>
            <input
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              ISBN Number
            </label>
            <input
              type="text"
              placeholder="ISBN Number"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Author Name
            </label>
            <input
              type="text"
              placeholder="Book Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Review about the Book
            </label>
            <textarea
              placeholder="Book Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#a58a72] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#52311b] transition"
              onClick={handleSubmit}
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
