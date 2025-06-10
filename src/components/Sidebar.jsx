const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => 
  {
  return (
    <aside className="w-1/4 bg-white px-6 py-6 shadow-lg rounded-lg h-full overflow-scroll">
      <h1 className="text-lg font-bold mb-4 text-gray-800">Filter By Categories</h1>
      <ul className="space-y-2">
        {/* Render categories dynamically */}
        {categories.map((category) => (
          <li
            key={category._id} // Use category_id for uniqueness
            className={`py-2 px-4 rounded-md cursor-pointer font-medium transition-all duration-200 ${
              selectedCategory === category.category_id
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
            }`}
            onClick={() => setSelectedCategory(category.category_id)} // Set selected category by category_id
          >
            {category.category} {/* Display the category name */}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
