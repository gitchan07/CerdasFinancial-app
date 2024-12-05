import axios from "axios";

// const api = axios.create({
//   baseURL: "http://117.53.47.31:5000/", // Base URL API
// });

// Fetch courses data
export const fetchCourses = async () => {
  try {
    console.log("Fetching courses...");
    const response = await axios.get("/api/courses");
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
    const response = await axios.get("api/users"); // Endpoint disesuaikan
    return response.data; // Pastikan struktur data sesuai dengan response API
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
