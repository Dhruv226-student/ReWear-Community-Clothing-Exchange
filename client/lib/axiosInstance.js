// export default axiosInstance;
import axios from "axios";
import Router from "next/router"; // For client-side navigation in Next.js

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header from localStorage (for client-side only)
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login page if unauthorized (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("access_token"); // Optional: clear token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
