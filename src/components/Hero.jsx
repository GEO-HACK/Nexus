// Hero.jsx
import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Science", "Technology", "Engineering", "Mathematics"];

const mockPapers = [
  { id: 1, title: "The Future of AI in Technology", category: "Technology" },
  { id: 2, title: "Quantum Physics and its Applications", category: "Science" },
  { id: 3, title: "Advancements in Civil Engineering", category: "Engineering" },
  { id: 4, title: "Mathematical Models in Biology", category: "Mathematics" },
];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredPapers = mockPapers.filter((paper) => {
    const queryWords = searchQuery.toLowerCase().split(" ").filter(Boolean);
    const titleWords = paper.title.toLowerCase().split(" ");
    const matchesQuery = queryWords.some((queryWord) => titleWords.includes(queryWord));
    const matchesCategory = filter === "All" || paper.category === filter;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-24 px-6 md:px-12 text-center overflow-hidden">

      {/* Blurred Background Lights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-gradient-to-br from-[#b79891] to-[#94716b] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-[#ffc371] to-[#ff5f6d] opacity-10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-wide text-gray-100 drop-shadow-lg">
          Discover & Share Groundbreaking Research
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Explore a wealth of scholarly articles, share your knowledge, and collaborate with global researchers.
        </p>

        {/* Search & Filter */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <Search className="absolute right-4 top-3 text-gray-500" size={20} />

            {/* Dropdown Results */}
            {searchQuery && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-xl rounded-md w-full z-50 max-h-48 overflow-y-auto">
                {filteredPapers.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {filteredPapers.map((paper) => (
                      <li key={paper.id} className="px-4 py-3 hover:bg-gray-100">
                        <Link to={`/browser/${paper.id}`} className="text-blue-700 font-medium hover:underline">
                          {paper.title}
                        </Link>
                        <p className="text-sm text-gray-500">{paper.category}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-2 text-gray-500">No results found.</p>
                )}
              </div>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative">
            <button
              className="flex items-center px-6 py-3 bg-[#1f2937] rounded-xl text-white hover:bg-[#374151] transition duration-200"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {filter} <ChevronDown className="ml-2 text-gray-300" size={18} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-md w-48 z-50">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="px-6 py-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setFilter(category);
                      setShowDropdown(false);
                    }}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <Link
            to="/browser"
            className="px-8 py-4 text-xl font-semibold bg-gradient-to-r from-[#ffd194] to-[#bc4e9c] rounded-lg text-white shadow-md hover:shadow-xl transition-all duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
