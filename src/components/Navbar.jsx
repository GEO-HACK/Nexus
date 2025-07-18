import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUser, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAuthenticated, handleLogout, loading } = useAuth();

  // Debug authentication state
  useEffect(() => {
    console.log("Navbar: Auth state changed", { 
      user: user ? user.username : null, 
      isAuthenticated, 
      loading 
    });
  }, [user, isAuthenticated, loading]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-900 backdrop-blur-md shadow-lg text-white px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-tight bg-white text-transparent bg-clip-text">
        NeXus
      </h1>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-orange-300 transition duration-200">Home</Link>
        <Link to="/browser" className="hover:text-orange-300 transition duration-200">Articles</Link>

        {loading ? (
          <div className="text-gray-300">Loading...</div>
        ) : isAuthenticated ? (
          <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            <Link to="/submit">
              <span className="px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-400 text-white font-semibold hover:scale-105 transition-transform">
                Submit
              </span>
            </Link>

            <button onClick={toggleDropdown} className="hover:text-orange-300 transition duration-200">
              <CircleUser size={28} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-14 w-44 bg-white/90 backdrop-blur-md text-black rounded-lg shadow-md border border-gray-300 z-50">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 rounded-t-md"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  className="flex w-full items-center gap-2 px-4 py-3 text-red-500 hover:bg-gray-100 rounded-b-md"
                  onClick={async () => {
                    await handleLogout();
                    navigate("/login");
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="hover:text-orange-300 transition duration-200">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
