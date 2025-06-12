import { createContext, useContext, useState, useEffect } from "react";
import {
  login,
  signup,
  logout,
  getToken,
} from "../services/authServices";
import { User } from "lucide-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user when the app loads
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user...");
      const token = getToken();
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    const response = await login(email, password);

    if (response.token) {
      const userData = {
        email: response.user.email,
        username: response.user.username,
        // add more fields if needed
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setLoading(false); // <-- Add this line
    }

    return response;
  };
  
  

  const handleSignup = async (institution, fname, lname,username, email, password) => {
    const response = await signup(institution,fname, lname,username, email, password);
    if (response.token) {
      const userData = { email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
    return response;
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user"); // Clear stored user
    setUser(null); // Trigger re-render
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleSignup, handleLogout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
