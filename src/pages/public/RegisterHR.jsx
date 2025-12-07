import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function RegisterHR() {
  const { register: registerAuth, loginWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Upload company logo to ImgBB if file selected
      let logoUrl = "";
      if (data.companyLogo && data.companyLogo[0]) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("image", data.companyLogo[0]);
        const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          { method: "POST", body: formData }
        );
        const result = await res.json();

        if (result.success) {
          logoUrl = result.data.url;
        } else {
          throw new Error("Image upload failed");
        }
        setUploadingImage(false);
      }

      // Register with Firebase Auth and Backend
      await registerAuth(data.email, data.password, {
        name: data.name,
        role: "hr",
        dateOfBirth: data.dateOfBirth,
        companyName: data.companyName,
        companyLogo: logoUrl,
        photo: logoUrl, // Optional: use company logo as profile photo
      });

      toast.success("HR account registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);

      // Handle specific Firebase errors
      let errorMessage = "Registration failed. Please try again.";

      if (err.code === "auth/email-already-in-use") {
        errorMessage =
          "This email is already registered. Please login instead.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Use at least 6 characters.";
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage = "Email/password sign-up is disabled.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      // Get company details first
      const companyName = prompt("Enter your company name:");
      if (!companyName) {
        toast.error("Company name is required");
        setLoading(false);
        return;
      }

      const dateOfBirth = prompt("Enter your date of birth (YYYY-MM-DD):");
      if (!dateOfBirth) {
        toast.error("Date of birth is required");
        setLoading(false);
        return;
      }

      await loginWithGoogle("hr", {
        companyName,
        dateOfBirth: new Date(dateOfBirth),
        companyLogo: "",
      });

      toast.success("HR account created with Google!");
      navigate("/hr/dashboard");
    } catch (err) {
      console.error("Google sign-up error:", err);

      let errorMessage = "Google sign-up failed.";

      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-up popup was closed. Please try again.";
      } else if (err.code === "auth/cancelled-popup-request") {
        errorMessage = "Sign-up was cancelled.";
      } else if (err.code === "auth/popup-blocked") {
        errorMessage =
          "Pop-up was blocked. Please allow pop-ups and try again.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Register as HR</h2>
            <p className="text-gray-600 mt-2">
              Create your HR account to manage assets
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                placeholder="Enter your full name"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name *
              </label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters",
                  },
                })}
                placeholder="Enter your company name"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Company Logo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Logo (Optional)
              </label>
              <input
                type="file"
                {...register("companyLogo")}
                accept="image/*"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={loading}
              />
              {uploadingImage && (
                <p className="text-blue-500 text-sm mt-1">Uploading image...</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Create a password (min 6 characters)"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Date of birth is required",
                  validate: (value) => {
                    const date = new Date(value);
                    const today = new Date();
                    const age = today.getFullYear() - date.getFullYear();
                    return age >= 18 || "You must be at least 18 years old";
                  },
                })}
                className="input input-bordered w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading || uploadingImage}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {uploadingImage ? "Uploading..." : "Creating Account..."}
                </span>
              ) : (
                "Create HR Account"
              )}
            </button>
          </form>

          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or sign up with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="btn btn-outline w-full mt-4 flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={loading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? "Please wait..." : "Sign up with Google"}
            </button>
          </div> */}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Looking to join as an employee?{" "}
              <Link
                to="/register/employee"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Employee Registration
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
