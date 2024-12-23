"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ReviewCard({
  id,
  image,
  title,
  description,
  author,
  submitted,
}: {
  id: string;
  image: string;
  title: string;
  description: string;
  author: string;
  submitted: string;
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
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>{author}</span>
        <span>{submitted}</span>
      </div>
    </div>
  );
}
