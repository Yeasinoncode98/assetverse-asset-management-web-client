// import React, { useState, useEffect } from "react";
// import axios from "../../services/axios.config";
// import { toast } from "react-hot-toast";

// export default function Profile() {
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     photo: "",
//     dateOfBirth: "",
//   });
//   const [companies, setCompanies] = useState([]);

//   // ✅ FETCH REAL USER DATA
//   useEffect(() => {
//     fetchProfile();
//     fetchCompanies();
//   }, []);

//   const fetchProfile = async () => {
//     setLoading(true);
//     try {
//       // ✅ GET CURRENT LOGGED IN USER
//       const response = await axios.get("/auth/me");
//       const user = response.data;

//       setFormData({
//         name: user.name || "",
//         email: user.email || "",
//         photo:
//           user.profileImage ||
//           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//             user.name || "User"
//           )}&size=200&background=3b82f6&color=fff&bold=true`,
//         dateOfBirth: user.dateOfBirth
//           ? new Date(user.dateOfBirth).toISOString().split("T")[0]
//           : "",
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       toast.error("Failed to load profile");
//       setLoading(false);
//     }
//   };

//   const fetchCompanies = async () => {
//     try {
//       // ✅ GET USER'S COMPANIES (FOR EMPLOYEES)
//       const response = await axios.get("/employee/my-companies");
//       const companiesData = response.data;

//       // Format companies data
//       const formattedCompanies = companiesData.map((company) => ({
//         id: company.id,
//         name: company.name,
//         joinDate: company.joinDate,
//         logo:
//           company.logo ||
//           `https://ui-avatars.com/api/?name=${encodeURIComponent(
//             company.name
//           )}&background=10b981&color=fff&size=100`,
//       }));

//       setCompanies(formattedCompanies);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//       // If error (maybe HR user), set empty array
//       setCompanies([]);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);

//     try {
//       // ✅ UPDATE EVERYTHING (NAME, DOB, PHOTO) TO DATABASE
//       const response = await axios.put("/profile", {
//         name: formData.name.trim(),
//         dateOfBirth: formData.dateOfBirth,
//         photo: formData.photo.trim(),
//       });

//       toast.success(response.data.message || "Profile updated successfully!");

//       // ✅ Refresh profile data to show updated info
//       await fetchProfile();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to update profile";
//       toast.error(errorMessage);
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // --- RENDER LOGIC ---

//   // Loading State
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           {/* Using a visually distinct spinner */}
//           <div className="loading loading-spinner loading-lg text-blue-600"></div>
//           <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   // Main Component
//   return (
//     <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
//       {/* Page Header */}
//       <div className="mb-10">
//         <h2 className="text-4xl font-extrabold text-black mb-2 tracking-tight">
//           My Profile 🌟
//         </h2>
//         <p className="text-lg text-green-500">
//           Manage your personal information and company affiliations.
//         </p>
//       </div>
//       <hr className="mb-8" />

//       {/* MODIFIED GRID: Stacks on mobile, 1:2 ratio on large screens */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
//         {/* 🎨 LEFT COLUMN: PROFILE CARD & AFFILIATIONS */}
//         {/* On mobile/tablet, this takes full width (grid-cols-1). On LG+, it takes 1/3 (lg:col-span-1) */}
//         <div className="lg:col-span-1 space-y-8">
//           {/* 1. MODERN GRADIENT PROFILE CARD */}
//           <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl shadow-2xl overflow-hidden border border-blue-500/30">
//             {/* Background Pattern */}
//             <div className="relative h-36 bg-gradient-to-r from-purple-600/90 to-blue-600/90">
//               <div className="absolute inset-0 opacity-20">
//                 {/* Subtle Dots Pattern */}
//                 <svg
//                   className="w-full h-full"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <defs>
//                     <pattern
//                       id="dot-grid"
//                       width="25"
//                       height="25"
//                       patternUnits="userSpaceOnUse"
//                     >
//                       <circle cx="2.5" cy="2.5" r="1" fill="white" />
//                     </pattern>
//                   </defs>
//                   <rect width="100%" height="100%" fill="url(#dot-grid)" />
//                 </svg>
//               </div>
//             </div>

//             {/* Profile Content */}
//             <div className="relative px-6 pb-8 -mt-24">
//               {/* Profile Photo - PREVIEW ONLY */}
//               <div className="flex justify-center mb-6">
//                 <div className="relative group">
//                   {/* Glowing Border Effect on Hover */}
//                   <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

//                   {/* Image Container */}
//                   <div className="relative">
//                     <img
//                       src={formData.photo}
//                       alt={formData.name}
//                       onError={(e) => {
//                         e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                           formData.name || "User"
//                         )}&size=200&background=3b82f6&color=fff&bold=true`;
//                       }}
//                       className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* User Info */}
//               <div className="text-center text-white mb-6">
//                 <h3 className="text-3xl font-extrabold mb-1 drop-shadow-lg">
//                   {formData.name || "User Name"}
//                 </h3>
//                 {/* Email with Glassmorphism Background */}
//                 <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 mx-auto w-fit shadow-inner">
//                   <svg
//                     className="w-4 h-4 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <p className="text-white text-sm font-medium opacity-95">
//                     {formData.email}
//                   </p>
//                 </div>
//               </div>

//               {/* Stats - Glassmorphism Boxes */}
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 transition-all hover:bg-white/30 shadow-lg">
//                   <p className="text-4xl font-extrabold text-white drop-shadow-lg">
//                     {companies.length}
//                   </p>
//                   <p className="text-sm text-white font-semibold mt-1 opacity-90">
//                     Companies
//                   </p>
//                 </div>
//                 <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 transition-all hover:bg-white/30 shadow-lg">
//                   <p className="text-4xl font-extrabold text-white drop-shadow-lg">
//                     {formData.dateOfBirth
//                       ? new Date().getFullYear() -
//                         new Date(formData.dateOfBirth).getFullYear()
//                       : "N/A"}
//                   </p>
//                   <p className="text-sm text-white font-semibold mt-1 opacity-90">
//                     Years Old
//                   </p>
//                 </div>
//               </div>

//               {/* Contact Info Detail */}
//               <div className="mt-6">
//                 <div className="flex items-center gap-4 bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30 transition-all hover:bg-white/30 shadow-lg">
//                   <div className="bg-white/40 rounded-lg p-2 flex-shrink-0">
//                     <svg
//                       className="w-6 h-6 text-white"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-xs text-white font-medium opacity-80 uppercase tracking-wider">
//                       Birthday
//                     </p>
//                     <p className="text-lg text-white font-bold truncate">
//                       {formData.dateOfBirth
//                         ? new Date(formData.dateOfBirth).toLocaleDateString(
//                             "en-US",
//                             { year: "numeric", month: "long", day: "numeric" }
//                           )
//                         : "Not provided"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 2. 🏢 COMPANY AFFILIATIONS CARD */}
//           <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
//                 <svg
//                   className="w-7 h-7 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                   />
//                 </svg>
//                 Affiliations
//               </h3>
//               <span className="badge bg-blue-500 text-white font-bold text-base py-3 px-4 rounded-full">
//                 {companies.length}
//               </span>
//             </div>

//             {companies.length === 0 ? (
//               <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl mx-2">
//                 <svg
//                   className="w-16 h-16 mx-auto text-gray-300 mb-3"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M12 4.5v15m7.5-7.5h-15"
//                   />
//                 </svg>
//                 <p className="text-gray-500 font-medium">
//                   Currently not affiliated with any company.
//                 </p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {companies.map((company) => (
//                   <div
//                     key={company.id}
//                     className="group flex items-center justify-between bg-gray-50 hover:bg-blue-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
//                         <img
//                           src={company.logo}
//                           alt={company.name}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="min-w-0">
//                         <p className="font-extrabold text-lg text-gray-800 group-hover:text-blue-700 transition-colors truncate">
//                           {company.name}
//                         </p>
//                         <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
//                           <svg
//                             className="w-3.5 h-3.5"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                             />
//                           </svg>
//                           <span>
//                             Joined:{" "}
//                             {new Date(company.joinDate).toLocaleDateString(
//                               "en-US",
//                               { month: "short", year: "numeric" }
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <svg
//                       className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 📝 RIGHT COLUMN: PROFILE FORM */}
//         {/* On mobile/tablet, this takes full width (grid-cols-1). On LG+, it takes 2/3 (lg:col-span-2) */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200">
//             <div className="flex items-center gap-4 mb-8 border-b pb-4">
//               <div className="bg-blue-100 rounded-xl p-3">
//                 <svg
//                   className="w-7 h-7 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <h3 className="text-2xl font-extrabold text-gray-800">
//                   Update Details
//                 </h3>
//                 <p className="text-gray-500">
//                   Fill in the fields to keep your profile up to date.
//                 </p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-12">
//               {/* Full Name */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-bold text-gray-700 flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     Full Name
//                   </span>
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base"
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>

//               {/* Email (Read-only) */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-bold text-gray-700 flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       />
//                     </svg>
//                     Email Address
//                   </span>
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     value={formData.email}
//                     className="input input-bordered w-full p-3 bg-gray-100 border-gray-300 rounded-lg cursor-not-allowed text-base"
//                     disabled
//                   />
//                   <div className="absolute right-4 top-1/2 -translate-y-1/2">
//                     {/* Lock Icon */}
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <label className="label">
//                   <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     This field is read-only for security reasons.
//                   </span>
//                 </label>
//               </div>

//               {/* Profile Image URL */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-bold text-gray-700 flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     Profile Image URL
//                   </span>
//                 </label>
//                 <input
//                   type="url"
//                   name="photo"
//                   value={formData.photo}
//                   onChange={handleChange}
//                   className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base"
//                   placeholder="https://example.com/your-photo.jpg"
//                 />
//                 <label className="label">
//                   <span className="label-text-alt text-gray-500 flex items-center gap-1">
//                     <svg
//                       className="w-3 h-3"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     Enter a direct image URL (img_bb and etc)
//                   </span>
//                 </label>
//               </div>

//               {/* Date of Birth */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text font-bold text-gray-700 flex items-center gap-2">
//                     <svg
//                       className="w-5 h-5 text-blue-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                       />
//                     </svg>
//                     Date of Birth
//                   </span>
//                 </label>
//                 <input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   className="input input-bordered w-full p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-base"
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6">
//                 <button
//                   type="submit"
//                   className="btn w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 text-lg py-4 h-auto rounded-xl font-bold disabled:opacity-75 disabled:cursor-not-allowed"
//                   disabled={updating}
//                 >
//                   {updating ? (
//                     <>
//                       <span className="loading loading-spinner loading-md"></span>
//                       Updating Profile...
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         className="w-6 h-6"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 2..................updating the employee profile if he changes

import React, { useState, useEffect } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { refreshAppUser } = useAuth(); // ✅ ADD THIS
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    dateOfBirth: "",
  });
  const [companies, setCompanies] = useState([]);

  // ✅ FETCH REAL USER DATA
  useEffect(() => {
    fetchProfile();
    fetchCompanies();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // ✅ GET CURRENT LOGGED IN USER
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
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile");
      setLoading(false);
    }
  };

  const fetchCompanies = async () => {
    try {
      // ✅ GET USER'S COMPANIES (FOR EMPLOYEES)
      const response = await axios.get("/employee/my-companies");
      const companiesData = response.data;

      // Format companies data
      const formattedCompanies = companiesData.map((company) => ({
        id: company.id,
        name: company.name,
        joinDate: company.joinDate,
        logo:
          company.logo ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            company.name
          )}&background=10b981&color=fff&size=100`,
      }));

      setCompanies(formattedCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      // If error (maybe HR user), set empty array
      setCompanies([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      // ✅ UPDATE EVERYTHING (NAME, DOB, PHOTO) TO DATABASE
      const response = await axios.put("/profile", {
        name: formData.name.trim(),
        dateOfBirth: formData.dateOfBirth,
        photo: formData.photo.trim(),
      });

      toast.success(response.data.message || "Profile updated successfully!");

      // ✅ Refresh profile data to show updated info
      await fetchProfile();

      // ✅ UPDATE NAVBAR - Refresh appUser in AuthContext
      await refreshAppUser();
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
          {/* Using a visually distinct spinner */}
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
        <h2 className="text-4xl font-extrabold text-black mb-2 tracking-tight">
          My Profile 🌟
        </h2>
        <p className="text-lg text-green-500">
          Manage your personal information and company affiliations.
        </p>
      </div>
      <hr className="mb-8" />

      {/* MODIFIED GRID: Stacks on mobile, 1:2 ratio on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
        {/* 🎨 LEFT COLUMN: PROFILE CARD & AFFILIATIONS */}
        {/* On mobile/tablet, this takes full width (grid-cols-1). On LG+, it takes 1/3 (lg:col-span-1) */}
        <div className="lg:col-span-1 space-y-8">
          {/* 1. MODERN GRADIENT PROFILE CARD */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 rounded-3xl shadow-2xl overflow-hidden border border-blue-500/30">
            {/* Background Pattern */}
            <div className="relative h-36 bg-gradient-to-r from-purple-600/90 to-blue-600/90">
              <div className="absolute inset-0 opacity-20">
                {/* Subtle Dots Pattern */}
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
              {/* Profile Photo - PREVIEW ONLY */}
              <div className="flex justify-center mb-6">
                <div className="relative group">
                  {/* Glowing Border Effect on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

                  {/* Image Container */}
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
                  {formData.name || "User Name"}
                </h3>
                {/* Email with Glassmorphism Background */}
                <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 mx-auto w-fit shadow-inner">
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
              </div>

              {/* Stats - Glassmorphism Boxes */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 transition-all hover:bg-white/30 shadow-lg">
                  <p className="text-4xl font-extrabold text-white drop-shadow-lg">
                    {companies.length}
                  </p>
                  <p className="text-sm text-white font-semibold mt-1 opacity-90">
                    Companies
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 text-center border border-white/30 transition-all hover:bg-white/30 shadow-lg">
                  <p className="text-4xl font-extrabold text-white drop-shadow-lg">
                    {formData.dateOfBirth
                      ? new Date().getFullYear() -
                        new Date(formData.dateOfBirth).getFullYear()
                      : "N/A"}
                  </p>
                  <p className="text-sm text-white font-semibold mt-1 opacity-90">
                    Years Old
                  </p>
                </div>
              </div>

              {/* Contact Info Detail */}
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

          {/* 2. 🏢 COMPANY AFFILIATIONS CARD */}
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
                Affiliations
              </h3>
              <span className="badge bg-blue-500 text-white font-bold text-base py-3 px-4 rounded-full">
                {companies.length}
              </span>
            </div>

            {companies.length === 0 ? (
              <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl mx-2">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <p className="text-gray-500 font-medium">
                  Currently not affiliated with any company.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {companies.map((company) => (
                  <div
                    key={company.id}
                    className="group flex items-center justify-between bg-gray-50 hover:bg-blue-50 rounded-xl p-4 border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-lg text-gray-800 group-hover:text-blue-700 transition-colors truncate">
                          {company.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                          <svg
                            className="w-3.5 h-3.5"
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
                          <span>
                            Joined:{" "}
                            {new Date(company.joinDate).toLocaleDateString(
                              "en-US",
                              { month: "short", year: "numeric" }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 📝 RIGHT COLUMN: PROFILE FORM */}
        {/* On mobile/tablet, this takes full width (grid-cols-1). On LG+, it takes 2/3 (lg:col-span-2) */}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-800">
                  Update Details
                </h3>
                <p className="text-gray-500">
                  Fill in the fields to keep your profile up to date.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 flex items-center gap-2">
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
                  <span className="label-text font-bold text-gray-700 flex items-center gap-2">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
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
                    {/* Lock Icon */}
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
                  <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    This field is read-only for security reasons.
                  </span>
                </label>
              </div>

              {/* Profile Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 flex items-center gap-2">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
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
                  <span className="label-text-alt text-gray-500 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Enter a direct image URL (img_bb and etc)
                  </span>
                </label>
              </div>

              {/* Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-gray-700 flex items-center gap-2">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
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
