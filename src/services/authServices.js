import axios from "axios";

// Base API URL

// 🔹 Login function
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.API_URL}/auth/login`, { email, password });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));   
        }

        return response.data;
    } catch (error) {
        return { error: error.response?.data?.message || "Login failed" };
    }
};

// 🔹 Signup function
export const signup = async (institution,fname, lname,username, email, password) => {
    try {
        const response = await axios.post(`${process.env.API_URL}/register`, {institution, fname, lname,username, email,password });

        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        console.log("Signup Response:", response.data);

        return response.data;
    } catch (error) {
        console.log(error)
        return { error: error.response?.data?.message || "Signup failed" };
    }
};

// 🔹 Logout function
export const logout = async () => {
    try {
        await axios.get(`${API_URL}/logout`, { headers: authHeaders() });
        localStorage.removeItem("token");
    } catch (error) {
        return { error: error.response?.data?.message || "Logout failed" };
    }
};

// 🔹 Fetch authenticated user
export const getUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user`, { headers: authHeaders() });
        return response.data;
    } catch (error) {
        return null; // Return null if user is not authenticated
    }
};

// 🔹 Get stored token
export const getToken = () => localStorage.getItem("token") || null;

// 🔹 Get authentication headers
export const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
});
