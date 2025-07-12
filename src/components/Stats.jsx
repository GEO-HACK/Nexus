import React from 'react';
import { Users, FileText, TrendingUp, Award } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      number: "10,000+",
      label: "Research Papers",
      description: "Curated collection of quality research"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      number: "5,000+",
      label: "Researchers",
      description: "Active community of scholars"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      number: "1M+",
      label: "Downloads",
      description: "Papers accessed worldwide"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      number: "95%",
      label: "Satisfaction Rate",
      description: "User satisfaction score"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by Researchers Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of researchers who rely on NeXus for their academic needs
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
