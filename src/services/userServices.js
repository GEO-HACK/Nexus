import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

 export const getUsers = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/authors`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    }