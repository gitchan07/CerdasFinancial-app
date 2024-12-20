import axios from "axios";

const api = axios.create({
    baseURL: "https://api-cerdasfinancial.crowintheglass.com/api/v1", // Base URL API
});

// Login user
export const login = async (formData) => {
    const response = await api.post("/login", formData);
    return response;
};

// Register user
export const register = async (formData) => {
    const response = await api.post("/register", formData);
    return response;
};

// Get current user (requires token)
export const getCurrentUser = async (token) => {
    const response = await api.get("/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};

// Fetch courses data (requires token)
export const fetchCourses = async (token) => {
    try {
        console.log("Fetching courses...");
        const response = await api.get("/courses", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Response:", response);
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

// Fetch user profile data (requires token)
export const fetchUserProfile = async (token) => {
    try {
        const response = await api.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

// Function to handle Content Course
export const fetchCourseData = async (courseId, token) => {
    try {
        const response = await api.get(`/course/${courseId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching course data:", error);
        throw error;
    }
};

// Function to handle subscription
export const subscribeToCourse = async (selectedPrice, token) => {
    try {
        const formData = new FormData();
        formData.append("price", selectedPrice * 1000);

        const response = await api.post(`/subscribe`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        console.error("Error during subscription:", error);
        throw error;
    }
};
