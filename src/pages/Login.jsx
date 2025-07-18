import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();
  
  // Use the auth context instead of direct API calls
  const { handleLogin, handleSignup } = useAuth();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    let response;
    
    if (isSignup) {
      if (!fname || !lname || !institution || !username || !email || !password) {
        setError("All fields are required for signup");
        setLoading(false);
        return;
      }
      response = await handleSignup(institution, fname, lname, username, email, password);
    } else {
      if (!email || !password) {
        setError("Email and password are required for login");
        setLoading(false);
        return;
      }
      response = await handleLogin(email, password);
    }

    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else if (response.user && response.token) {
      // Success - the auth context has already updated the state
      setWelcome(`Welcome ${response.user.fname || response.user.username}!`);
      
      console.log("Login/Signup successful, navigating to home...");
      
      // Navigate immediately without delay to ensure state is already updated
      navigate("/");
    }
  } catch (error) {
    setLoading(false);
    console.error("Auth error:", error);
    setError(error.message || "An error occurred");
  }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Signup" : "Login"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <section>
              <div className="flex flex-row gap-2">
                <div className="mb-4 w-1/2">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-3 py-2 border rounded-md"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label
                    className="block text-gray-700 mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 border rounded-md"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="username" className="text-gray-700">
                  User name
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border rounded-md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="institution" className="text-gray-700">
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  className="w-full px-3 py-2 border rounded-md"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>
            </section>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Signup" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 font-semibold"
          >
            {isSignup ? "Login" : "Signup"}
          </button>
        </p>
      </div>

      {/* Welcome Popup */}
      {welcome && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg transition-opacity duration-500">
          {welcome}
        </div>
      )}
    </div>
  );
};

export default AuthForm;
