import { FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getPapers } from "../services/paperServices";

const ResearchPapers = () => {
  const [papers, setPapers] = useState([]);

  // Fetching the papers from the API
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await getPapers();
        setPapers(response.data); // Assuming the API returns papers in `response.data`
      } catch (error) {
        console.error("Error fetching research papers:", error);
      }
    };

    fetchPapers();
  }, []);

  console.log("Fetched papers:", papers);

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-200 text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Explore Research Papers</h2>
        <p className="mt-3 text-gray-600">
          Browse the latest research papers across various domains.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {papers.slice(0, 2).map((paper) => (
          <div key={paper.paper_id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <FileText size={24} className="text-blue-600" />
              <h3 className="text-xl font-semibold">{paper.paper_name}</h3>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Category ID: {paper.category_id} • Publisher ID: {paper.publisher_id}
            </p>
            <p className="mt-3 text-gray-700 text-sm">
              {paper.description.length > 100
                ? paper.description.slice(0, 100) + "..."
                : paper.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {JSON.parse(paper.tags).map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <a
              href={`/browser/${paper.paper_id}`}
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