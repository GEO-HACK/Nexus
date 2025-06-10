import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import PaperList from "../components/PaperList";
import { getPapers } from "../services/paperServices";
import { getCategories } from "../services/categoriesServices";

const Browser = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [researchPapers, setResearchPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetching the papers on mount
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const papers = await getPapers();
        setResearchPapers(papers || []); 
        setFilteredPapers(papers || []);
       
      } catch (err) {
        console.error("Error fetching papers:", err);
      }
    };
    fetchPapers();
  }, []);

  // Fetching the categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data || []; // Default to an empty array if data is undefined
        console.log("this are the categories that are in the database", categoriesData);

       //mapping to the expected fromat
       const mappedCategories = categoriesData.map((cat) => ({
          _id: cat._id,
          category: cat.category_name,
          category_id: cat._id, // Assuming each category has a unique _id
       }))
        setCategories([
          { _id: "All", category: "All" }, 
          ...mappedCategories, 
        ]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Filtering the papers whenever category is selected or search term is inputted
  useEffect(() => {
    const filtered = researchPapers
      .filter((paper) =>
        selectedCategory === "All" // If 'All' category is selected, show all papers
          ? true
          : paper._id === selectedCategory // Filter by category_id
      )
      .filter(
        (paper) =>
          (paper.paper_name?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (paper.description?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
      );
    setFilteredPapers(filtered);
  }, [selectedCategory, searchTerm, researchPapers]);

  console.log("Filtered Papers:", filteredPapers);

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4">
      {/* Sidebar component */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="w-3/4 bg-white px-6 py-4 shadow-md rounded-md h-full overflow-y-auto">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search papers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />

        {/* Paper List */}
        {filteredPapers.length > 0 ? (
          <PaperList filteredPapers={filteredPapers} />
        ) : (
          <p className="text-center text-gray-500">No papers found.</p>
        )}
      </main>
    </div>
  );
};

export default Browser;
