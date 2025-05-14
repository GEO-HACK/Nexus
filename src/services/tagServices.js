import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;


export const getTags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/tags`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}