import axios from "axios";


export const getTags = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/tags`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}