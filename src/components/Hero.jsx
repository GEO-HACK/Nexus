import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const categories = ["All", "Computer Science", "Physics", "Mathematics", "Biology", "Chemistry"];

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Simple badge */}
      
        {/* Clean headline */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Discover & Share Research Papers
        </h1>
        
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Join a global community of researchers. Explore academic papers, 
          collaborate with peers, and share your work with the world.
        </p>

        {/* Simple search section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search research papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-4 top-4 text-gray-500" size={20} />
            </div>

            {/* Category filter */}
            <div className="relative">
              <button
                className="flex items-center px-6 py-4 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors duration-200"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {filter} <ChevronDown className="ml-2" size={18} />
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-lg w-48 z-50">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg"
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
        </div>

        {/* Simple CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/browser"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Browse Papers
          </Link>
          <Link
            to="/submit"
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200"
          >
            Submit Research
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
