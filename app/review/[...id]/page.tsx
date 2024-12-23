"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<{
    coverImage: string;
    title: string;
    description: string;
    author: string;
    submitted: string;
    comments?: { id: string; text: string; author: string; time: string }[];
  } | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postRes = await fetch(`/api/getReview/${id}`);
        const postData = await postRes.json();
        setPost(postData.review);

        const commentsRes = await fetch(`/api/postcomment/${id}`);
        const commentsData = await commentsRes.json();
        if (postData.review) {
          setPost((prevPost) => {
            if (prevPost) {
              return {
                ...prevPost,
                comments: commentsData,
              };
            }
            return prevPost;
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: Math.random().toString(36).substr(2, 9),
      text: newComment,
      author: "New User",
      time: "Just now",
    };

    try {
      const response = await fetch(`/api/postcomment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      });

      if (response.ok) {
        setPost((prevPost) => {
          if (prevPost) {
            return {
              ...prevPost,
              comments: [newCommentData, ...(prevPost.comments || [])],
            };
          }
          return prevPost;
        });
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="flex flex-row w-full min-h-screen p-4">
      <div className="w-1/2 pr-4">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <button className="text-blue-500">&larr; Back</button>
          <h1 className="font-semibold text-lg">Post Detail</h1>
          <div></div>
        </div>

        <div className="mb-4">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-md"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-700">{post.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
            <span>{post.author}</span>
            <span>{post.submitted}</span>
            <button className="text-blue-500">
              {post.comments ? post.comments.length : 0} Comments
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2 pl-4">
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

        <div>
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
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
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
}
