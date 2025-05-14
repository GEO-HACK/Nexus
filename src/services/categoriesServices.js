import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}