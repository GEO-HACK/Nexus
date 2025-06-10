import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// function to get papers from the server
export const getPapers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/papers`);
        console.log("Papers fetched successfully:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching papers:", error);
        return [];
    }
}

// getting papers by id
export const getPaperById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/papers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching paper by ID:", error);
        throw error;
    }
}

// posting papers
export const uploadPapers = async (formData, token) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/papers/local`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (err) {
        throw err;
    }
}

export const getPapersByUser = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/papers?publisher_id=${id}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching papers by user:", err);
        throw err;
    }
}

export const updatePaper = async (data) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
            `${BASE_URL}/papers/`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (err) {
        console.error("Error editing paper:", err.response?.data || err.message);
        throw err;
    }
};

export const deletePapers = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${BASE_URL}/papers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (err) {
        console.error("Error deleting paper:", err);
        throw err;
    }
}
