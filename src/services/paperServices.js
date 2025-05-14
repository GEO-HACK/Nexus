import axios from "axios";



// function to get papers from the server
export const getPapers = async () => {
    try {
        const response = await axios.get(`${process.env.API_URL}/papers`);
        return response.data;
    }catch (error) {
        console.error("Error fetching papers:", error);
        return [];
    }


}

//getting papers by id
export const getPaperById = async (id) => {
    try {
        const response = await axios.get(`${process.env.API_URL}/papers/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching paper by ID:", error);
        throw error;
    }
}


// posting papers
export const uploadPapers = async(formData, token) => {
    try{
        const response = await axios.post(
            `${process.env.API_URL}/papers/local`,
            formData,
            {
                headers :{
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return response.data;
    
    }catch(err){
        throw err;
    }
} 

export const getPapersByUser = async(id) => {
    try{
        const response = await axios.get(`${process.env.API_URL}/papers?publisher_id=${id}`)
        return response.data
    }catch(err){
        console.error("Error fetching papers by user:", err);
        throw err;
    }
}
export const updatePaper = async (data) => {
    try {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage

        const response = await axios.put(
            `${process.env.API_URL}/papers/`, // Correct endpoint
            data, // Send data as JSON
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Authorization header
                    "Content-Type": "application/json", // JSON content type
                },
            }
        );
        return response.data; // Return the response data
    } catch (err) {
        console.error("Error editing paper:", err.response?.data || err.message); // Log the error
        throw err; // Rethrow the error for further handling
    }
};
export const deletePapers = async(id) => {
    try{

        const token = localStorage.getItem("token");
        const response = await axios.delete(`${process.env.API_URL}/papers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }     
               }
        );
        return response.data;
    }catch(err){
        console.error("Error deleting paper:", err);
        throw err;
    }
}