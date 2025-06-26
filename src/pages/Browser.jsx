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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoriesData = response.data || [];

        const mappedCategories = categoriesData.map((cat) => ({
          _id: cat._id,
          category: cat.category_name,
          category_id: cat._id,
        }));

        setCategories([{ _id: "All", category: "All" }, ...mappedCategories]);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = researchPapers
      .filter((paper) =>
        selectedCategory === "All" ? true : paper.category_id === selectedCategory
      )
      .filter(
        (paper) =>
          (paper.paper_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (paper.description?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      );
    setFilteredPapers(filtered);
  }, [selectedCategory, searchTerm, researchPapers]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-screen bg-gray-100 p-4 gap-4 overflow-hidden">
      <aside className="w-full md:max-w-xs md:min-w-[200px]">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </aside>

      <main className="w-full md:flex-1 bg-white px-4 py-4 shadow-md rounded-md h-full overflow-y-auto">
        {/* Search Bar */}
        <div className=" bg-white  pb-4">
          <input
            type="text"
            placeholder="Search papers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Paper List */}
        {filteredPapers.length > 0 ? (
          <PaperList filteredPapers={filteredPapers} />
        ) : (
          <p className="text-center text-gray-500 mt-4">No papers found.</p>
        )}
      </main>
    </div>
  );
};

export default Browser;
