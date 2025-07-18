import React from 'react';
import { ArrowRight, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const CTA = () => {
  // Get authentication state
  const { user, isAuthenticated, loading } = useAuth();
  
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join NeXus?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Connect with researchers worldwide, discover quality papers, 
            and share your knowledge with the global academic community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              to="/browser"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Research
            </Link>

            {!loading && isAuthenticated ? (
              <Link
                to="/submit"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Submit Your Work
              </Link>
            ) : !loading && (
              <Link
                to="/login"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Login to Submit
              </Link>
            )}
          </div>

          {/* Simple benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <h3 className="font-semibold mb-2">Free Access</h3>
              <p className="text-blue-100">No subscription fees</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Instant Download</h3>
              <p className="text-blue-100">Immediate paper access</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Global Network</h3>
              <p className="text-blue-100">Connect worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
