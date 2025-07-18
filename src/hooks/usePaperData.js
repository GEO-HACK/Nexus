import { useState, useEffect } from 'react';
import { getPaperById } from '../services/paperServices';
import { getCategories } from '../services/categoriesServices';
import { getAllUsers } from '../services/userServices';

/**

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

        console.log("Fetching data for paper ID:", paperId);

        // First, try to fetch categories (this seems to work)
        let categoriesData = [];
        try {
          const categoriesResponse = await getCategories();
          categoriesData = categoriesResponse?.data || categoriesResponse;
          console.log("Categories fetched successfully:", categoriesData);
        } catch (err) {
          console.warn("Failed to fetch categories:", err);
          // Continue without categories
        }

        // Then try to fetch the paper
        let paperData = null;
        try {
          const paperResponse = await getPaperById(paperId);
          paperData = paperResponse?.data || paperResponse;
          console.log("Paper fetched successfully:", paperData);
        } catch (err) {
          console.error("Failed to fetch paper:", err);
          
          // Provide more specific error messages
          if (err.response?.status === 404) {
            throw new Error("Paper not found. Please check the paper ID.");
          } else if (err.response?.status === 403) {
            throw new Error("Access denied. You don't have permission to view this paper.");
          } else {
            throw new Error(`Failed to load paper: ${err.message}`);
          }
        }

        // Finally, try to fetch users (optional, since it's failing with 403)
        let usersData = [];
        try {
          const usersResponse = await getAllUsers();
          usersData = usersResponse?.data || usersResponse;
          console.log("Users fetched successfully:", usersData);
        } catch (err) {
          console.warn("Failed to fetch users (continuing without user data):", err);
          // Continue without users - this is not critical for viewing papers
        }

        // Validate paper data
        if (!paperData) {
          throw new Error("Paper data is empty or invalid");
        }

        // Set all state
        setPaper(paperData);
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);

        console.log("All data set successfully:", {
          paper: paperData,
          categoriesCount: categoriesData.length,
          usersCount: usersData.length
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
   * Gracefully handles missing user data
   */
  const getUserName = (userId) => {
    if (!userId) {
      return "Unknown User";
    }

    if (!users.length) {
      // If no users are loaded (due to 403 error), just return the user ID
      return `User ${userId.slice(-4)}`; // Show last 4 characters of ID
    }

    const user = users.find(u => u._id === userId || String(u._id) === String(userId));
    
    if (!user) {
      return `User ${userId.slice(-4)}`; // Show last 4 characters if not found
    }

    // Try different name combinations
    if (user.fname && user.lname) {
      return `${user.fname} ${user.lname}`;
    }
    
    return user.username || user.email || `User ${userId.slice(-4)}`;
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
