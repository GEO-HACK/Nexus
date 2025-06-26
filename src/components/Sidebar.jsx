const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <aside className="w-full bg-white px-4 py-4 shadow-md rounded-lg md:h-[calc(100vh-2rem)] overflow-y-auto">
      <h1 className="text-lg font-bold mb-4 text-gray-800">Filter By Categories</h1>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className={`py-2 px-4 rounded-md cursor-pointer font-medium transition-all duration-200 ${
              selectedCategory === category.category_id
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-500"
            }`}
            onClick={() => setSelectedCategory(category.category_id)}
          >
            {category.category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
