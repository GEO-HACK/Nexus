import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getPaperById } from "../services/paperServices";
import { getCategories } from "../services/categoriesServices";
import { getTags } from "../services/tagServices";

import PaperDetails from "../components/PaperDetails";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { ArrowLeft } from "lucide-react";

const SinglePage = () => {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paperData, categoriesData, tagsData] = await Promise.all([
          getPaperById(id),
          getCategories(),
          getTags(),
        ]);

        setPaper(paperData);
        setCategories(categoriesData.data);
        setTags(tagsData.data);
        console.log("this are the categories fetched:", categoriesData.data);
        console.log("this are the tags fetched:", tagsData.data);
        console.log("this is the paper fetched:", paperData);
    
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

  if (error) return <div className="text-red-500">{error}</div>;

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

      {paper && (
        <>
          <PaperDetails
            paper={paper}
            categoryName={category ? category.category : "Unknown"}
          />

          {/* Document Preview Section */}
          {paper.file_url.endsWith(".pdf") ? (
            <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Document Preview
                </h3>
                <p className="text-sm text-gray-500">
                  Powered by React-PDF-Viewer
                </p>
              </div>
              <div className="w-full h-[600px] border border-gray-300 rounded-lg shadow-sm">
                <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                  <Viewer
                    fileUrl={resolvedFileUrl}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </div>
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
