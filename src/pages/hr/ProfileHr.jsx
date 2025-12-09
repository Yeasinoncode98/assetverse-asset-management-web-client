import React, { useState, useEffect } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";

export default function HRProfile() {
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    dateOfBirth: "",
    companyName: "",
    companyLogo: "",
  });
  const [hrStats, setHrStats] = useState({
    packageLimit: 0,
    currentEmployees: 0,
    subscription: "basic",
  });

  // ✅ FETCH REAL HR USER DATA
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // ✅ GET CURRENT LOGGED IN HR USER
      const response = await axios.get("/auth/me");
      const user = response.data;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        photo:
          user.profileImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || "User"
          )}&size=200&background=3b82f6&color=fff&bold=true`,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
        companyName: user.companyName || "",
        companyLogo:
          user.companyLogo ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.companyName || "Company"
          )}&background=10b981&color=fff&size=200`,
      });

      setHrStats({
        packageLimit: user.packageLimit || 5,
        currentEmployees: user.currentEmployees || 0,
        subscription: user.subscription || "basic",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // ✅ FIXED: Changed from /hr/profile to /profile
      const response = await axios.put("/profile", {
        name: formData.name.trim(),
        dateOfBirth: formData.dateOfBirth,
        photo: formData.photo.trim(),
        companyName: formData.companyName.trim(),
        companyLogo: formData.companyLogo.trim(),
      });

      toast.success(response.data.message || "Profile updated successfully!");

      // ✅ Refresh profile data to show updated info
      await fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  // --- RENDER LOGIC ---

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Main Component
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          HR Profile 👔
        </h2>
        <p className="text-lg text-gray-500">
          Manage your personal information and company details.
        </p>
      </div>
      <hr className="mb-8" />

      {/* GRID: Left sidebar (1/3) and Right form (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
        {/* 🎨 LEFT COLUMN: PROFILE CARD & COMPANY INFO */}
        <div className="lg:col-span-1 space-y-8">
          {/* 1. MODERN GRADIENT PROFILE CARD */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl shadow-2xl overflow-hidden border border-blue-500/30">
            {/* Background Pattern */}
            <div className="relative h-36 bg-gradient-to-r from-purple-600/90 to-blue-600/90">
              <div className="absolute inset-0 opacity-20">
                <svg
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="dot-grid"
                      width="25"
                      height="25"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2.5" cy="2.5" r="1" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dot-grid)" />
                </svg>
              </div>
            </div>

            {/* Profile Content */}
            <div className="relative px-6 pb-8 -mt-24">
              {/* Profile Photo */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                  <div className="relative">
                    <img
                      src={formData.photo}
                      alt={formData.name}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          formData.name || "User"
                        )}&size=200&background=3b82f6&color=fff&bold=true`;
                      }}
                      className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center text-white mb-6">
                <h3 className="text-3xl font-extrabold mb-1 drop-shadow-lg">
                  {formData.name || "HR Manager"}
                </h3>
                <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 mx-auto w-fit shadow-inner mb-2">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-white text-sm font-medium opacity-95">
                    {formData.email}
                  </p>
                </div>
                {/* Role Badge */}
                <div className="inline-flex items-center gap-2 bg-yellow-400/90 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  HR Manager
                </div>
              </div>

              {/* Stats - Employee & Package Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 transition-all hover:bg-white/30 shadow-lg">
                  <p className="text-2xl font-extrabold text-white drop-shadow-lg">
                    {hrStats.currentEmployees}/{hrStats.packageLimit}
                  </p>
                  <p className="text-sm text-white font-semibold mt-1 opacity-90">
                    Employees
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 transition-all hover:bg-white/30 shadow-lg">
                  <p className="text-2xl font-extrabold text-white drop-shadow-lg capitalize">
                    {hrStats.subscription}
                  </p>
                  <p className="text-sm text-white font-semibold mt-1 opacity-90">
                    Package
                  </p>
                </div>
              </div>

              {/* Birthday Info */}
              <div className="mt-6">
                <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 transition-all hover:bg-white/30 shadow-lg">
                  <div className="bg-white/40 rounded-lg p-2 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white font-medium opacity-80 uppercase tracking-wider">
                      Birthday
                    </p>
                    <p className="text-lg text-white font-bold truncate">
                      {formData.dateOfBirth
                        ? new Date(formData.dateOfBirth).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 🏢 COMPANY INFO CARD */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Company Info
              </h3>
            </div>

            <div className="space-y-4">
              {/* Company Logo */}
              <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6 border border-gray-100">
                <img
                  src={formData.companyLogo}
                  alt={formData.companyName}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      formData.companyName || "Company"
                    )}&background=10b981&color=fff&size=200`;
                  }}
                  className="w-24 h-24 rounded-xl object-cover shadow-md"
                />
              </div>

              {/* Company Name */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Company Name
                </p>
                <p className="text-xl font-extrabold text-gray-900">
                  {formData.companyName || "Not Set"}
                </p>
              </div>

              {/* Package Usage Progress */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">
                    Employee Capacity
                  </span>
                  <span className="text-sm font-bold text-blue-600">
                    {hrStats.currentEmployees} / {hrStats.packageLimit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (hrStats.currentEmployees / hrStats.packageLimit) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 📝 RIGHT COLUMN: PROFILE FORM */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200">
            <div className="flex items-center gap-4 mb-8 border-b pb-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-800">
                  Update Profile
                </h3>
                <p className="text-gray-500">
                  Keep your personal and company information up to date.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Personal Information Section */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Personal Information
                </h4>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email (Read-only) */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700">
                        Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        className="input input-bordered w-full p-3 bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed text-base"
                        disabled
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <label className="label">
                      <span className="label-text-alt text-red-500 font-medium">
                        This field is read-only for security reasons.
                      </span>
                    </label>
                  </div>

                  {/* Profile Image URL */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700">
                        Profile Image URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="photo"
                      value={formData.photo}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base"
                      placeholder="https://example.com/your-photo.jpg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">
                        Enter a direct image URL
                      </span>
                    </label>
                  </div>

                  {/* Date of Birth */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700">
                        Date of Birth
                      </span>
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company Information Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Company Information
                </h4>

                <div className="space-y-4">
                  {/* Company Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700">
                        Company Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base bg-white"
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  {/* Company Logo URL */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-bold text-gray-700">
                        Company Logo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      name="companyLogo"
                      value={formData.companyLogo}
                      onChange={handleChange}
                      className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base bg-white"
                      placeholder="https://example.com/company-logo.jpg"
                    />
                    <label className="label">
                      <span className="label-text-alt text-gray-500">
                        Enter a direct image URL for your company logo
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="btn w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-4 h-auto rounded-xl font-bold disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={updating}
                >
                  {updating ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                      Updating Profile...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
