import axios from "axios";

const api = axios.create({
    baseURL: "https://api-cerdasfinancial.crowintheglass.com/api/v1", // Base URL API
});

export const login = async (formData) => {
    const response = await api.post("/login", formData);
    return response;
};

export const register = async (formData) => {
    const response = await api.post("/register", formData);
    return response;
};

export const getCurrentUser = async (token) => {
    const response = await api.get("/me", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
    return response;
};
// Fetch courses data
export const fetchCourses = async () => {
    try {
        console.log("Fetching courses...");
        const response = await api.get("/api/v1/courses");
        console.log("Response:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

// Fetch user profile data
export const fetchUserProfile = async () => {
    try {
        const response = await api.get("api/v1/me"); // Endpoint disesuaikan
        return response.data; // Pastikan struktur data sesuai dengan response API
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};
