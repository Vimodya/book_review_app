import React, { useState, useEffect } from "react";

export default function EditReviewForm({
  reviewData,
  onSave,
  onCancel,
}: {
  reviewData: any;
  onSave: (updatedReview: any) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: reviewData.title,
    description: reviewData.description,
    rating: reviewData.rating,
  });

  useEffect(() => {
    setFormData({
      title: reviewData.title,
      description: reviewData.description,
      rating: reviewData.rating,
    });
  }, [reviewData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Call onSave with the updated form data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700"
        >
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-semibold text-gray-700"
        >
          Rating
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1"
          max="5"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-[#a58a72] text-white rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
