import React from "react";
import { Link } from "react-router-dom";

const PaperList = ({ filteredPapers }) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Research Papers</h1>
      </div>

      {/* List View */}
      <div>
        {filteredPapers.map((paper) => (
          <div className="bg-white p-4 mb-4 shadow-md" key={paper._id}>
            {/* Internal navigation link */}
            <Link to={`/browser/${paper._id}`} className="text-blue-600 hover:underline">
              <h2 className="text-lg font-semibold">{paper.paper_name}</h2>
            </Link>

            <p className="text-sm text-blue-500">
              Published: {new Date(paper.createdAt).toLocaleDateString()}
            </p>
            <p className="font-semibold text-sm text-gray-600">
              {paper.description.length > 100
                ? `${paper.description.slice(0, 100)}...`
                : paper.description}
            </p>

            {/* External link for downloading */}
            <a
              href={
                paper.file_url.startsWith("http")
                  ? paper.file_url
                  : `${import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")}${paper.file_url.replace("../uploads", "/uploads")}`

              }
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-600 hover:underline inline-block"
            >
              View Paper →
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default PaperList;