import { FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getPapers } from "../services/paperServices";

const tagColors = [
  "bg-blue-200 text-blue-800",
  "bg-green-200 text-green-800",
  "bg-yellow-200 text-yellow-800",
  "bg-red-200 text-red-800",
  "bg-purple-200 text-purple-800",
  "bg-pink-200 text-pink-800",
  "bg-indigo-200 text-indigo-800",
  "bg-teal-200 text-teal-800",
  "bg-gray-200 text-gray-800",
  "bg-orange-200 text-orange-800",
  "bg-cyan-200 text-cyan-800",
]

const ResearchPapers = () => {
  const [papers, setPapers] = useState([]);
  const randomColor = tagColors[Math.floor(Math.random() * tagColors.length)];

  // Fetching the papers from the API
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await getPapers();
        console.log("Fetched papers:", response);
        setPapers(response || []); // Assuming the API returns papers in `response.data`
      } catch (error) {
        console.error("Error fetching research papers:", error);
      }
    };

    fetchPapers();
  }, []);

  console.log("Fetched papers:", papers);

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-r from-blue-100 via-indigo-200 to-purple-300 text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Explore Research Papers</h2>
        <p className="mt-3 text-gray-600">
          Browse the latest research papers across various domains and discover new insights.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {papers.slice(0, 3).map((paper) => (
          <div
            key={paper._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-3">
              <FileText size={24} className="text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">{paper.paper_name}</h3>
            </div>
            {/* <p className="text-gray-500 text-sm mt-1">
              Category ID: {paper._id} • Publisher ID: {paper._id}
            </p> */}
            <p className="mt-3 text-gray-700 text-sm">
              {paper.description.length > 100
                ? paper.description.slice(0, 100) + "..."
                : paper.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {paper.tags && paper.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`${randomColor} px-3 py-1 rounded-full text-sm font-medium`}
                >
                  #{tag}
                </span>
              ))}
            </div>
            <a
              href={`/browser/${paper._id}`}
              className="mt-4 inline-flex items-center text-blue-600 font-medium hover:underline"
            >
              Read More <ArrowRight className="ml-1" size={18} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchPapers;
