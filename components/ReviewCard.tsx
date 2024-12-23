import React from "react";

interface ReviewCardProps {
  image: string;
  title: string;
  description: string;
  author: string;
  submitted: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  image,
  title,
  description,
  author,
  submitted,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        <p className="text-gray-600 text-sm mt-2">{description}</p>

        <div className="mt-4 flex justify-between text-xs text-gray-500">
          <span>{author}</span>
          <span>{submitted}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
