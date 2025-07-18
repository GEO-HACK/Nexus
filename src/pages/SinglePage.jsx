import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Custom hooks (Business Logic Layer)
import { usePaperData } from "../hooks/usePaperData";

// UI Components (Presentation Layer)
import PaperDetails from "../components/PaperDetails";
import { LoadingSpinner, ErrorDisplay } from "../components/UI/LoadingComponents";

// PDF Viewer Components
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

/**
 * SinglePage Component - Displays detailed view of a research paper
 * Uses clean architecture with separated concerns:
 * - Data logic in custom hook
 * - UI logic in components
 * - Business logic isolated
 */
const SinglePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // All data management is handled by the custom hook
  const { 
    paper, 
    loading, 
    error, 
    getCategoryName, 
    users 
  } = usePaperData(id);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  /**
   * Navigation handler - UI logic
   */
  const handleBack = () => {
    navigate(-1);
  };

  /**
   * File URL resolver - Business logic helper
   */
  const getResolvedFileUrl = () => {
    if (!paper?.file_url) return "";
    
    const BASE_URL = import.meta.env.VITE_API_URL;
    
    return paper.file_url.startsWith("http")
      ? paper.file_url
      : `${BASE_URL.replace(/\/api\/?$/, "")}${paper.file_url.replace("../uploads", "/uploads")}`;
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading paper details..." />;
  }

  // Error state with retry functionality
  if (error) {
    return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  }

  // No paper found
  if (!paper) {
    return <ErrorDisplay error="Paper not found" />;
  }

  const resolvedFileUrl = getResolvedFileUrl();

  return (
    <div className="container mx-auto p-4">
      {/* Navigation */}
      <button
        onClick={handleBack}
        className="flex items-center text-blue-500 hover:underline mb-4 transition-colors"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      {/* Paper Details Component */}
      <PaperDetails
        paper={paper}
        categoryName={getCategoryName()}
        users={users}
      />

      {/* Document Preview Section */}
      <DocumentPreview 
        fileUrl={resolvedFileUrl} 
        fileName={paper.paper_name}
        defaultLayoutPluginInstance={defaultLayoutPluginInstance}
      />

      {/* Tags Section */}
      <TagsSection tags={paper.tags} />
    </div>
  );
};

/**
 * Document Preview Component - Separated for better organization
 */
const DocumentPreview = ({ fileUrl, fileName, defaultLayoutPluginInstance }) => {
  if (!fileUrl) {
    return (
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6 text-center">
        <p className="text-gray-600">No file available for preview</p>
      </div>
    );
  }

  // PDF Preview
  if (fileUrl.endsWith(".pdf")) {
    return (
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
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={fileUrl}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      </div>
    );
  }

  // Word Document
  if (fileUrl.endsWith(".doc") || fileUrl.endsWith(".docx")) {
    return (
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Document</h3>
        <p className="text-gray-600">
          Preview not available for Word documents.{" "}
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Download {fileName}
          </a>
        </p>
      </div>
    );
  }

  // Other file types
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm5 3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">Preview not available for this file type</p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download File
        </a>
      </div>
    </div>
  );
};

/**
 * Tags Section Component - Separated for reusability
 */
const TagsSection = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const tagColors = [
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-pink-200 text-pink-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
    "bg-red-200 text-red-800",
    "bg-indigo-200 text-indigo-800",
    "bg-teal-200 text-teal-800",
    "bg-orange-200 text-orange-800",
  ];

  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => {
          const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];
          return (
            <span
              key={index}
              className={`${randomColor} px-3 py-1 rounded-full text-sm font-medium`}
            >
              #{tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePage;
