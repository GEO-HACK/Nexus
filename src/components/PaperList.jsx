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
          <div className="bg-white p-4 mb-4 shadow-md" key={paper.paper_id}>
            {/* Internal navigation link */}
            <Link to={`/browser/${paper._id}`} className="text-blue-600 hover:underline">
              <h2 className="text-lg font-semibold">{paper.paper_name}</h2>
            </Link>

            <p className="text-sm text-blue-500">
              Published: {new Date(paper.createdAt).toLocaleDateString()}
            </p>

            {/* External link for downloading */}
            <a
              href={`http://localhost:5000/uploads${paper.file_url.replace("..", "")}`}
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