"use client";

import { useState } from "react";

export default function PostDetail() {
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Commentator",
      time: "2 hours ago",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Commentator",
      time: "2 hours ago",
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      text: newComment,
      author: "New User",
      time: "Just now",
    };

    setComments((prev) => [newCommentData, ...prev]);
    setNewComment("");
  };

  return (
    <div className="flex flex-row w-full min-h-screen p-4">
      {/* Left Side: Post */}
      <div className="w-1/2 pr-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <button className="text-blue-500">&larr; Back</button>
          <h1 className="font-semibold text-lg">Post Detail</h1>
          <div></div>
        </div>

        {/* Post Image */}
        <div className="mb-4">
          <img
            src="/images/1.jpg" // Replace with the actual image path
            alt="Book"
            className="w-full rounded-md"
          />
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
            <span>Author</span>
            <span>Submitted</span>
            <button className="text-blue-500">14 Comments</button>
          </div>
        </div>
      </div>

      {/* Right Side: Comments */}
      <div className="w-1/2 pl-4">
        {/* Comment Input */}
        <div className="flex items-center border-b pb-4 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Post
          </button>
        </div>

        {/* Comments List */}
        <div>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border rounded-md p-3 mb-3 bg-gray-50"
            >
              <p className="text-gray-700">{comment.text}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                <span>{comment.author}</span>
                <span>{comment.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
