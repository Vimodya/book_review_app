"use client";

export default function AddReview() {
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
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Cover Image (URL)
            </label>
            <input
              type="text"
              placeholder="Cover Image URL"
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Book Title
            </label>
            <input
              type="text"
              placeholder="Book Title"
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
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Review about the Book
            </label>
            <textarea
              placeholder="Book Description"
              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#a58a72] text-white font-medium py-3 px-6 rounded-lg hover:bg-[#52311b] transition"
            >
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
