import axios from "axios";



 export const getUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/authors`,
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