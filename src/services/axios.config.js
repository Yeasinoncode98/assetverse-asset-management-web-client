import axios from "axios";
import { auth } from "../firebase.config";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000, // ✅ Increased timeout for slower connections
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Helper function to get token with retries
const getTokenWithRetry = async (maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Priority 1: Try localStorage first (fastest)
      let token = localStorage.getItem("token");

      if (token) {
        return token;
      }

      // Priority 2: Try to get from Firebase currentUser
      if (auth.currentUser) {
        console.log(
          `⏳ Getting fresh token from Firebase (attempt ${attempt + 1})...`
        );
        token = await auth.currentUser.getIdToken();

        if (token) {
          localStorage.setItem("token", token);
          return token;
        }
      }

      // If no token found, wait and retry
      if (attempt < maxRetries - 1) {
        console.warn(
          `⚠️ No token found, retrying in ${(attempt + 1) * 200}ms...`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, (attempt + 1) * 200)
        );
      }
    } catch (error) {
      console.error(
        `❌ Token retrieval error (attempt ${attempt + 1}):`,
        error.message
      );

      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, (attempt + 1) * 300)
        );
      }
    }
  }

  console.warn("⚠️ Failed to get token after retries");
  return null;
};

// ✅ Request interceptor - Add Firebase token with retry logic
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // Skip token for auth endpoints that don't need it
      const isAuthEndpoint =
        config.url?.includes("/auth/register") ||
        config.url?.includes("/auth/login");

      if (isAuthEndpoint && config.method === "post") {
        console.log("🔓 Skipping token for auth endpoint");
        return config;
      }

      // Get token with retry logic
      const token = await getTokenWithRetry();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("✅ Token added to request:", config.url);
      } else {
        console.warn("⚠️ No token available for request:", config.url);
      }
    } catch (error) {
      console.error("❌ Error in request interceptor:", error);
    }

    return config;
  },
  (error) => {
    console.error("❌ Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor - Handle token expiration and errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log("✅ API Response:", response.config.url, response.status);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Log error details
    console.error("❌ API Error:", {
      url: originalRequest?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });

    // Handle 503 (Service Unavailable - MongoDB not ready)
    if (error.response?.status === 503) {
      console.warn("⚠️ Database not ready, retrying...");

      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      if (originalRequest._retryCount < 3) {
        originalRequest._retryCount++;

        // Wait before retrying (exponential backoff)
        const delay = Math.pow(2, originalRequest._retryCount) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));

        return axiosInstance(originalRequest);
      }
    }

    // Handle 401 (Unauthorized - Token expired or invalid)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("🔄 Token expired, refreshing...");

        if (auth.currentUser) {
          // Get fresh token from Firebase
          const newToken = await auth.currentUser.getIdToken(true);
          localStorage.setItem("token", newToken);
          console.log("✅ Token refreshed successfully");

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } else {
          // No current user, redirect to login
          console.warn("⚠️ No authenticated user, redirecting to login...");
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (refreshError) {
        // If refresh fails, logout user
        console.error("❌ Token refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle 500 errors with retry logic (for first-time login issue)
    if (error.response?.status === 500 && !originalRequest._retry500) {
      originalRequest._retry500 = true;

      console.warn("⚠️ Server error 500, retrying once...");

      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
