import React, { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { getCategories } from "../services/categoriesServices"; 
import { updatePaper } from "../services/paperServices"; // Import the updatePaper function

const EditModal = ({ isOpen, onClose, onSubmit, paperData }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Store the selected category ID
  const [categories, setCategories] = useState([]); // Store the list of categories
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState("");

  console.log("this is the paper data", paperData);



  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(); // Fetch categories from the API
        setCategories(response.data|| []); // Set the categories in state
        console.log("Fetched categories:", response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories.");
      }
    };

    fetchCategories();
  }, []);
  console.log("this is the categories", categories);

  // Pre-fill the form fields with the existing paper data
// Pre-fill the form fields with the existing paper data
useEffect(() => {
    if (paperData) {
      setTitle(paperData.paper_name || "");
      setDescription(paperData.description || "");
      setCategory(paperData.category_id || ""); // Use category ID for the dropdown
  
      // Ensure tags is always an array
      try {
        if (Array.isArray(paperData.tags)) {
          setTags(paperData.tags); // Use directly if it's already an array
        } else if (typeof paperData.tags === "string" && paperData.tags.trim()) {
          setTags(JSON.parse(paperData.tags)); // Parse if it's a JSON string
        } else {
          setTags([]); // Fallback to an empty array
        }
      } catch (err) {
        console.error("Error parsing tags:", err);
        setTags([]); // Fallback to an empty array if parsing fails
      }
    }
  }, [paperData]);

  console.log("this is the paper data", paperData);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleTagKeyDown = (e) => {
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear any previous errors

    // Validate required fields
    if (!title || !description || !category) {
        setError("All required fields must be filled.");
        return;
    }

    console.log("this is the paper id", paperData._id);
    const payload = {
        _id: paperData._id, // Include the paper ID
        category, // Include the category ID
        publisher: paperData.publisher_id, // Include the publisher ID
        name: title, // Include the paper name
        description, // Include the description
        tags, // Include the tags array
    };

    // If a file is selected, include it in the payload
    if (file) {
        payload.file = file; // Add the file to the payload (if supported by the backend)
    }

    try {
        // Call the API to update the paper
        const response = await updatePaper(payload); // Call the updatePaper function
        console.log("Updated paper response:", response);

        // Notify the parent component of the successful update
        onSubmit(); // Call the parent component's onSubmit function
        onClose(); // Close the modal
    } catch (err) {
        console.error("Error updating paper:", err);
        setError("Failed to update the paper. Please try again."); // Display an error message
    }
};

  console.log("this is the form ", {
    title,
    description,
    
    category,
    tags,
  });
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center px-4 py-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Research Document
          </h1>
          <p className="text-gray-500 mt-2">
            Update the details of your research paper below
          </p>
        </div>

        {error && (
          <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border px-3 py-2"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-semibold text-gray-700">
              Tags (select or input custom)
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Press Enter to add tags"
              className="mt-1 w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">
              Upload File (optional)
            </label>
            <div className="flex items-center gap-3 mt-1 border border-dashed border-blue-400 p-4 rounded-lg">
              <UploadCloud className="w-6 h-6 text-blue-500" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-700"
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Update Document
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
