import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      title: "Professor of Computer Science, MIT",
      rating: 5,
      text: "NeXus has greatly improved how I discover and share research. The search functionality helps me find exactly what I need, and the platform has connected me with researchers worldwide."
    },
    {
      name: "Prof. Michael Rodriguez",
      title: "Research Director, Stanford University",
      rating: 5,
      text: "The platform's clean design and useful features make it valuable for our research team. Publishing papers is straightforward, and the community feedback is helpful."
    },
    {
      name: "Dr. Emily Watson",
      title: "Senior Researcher, Harvard Medical School",
      rating: 5,
      text: "I've been using NeXus for two years, and it's become my preferred platform for research discovery. The quality of papers and the research community are excellent."
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            What Researchers Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Trusted by leading researchers and institutions worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div>
                <h4 className="text-lg font-semibold text-white">
                  {testimonial.name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {testimonial.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">
            Trusted by researchers from leading institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <span className="text-lg font-medium">MIT</span>
            <span className="text-lg font-medium">Stanford</span>
            <span className="text-lg font-medium">Harvard</span>
            <span className="text-lg font-medium">Oxford</span>
            <span className="text-lg font-medium">Cambridge</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
