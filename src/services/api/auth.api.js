// src/services/api/auth.api.js
import axiosInstance from "../axios.config";

/**
 * Register a new user (HR or Employee)
 * This should be called AFTER Firebase authentication
 * @param {Object} userData - User registration data including firebaseUid
 * @returns {Promise} Response with user data
 */
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**
 * Login user - Syncs Firebase user with backend
 * This should be called AFTER Firebase signIn
 * The Firebase token will be automatically added by axios interceptor
 * @returns {Promise}
 */
export const loginUser = async () => {
  try {
    const response = await axiosInstance.post("/auth/login", {});
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**

 * @returns {Promise} 
 */
export const getMe = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**
 * Update user profile
 * @param {Object} profileData
 * @returns {Promise}
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put("/profile", profileData);
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

/**
 * @returns {Promise}
 */
export const refreshUserData = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
