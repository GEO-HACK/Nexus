import { useState, useEffect } from 'react';
import { getPaperById } from '../services/paperServices';
import { getCategories } from '../services/categoriesServices';
import { getAllUsers } from '../services/userServices';

/**
 * Custom hook for managing single paper page data
 * This separates data fetching logic from UI components
 * @param {string} paperId - The ID of the paper to fetch
 * @returns {object} - Contains paper data, loading state, error state, and helper functions
 */
export const usePaperData = (paperId) => {
  const [paper, setPaper] = useState(null);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!paperId) {
        setError("No paper ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel for better performance
        const [paperResponse, categoriesResponse, usersResponse] = await Promise.all([
          getPaperById(paperId),
          getCategories(),
          getAllUsers().catch(() => []) // Graceful fallback for users
        ]);

        // Handle different response structures
        const paperData = paperResponse?.data || paperResponse;
        const categoriesData = categoriesResponse?.data || categoriesResponse;
        const usersData = usersResponse?.data || usersResponse;

        // Validate paper data
        if (!paperData) {
          throw new Error("Paper not found");
        }

        setPaper(paperData);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);

        console.log("Fetched Data:", {
          paper: paperData,
          categories: categoriesData,
          users: usersData
        });

      } catch (err) {
        console.error("Error fetching paper data:", err);
        setError(err.message || "Failed to load paper details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [paperId]);

  /**
   * Helper function to get category name for the current paper
   * This encapsulates the business logic for category matching
   */
  const getCategoryName = () => {
    if (!paper || !categories.length) {
      return "Unknown";
    }

    // Try both _id and category_id for flexibility
    const category = categories.find(cat => 
      cat._id === paper.category_id || 
      cat.category_id === paper.category_id ||
      String(cat._id) === String(paper.category_id)
    );

    return category ? (category.category_name || category.category) : "Unknown";
  };

  /**
   * Helper function to get user name by ID
   * This encapsulates the business logic for user matching
   */
  const getUserName = (userId) => {
    if (!users.length || !userId) {
      return "Unknown User";
    }

    const user = users.find(u => u._id === userId || String(u._id) === String(userId));
    return user ? (user.fname + " " + user.lname || user.username || user.email) : "Unknown User";
  };

  return {
    paper,
    categories,
    users,
    loading,
    error,
    getCategoryName,
    getUserName
  };
};
