import React from "react";
import { useNavigate } from "react-router-dom";

const PaperDetails = ({ paper, categoryName, publisherName }) => {
  const navigate = useNavigate();
  const BASE_URL =import.meta.env.VITE_API_URL;; // or your production URL

  console.log("Paper details:", paper);

  const gradients = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-400",
    "from-red-500 to-yellow-500",
    "from-indigo-500 to-blue-400",
    "from-pink-500 to-rose-400",
  ];

  const randomGradient = gradients[paper.paper_id % gradients.length];

  // Parse the tags field
  
  // try {
  //   if (Array.isArray(paper.tags)) {
  //     tagNames = paper.tags; // Use it directly if it's already an array
  //   } else if (typeof paper.tags === "string" && paper.tags.trim()) {
  //     tagNames = JSON.parse(paper.tags); // Parse it if it's a valid JSON string
  //   } else {
  //     tagNames = []; // Fallback to an empty array if it's null, undefined, or invalid
  //   }
  // } catch (error) {
  //   console.error("Error parsing tags:", error);
  //   tagNames = [];
  // }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div
        className={`relative bg-gradient-to-r ${randomGradient} text-white p-6 rounded-lg shadow-md`}
      >
        <h1 className="text-3xl font-bold capitalize">{paper.paper_name}</h1>
        <p className="mt-2 text-lg">
          Category: <span className="font-bold">{categoryName || "Unknown"}</span>
        </p>
        <p className="mt-2 text-sm">
          Published on:{" "}
          {new Date(paper.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-6">
        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {paper.description || "No description available."}
          </p>
        </section>

        {/* File link */}
        {paper.file_url && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">Download</h2>
            <a
              href={`${BASE_URL}${paper.file_url.replace("..", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block"
            >
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Download Paper
              </button>
            </a>
          </section>
        )}

        {/* Co-authors */}
        {paper.coauthors && paper.coauthors.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">Co-authors</h2>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {paper.coauthors.map((author, index) => (
                <li key={index}>{author}</li>
              ))}
            </ul>
          </section>
        ) : (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">Co-authors</h2>
            <p className="text-gray-700">No co-authors listed.</p>
          </section>
        )}

        {/* Tags */}
        {paper.tags && paper.tags.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">Tags</h2>
            <div className="mt-2 flex flex-wrap gap-2">
            {JSON.parse(paper.tags).map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #office
                </span>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">Tags</h2>
            <p className="text-gray-700">No tags available.</p>
          </section>
        )}

        {/* Metadata */}
        {paper.meta && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800">Metadata</h2>
            <p className="mt-2 text-gray-700">{paper.meta}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default PaperDetails;