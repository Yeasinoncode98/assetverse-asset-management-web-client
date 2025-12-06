// src/services/api/packages.api.js
import axiosInstance from "../axios.config";

/**
 * Get all available packages
 * @returns {Promise} List of packages
 */
export const getAllPackages = async () => {
  try {
    const response = await axiosInstance.get("/packages");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get a specific package by ID
 * @param {string} packageId - Package ID
 * @returns {Promise} Package details
 */
export const getPackageById = async (packageId) => {
  try {
    const response = await axiosInstance.get(`/packages/${packageId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Create payment intent for package upgrade
 * @param {Object} paymentData - Payment data (packageName, amount, employeeLimit)
 * @returns {Promise} Client secret for Stripe
 */
export const createPaymentIntent = async (paymentData) => {
  try {
    const response = await axiosInstance.post(
      "/payment/create-intent",
      paymentData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Confirm payment after successful Stripe payment
 * @param {Object} confirmData - Confirmation data (paymentIntentId, packageName, employeeLimit, amount)
 * @returns {Promise} Success message
 */
export const confirmPayment = async (confirmData) => {
  try {
    const response = await axiosInstance.post("/payment/confirm", confirmData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get payment history for current HR user
 * @returns {Promise} List of payment transactions
 */
export const getPaymentHistory = async () => {
  try {
    const response = await axiosInstance.get("/payment/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * Get current user's package info
 * @returns {Promise} Current package details
 */
export const getCurrentPackage = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return {
      packageLimit: response.data.packageLimit,
      currentEmployees: response.data.currentEmployees,
      subscription: response.data.subscription,
    };
  } catch (error) {
    throw error.response?.data || error;
  }
};
