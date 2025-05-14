import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Science", "Technology", "Engineering", "Mathematics"];

// Mock search results for demonstration
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

  // Filtered search results
  const filteredPapers = mockPapers.filter((paper) => {
    const queryWords = searchQuery.toLowerCase().split(" ").filter(Boolean); // Split query into words
    const titleWords = paper.title.toLowerCase().split(" "); // Split title into words

    const matchesQuery = queryWords.some((queryWord) =>
      titleWords.includes(queryWord)
    );

    const matchesCategory = filter === "All" || paper.category === filter;

    return matchesQuery && matchesCategory;
  });

  return (
    <section className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 text-white py-24 px-6 md:px-12 text-center overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute top-1/4 left-1/4 w-2/5 h-2/5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-gradient-to-l from-yellow-500 via-orange-500 to-red-500 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-1/4 h-1/4 bg-gradient-to-t from-purple-700 via-purple-800 to-purple-900 opacity-40 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-wide">
          Discover & Share Groundbreaking Research
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          Explore a wealth of scholarly articles, share your knowledge, and collaborate with global researchers.
        </p>

        {/* Search & Filter Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 rounded-xl text-gray-900 placeholder-gray-400 bg-white focus:outline-none shadow-xl hover:shadow-2xl transition-all duration-300"
            />
            <Search
              className="absolute right-4 top-3 text-gray-500"
              size={20}
            />

            {/* Search Results Popup */}
            {searchQuery && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-md w-full z-50 max-h-48 overflow-y-auto">
                {filteredPapers.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {filteredPapers.map((paper) => (
                      <li key={paper.id} className="px-4 py-3 hover:bg-gray-100">
                        <Link
                          to={`/browser/${paper.id}`}
                          className="text-blue-600 hover:underline"
                        >
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
              className="flex items-center px-6 py-3 bg-gray-700 rounded-xl text-white hover:bg-gray-600 transition-all duration-200"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {filter} <ChevronDown className="ml-2 text-gray-300" size={18} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-md rounded-md w-48 z-50">
                {categories.map((category) => (
                  <div
                    key={category}
                    className="px-6 py-3 hover:bg-gray-200 cursor-pointer"
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
            to="/explore"
            className="px-8 py-4 text-xl font-semibold bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all duration-200"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 opacity-60 blur-xl"></div>
    </section>
  );
};

export default Hero;
