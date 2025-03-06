import { FileText, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const ResearchPapers = () => {
  // Sample papers data (Replace with API data)
  const [papers, setPapers] = useState([])


useEffect(() => {
	fetch("/api/research_papers")
		.then((response) => response.json())
		.then((data) => {
      setPapers(data)
		})
		.catch((error) => {
			console.error("Error fetching research papers:", error);
		});
}, []);

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-200 text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold">Explore Research Papers</h2>
        <p className="mt-3 text-gray-600">
          Browse the latest research papers across various domains.
        </p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {papers.map((paper) => (
          <div key={paper.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <FileText size={24} className="text-blue-600" />
              <h3 className="text-xl font-semibold">{paper.title}</h3>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              By {paper.author} • {paper.category}
            </p>
            <p className="mt-3 text-gray-700 text-sm">{paper.abstract}</p>
            <a
              href={`/paper-details/${paper.id}`}
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
