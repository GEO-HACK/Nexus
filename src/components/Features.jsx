import React from 'react';
import { Search, Upload, Share2, Download, Shield, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Search className="w-12 h-12 text-blue-600" />,
      title: "Advanced Search",
      description: "Find relevant research papers using our AI-powered semantic search engine with intelligent filtering and categorization."
    },
    {
      icon: <Upload className="w-12 h-12 text-green-600" />,
      title: "Easy Publishing",
      description: "Submit your research papers with our streamlined upload process. Support for multiple formats including PDF, DOC, and more."
    },
    {
      icon: <Share2 className="w-12 h-12 text-purple-600" />,
      title: "Collaboration Tools",
      description: "Connect with fellow researchers, share insights, and collaborate on projects with our built-in networking features."
    },
    {
      icon: <Download className="w-12 h-12 text-orange-600" />,
      title: "Instant Access",
      description: "Download papers instantly with proper citations. Offline reading support and mobile-optimized viewing experience."
    },
    {
      icon: <Shield className="w-12 h-12 text-red-600" />,
      title: "Secure & Reliable",
      description: "Your research is protected with enterprise-grade security. Regular backups and 99.9% uptime guarantee."
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-600" />,
      title: "Real-time Updates",
      description: "Get notified about new papers in your field. Stay updated with trending research and emerging topics."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Features for Modern Research
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to discover, share, and collaborate on research
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple call-to-action */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 p-8 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of researchers who use NeXus daily
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Start Exploring
              </button>
              <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
                Upload Research
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
