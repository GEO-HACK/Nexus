import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPaperById } from "../services/paperServices";
import { getCategories } from "../services/categoriesServices";
import { getTags } from "../services/tagServices";

import PaperDetails from "../components/PaperDetails";

import { ArrowLeft } from "lucide-react";

const SinglePage = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paperData, categoriesData, tagsData] = await Promise.all([
          getPaperById(id),
          getCategories(),
          getTags(),
        ]);

        setPaper(paperData);
        setCategories(categoriesData);
        setTags(tagsData.data);
        console.log("Fetched paper:", paperData);
        console.log("Fetched categories:", categoriesData);
        console.log("Fetched tags:", tagsData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching paper or categories");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Loading...</div>;

  // Get the category name by matching the paper's category_id
  const category = categories.find(
    (cat) => cat.category_id === paper.category_id
  );

  const tagNames = Array.isArray(paper.tags)
    ? paper.tags.map((tagId) => {
        const tagMatch = tags.find((t) => t.tag_id === tagId);
        return tagMatch ? tagMatch.name : "Unknown";
      })
    : [];
  console.log("Tags:", tagNames);
  const BASE_URL = "http://localhost:5000"; // Replace with your server's base URL
  const resolvedFileUrl = paper.file_url.startsWith("http")
    ? paper.file_url
    : `${BASE_URL}${paper.file_url.replace("../uploads", "/uploads")}`;
  console.log("Resolved File URL:", resolvedFileUrl);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBack}
        className="flex items-center text-blue-500 hover:underline mb-4"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      {error && <div className="text-red-500">{error}</div>}

      {paper && (
        <>
          <PaperDetails
            paper={paper}
            categoryName={category ? category.category : "Unknown"}
          />

          {/* Document Preview Section */}
          {paper.file_url.endsWith(".pdf") ? (
            <div className="w-full h-96 bg-blue-500 border border-blue-300 rounded-lg shadow-md overflow-hidden">
              <iframe
                src={resolvedFileUrl}
                title="PDF Preview"
                className="w-full h-full"
              ></iframe>
            </div>
          ) : paper.file_url.endsWith(".doc") ||
            paper.file_url.endsWith(".docx") ? (
            <div className="mt-4">
              <p className="text-gray-600">
                Preview not available for Word documents.{" "}
                <a
                  href={resolvedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Download File
                </a>
              </p>
            </div>
          ) : (
            <div className="mt-4 flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-gray-600 mt-2">
                Preview not available for this file type.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SinglePage;
