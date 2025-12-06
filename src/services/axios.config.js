// src/services/axios.config.js
import axios from "axios";
import { auth } from "../firebase.config";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add Firebase token to all requests
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Try to get token from localStorage first
      let token = localStorage.getItem("token");

      // If no token in localStorage, try to get from Firebase current user
      if (!token && auth.currentUser) {
        token = await auth.currentUser.getIdToken();
        localStorage.setItem("token", token);
      }

      // Add token to request if available
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error adding token to request:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and we haven't retried yet, refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (auth.currentUser) {
          // Get fresh token from Firebase
          const newToken = await auth.currentUser.getIdToken(true);
          localStorage.setItem("token", newToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // No current user, redirect to login
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
