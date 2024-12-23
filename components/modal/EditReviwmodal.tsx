import React, { useState, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  review: any; // Pass the review object as a prop
  onSave: (updatedReview: any) => void; // Function to handle saving the updated review
};

export default function Modal({ isOpen, onClose, review, onSave }: ModalProps) {
  const [updatedReview, setUpdatedReview] = useState<any>(null);

  useEffect(() => {
    // Initialize the updatedReview state with the review data when modal opens
    if (review) {
      setUpdatedReview({ ...review });
    }
  }, [review]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedReview((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (updatedReview) {
      onSave(updatedReview); // Call the onSave function passed as a prop
    }
  };

  if (!isOpen || !updatedReview) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent click event from closing modal
      >
        <h2 className="text-xl font-bold mb-4">Edit Review</h2>
        <div>
          <label htmlFor="title" className="block text-sm">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={updatedReview.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="description" className="block text-sm">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={updatedReview.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="rating" className="block text-sm">
            Rating
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            value={updatedReview.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#a58a72] text-white rounded-md"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md ml-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
