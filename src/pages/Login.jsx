import React, { useState } from "react";
import { login, signup } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let response;
    if (isSignup) {
      if (!fname || !lname || !email || !password) {
        setError("All fields are required for signup");
        setLoading(false);
        return;
      }
      response = await signup(fname, lname, email, password);
    } else {
      if (!email || !password) {
        setError("Email and password are required for login");
        setLoading(false);
        return;
      }
      response = await login(email, password);
    }

    setLoading(false);

    if (response.error) {
      setError(response.error);
    } else {
      console.log("Success:", response);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token); // Ensure token is stored

      // Display Welcome Message
      setWelcome(`Welcome ${response.user.fname} ${response.user.lname}`);

      // ✅ Added Delay Before Navigation
      setTimeout(() => {
        setWelcome(""); // Clear the welcome message
        navigate("/"); // Navigate after delay
      }, 2000); // 3-second delay
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
            <div className="flex flex-row gap-2">
              <div className="mb-4 w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
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
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
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
