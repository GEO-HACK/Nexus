import { createContext, useContext, useState, useEffect, useCallback } from "react";
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

  const handleLogin = useCallback(async (email, password) => {
    try {
      setLoading(true);
      const response = await login(email, password);

      if (response.token && response.user) {
        const userData = {
          id: response.user.id || response.user._id,
          email: response.user.email,
          username: response.user.username,
          fname: response.user.fname,
          lname: response.user.lname,
          institution: response.user.institution,
          // add more fields if needed
        };

        // Update state immediately before localStorage to ensure immediate re-render
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User logged in successfully:", userData);
        
        // Force re-render by updating loading state after user is set
        setLoading(false);
        return response;
      }

      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      throw error;
    }
  }, []);
  
  

  const handleSignup = useCallback(async (institution, fname, lname, username, email, password) => {
    try {
      setLoading(true);
      const response = await signup(institution, fname, lname, username, email, password);
      
      if (response.token && response.user) {
        const userData = {
          id: response.user.id || response.user._id,
          email: response.user.email,
          username: response.user.username,
          fname: response.user.fname,
          lname: response.user.lname,
          institution: response.user.institution,
        };
        
        // Update state immediately before localStorage to ensure immediate re-render
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("User signed up successfully:", userData);
        
        // Force re-render by updating loading state after user is set
        setLoading(false);
        return response;
      }
      
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      throw error;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setLoading(true);
      await logout();
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // Also remove token
      setUser(null);
      console.log("User logged out successfully");
      setLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, clear local state
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Helper to determine if user is authenticated
  const isAuthenticated = Boolean(user);

  // Debug logging for state changes
  useEffect(() => {
    console.log("Auth state changed:", { user: user ? user.username : null, loading, isAuthenticated });
  }, [user, loading, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isAuthenticated, 
        handleLogin, 
        handleSignup, 
        handleLogout, 
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
