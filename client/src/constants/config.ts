import axios from "axios";

export const BASE_URL = "http://localhost:3000";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent for cross-origin requests
});

axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Response intercepted:", response); // Log successful responses
      return response;
    },
    (error) => {
      console.log("Error intercepted:", error.response); // Log errors
      if (error.response && error.response.status === 401) {
        console.warn("Redirecting to login...");
        window.location.href = "/login"; // Redirect on 401
      }
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
