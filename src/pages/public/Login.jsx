// import React, { useState } from "react";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";
// import { useForm } from "react-hook-form";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const { login, loginWithGoogle } = useAuth();
//   const navigate = useNavigate();
//   const [submitting, setSubmitting] = useState(false);

//   const onSubmit = async (data) => {
//     setSubmitting(true);
//     try {
//       const result = await login(data.email, data.password);

//       toast.success("Login successful!");

//       // ✅ REDIRECT TO HOME PAGE FOR BOTH HR AND EMPLOYEE
//       navigate("/");
//     } catch (err) {
//       console.error("Login error:", err);

//       // Handle specific Firebase errors
//       let errorMessage = "Login failed. Please check your credentials.";

//       if (
//         err.code === "auth/invalid-credential" ||
//         err.code === "auth/wrong-password"
//       ) {
//         errorMessage = "Invalid email or password.";
//       } else if (err.code === "auth/user-not-found") {
//         errorMessage = "No account found with this email.";
//       } else if (err.code === "auth/too-many-requests") {
//         errorMessage = "Too many failed attempts. Please try again later.";
//       } else if (err.code === "auth/user-disabled") {
//         errorMessage = "This account has been disabled.";
//       } else if (err.code === "auth/invalid-email") {
//         errorMessage = "Invalid email format.";
//       } else if (err.response?.data?.message) {
//         errorMessage = err.response.data.message;
//       } else if (err.message) {
//         errorMessage = err.message;
//       }

//       toast.error(errorMessage);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // const handleGoogle = async () => {
//   //   setSubmitting(true);
//   //   try {
//   //     // For Google login, we need to determine the role
//   //     // You might want to add a role selection modal here
//   //     // For now, I'll assume employee role for Google sign-in

//   //     const result = await loginWithGoogle("employee");

//   //     toast.success("Logged in with Google successfully!");

//   //     // ✅ REDIRECT TO HOME PAGE
//   //     navigate("/");
//   //
//   //   } catch (err) {
//   //     console.error("Google login error:", err);

//   //     let errorMessage = "Google login failed.";

//   //     if (err.code === "auth/popup-closed-by-user") {
//   //       errorMessage = "Sign-in popup was closed. Please try again.";
//   //     } else if (err.code === "auth/cancelled-popup-request") {
//   //       errorMessage = "Sign-in was cancelled.";
//   //     } else if (err.code === "auth/popup-blocked") {
//   //       errorMessage = "Pop-up was blocked by browser. Please allow pop-ups.";
//   //     } else if (err.response?.data?.message) {
//   //       errorMessage = err.response.data.message;
//   //     } else if (err.message) {
//   //       errorMessage = err.message;
//   //     }

//   //     toast.error(errorMessage);
//   //   } finally {
//   //     setSubmitting(false);
//   //   }
//   // };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
//       <main className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
//         <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//             <p className="text-gray-600 mt-2">Sign in to your account</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <input
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                     message: "Invalid email address",
//                   },
//                 })}
//                 type="email"
//                 placeholder="Enter your email"
//                 className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={submitting}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//                 type="password"
//                 placeholder="Enter your password"
//                 className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={submitting}
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={submitting}
//             >
//               {submitting ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Logging in...
//                 </span>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           {/* <div className="mt-6">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={handleGoogle}
//               className="btn btn-outline w-full mt-4 flex items-center justify-center gap-3 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
//               disabled={submitting}
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path
//                   fill="#4285F4"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="#34A853"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="#FBBC05"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="#EA4335"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//               {submitting ? "Please wait..." : "Sign in with Google"}
//             </button>
//           </div> */}

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account? <br />
//               <Link
//                 to="/register/employee"
//                 className="text-blue-600 hover:text-blue-700 font-semibold"
//               >
//                 Register as Employee
//               </Link>
//               {" or "}
//               <Link
//                 to="/register/hr"
//                 className="text-blue-600 hover:text-blue-700 font-semibold"
//               >
//                 Register as HR
//               </Link>
//             </p>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// 2...............

import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const result = await login(data.email, data.password);

      toast.success("Login successful!");

      // ✅ REDIRECT TO HOME PAGE FOR BOTH HR AND EMPLOYEE
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      // Handle specific Firebase errors
      let errorMessage = "Login failed. Please check your credentials.";

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (err.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (err.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email"
                className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Enter your password"
                className="input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submitting}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={submitting}
            >
              {submitting ? (
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
                  Logging in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <br />
              <Link
                to="/register/employee"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register as Employee
              </Link>
              {" or "}
              <Link
                to="/register/hr"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Register as HR
              </Link>
            </p>
            <p className="text-red-500 mt-2">
              Please Wait Some Moment!! The Database is Loading
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// 3.................
