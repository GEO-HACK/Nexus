import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        console.log("Categories API response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error; // Re-throw to let caller handle it
    }
}