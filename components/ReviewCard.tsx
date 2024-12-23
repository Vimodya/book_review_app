import React from "react";
import { useRouter } from "next/navigation";

export default function ReviewCard({
  id,
  image,
  title,
  description,
  author,
  submitted,
  rating,
  onDelete,
  onEdit, // Add the onEdit prop for triggering the modal
}: {
  id: string;
  image: string;
  title: string;
  description: string;
  author: string;
  submitted: string;
  rating: number;
  onDelete: () => void;
  onEdit: () => void; // Type the onEdit prop as a function
}) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/review/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border rounded-lg shadow-md p-4 w-80 cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-semibold text-[#a58a72]">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>

      {/* Star Rating Section */}
      <div className="flex space-x-1 mt-2">
        {[1, 2, 3, 4, 5].map((starIndex) => (
          <span
            key={starIndex}
            className={`cursor-pointer text-2xl ${
              starIndex <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>{author}</span>
        <span>{submitted}</span>
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event from firing
          onDelete(); // Call the onDelete function
        }}
        className="mt-2 ml-8 text-red-500 hover:text-red-700 text-sm mr-36"
      >
        Delete
      </button>

      {/* Edit Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click event from firing
          onEdit(); // Call the onEdit function to open the modal
        }}
        className="mt-2 text-[#a58a72] hover:text-[#a58a72] text-sm"
      >
        Edit
      </button>
    </div>
  );
}
