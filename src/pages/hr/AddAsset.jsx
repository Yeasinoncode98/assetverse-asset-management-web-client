// // // src/pages/hr/AddAsset.jsx
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "../../services/axios.config";
// // import { toast } from "react-hot-toast";

// // export default function AddAsset() {
// //   const navigate = useNavigate();
// //   const [loading, setLoading] = useState(false);
// //   const [uploadingImage, setUploadingImage] = useState(false);
// //   const [formData, setFormData] = useState({
// //     productName: "",
// //     productImage: "",
// //     productType: "Returnable",
// //     productQuantity: 1,
// //   });
// //   const [imagePreview, setImagePreview] = useState(null);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Upload image to ImgBB
// //   const handleImageUpload = async (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     // Validate file type
// //     if (!file.type.startsWith("image/")) {
// //       toast.error("Please upload an image file");
// //       return;
// //     }

// //     // Validate file size (max 5MB)
// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("Image size should be less than 5MB");
// //       return;
// //     }

// //     // Show preview
// //     const reader = new FileReader();
// //     reader.onloadend = () => {
// //       setImagePreview(reader.result);
// //     };
// //     reader.readAsDataURL(file);

// //     // Upload to ImgBB
// //     setUploadingImage(true);
// //     try {
// //       const formDataImg = new FormData();
// //       formDataImg.append("image", file);

// //       // Get ImgBB API key from environment variable
// //       const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

// //       if (!IMGBB_API_KEY) {
// //         throw new Error("ImgBB API key not configured. Please add VITE_IMGBB_API_KEY to your .env file");
// //       }

// //       const response = await fetch(
// //         `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
// //         {
// //           method: "POST",
// //           body: formDataImg,
// //         }
// //       );

// //       const data = await response.json();

// //       if (data.success && data.data?.url) {
// //         setFormData((prev) => ({ ...prev, productImage: data.data.url }));
// //         toast.success("Image uploaded successfully!");
// //       } else {
// //         throw new Error(data.error?.message || "Upload failed");
// //       }
// //     } catch (error) {
// //       console.error("Image upload error:", error);
// //       toast.error(error.message || "Failed to upload image. Please try again.");
// //       setImagePreview(null);
// //     } finally {
// //       setUploadingImage(false);
// //     }
// //   };

// //   // Alternative: Manual URL input
// //   const handleManualUrlInput = (e) => {
// //     const url = e.target.value;
// //     setFormData((prev) => ({ ...prev, productImage: url }));
// //     if (url) {
// //       setImagePreview(url);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!formData.productImage) {
// //       toast.error("Please upload a product image or provide an image URL");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       await axios.post("/hr/assets", formData);
// //       toast.success("Asset added successfully!");

// //       // Reset form
// //       setFormData({
// //         productName: "",
// //         productImage: "",
// //         productType: "Returnable",
// //         productQuantity: 1,
// //       });
// //       setImagePreview(null);

// //       // Navigate back to asset list
// //       setTimeout(() => {
// //         navigate("/hr/assets");
// //       }, 1000);
// //     } catch (err) {
// //       console.error("Error adding asset:", err);
// //       toast.error(err.response?.data?.message || "Failed to add asset");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <div className="mb-6">
// //         <h2 className="text-3xl font-bold text-gray-800">Add New Asset</h2>
// //         <p className="text-gray-600 mt-2">Add a new asset to your inventory</p>
// //       </div>

// //       <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Product Name */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text font-semibold text-gray-700">
// //                 Product Name <span className="text-red-500">*</span>
// //               </span>
// //             </label>
// //             <input
// //               type="text"
// //               name="productName"
// //               value={formData.productName}
// //               onChange={handleChange}
// //               placeholder="e.g., MacBook Pro 16, Dell Monitor, Office Chair"
// //               className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               required
// //             />
// //           </div>

// //           {/* Product Type */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text font-semibold text-gray-700">
// //                 Product Type <span className="text-red-500">*</span>
// //               </span>
// //             </label>
// //             <select
// //               name="productType"
// //               value={formData.productType}
// //               onChange={handleChange}
// //               className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               required
// //             >
// //               <option value="Returnable">Returnable</option>
// //               <option value="Non-returnable">Non-returnable</option>
// //             </select>
// //             <label className="label">
// //               <span className="label-text-alt text-gray-500">
// //                 <strong>Returnable:</strong> Employee must return when leaving (e.g., Laptop, Monitor)<br/>
// //                 <strong>Non-returnable:</strong> Employee keeps permanently (e.g., Stationery, T-shirt)
// //               </span>
// //             </label>
// //           </div>

// //           {/* Product Quantity */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text font-semibold text-gray-700">
// //                 Product Quantity <span className="text-red-500">*</span>
// //               </span>
// //             </label>
// //             <input
// //               type="number"
// //               name="productQuantity"
// //               value={formData.productQuantity}
// //               onChange={handleChange}
// //               placeholder="Enter available quantity"
// //               className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               min="1"
// //               max="10000"
// //               required
// //             />
// //             <label className="label">
// //               <span className="label-text-alt text-gray-500">
// //                 Total number of items available for distribution
// //               </span>
// //             </label>
// //           </div>

// //           {/* Product Image Upload */}
// //           <div className="form-control">
// //             <label className="label">
// //               <span className="label-text font-semibold text-gray-700">
// //                 Product Image <span className="text-red-500">*</span>
// //               </span>
// //             </label>

// //             {/* File Upload Option */}
// //             <div className="mb-3">
// //               <label className="block text-sm text-gray-600 mb-2">Option 1: Upload Image</label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleImageUpload}
// //                 className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-500"
// //                 disabled={uploadingImage}
// //               />
// //             </div>

// //             {/* Manual URL Input Option */}
// //             <div>
// //               <label className="block text-sm text-gray-600 mb-2">Option 2: Paste Image URL</label>
// //               <input
// //                 type="url"
// //                 name="productImageUrl"
// //                 value={formData.productImage}
// //                 onChange={handleManualUrlInput}
// //                 placeholder="https://example.com/image.jpg"
// //                 className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 disabled={uploadingImage}
// //               />
// //             </div>

// //             <label className="label">
// //               <span className="label-text-alt text-gray-500">
// //                 Maximum file size: 5MB. Supported: JPG, PNG, GIF, WebP
// //               </span>
// //             </label>

// //             {/* Upload Progress */}
// //             {uploadingImage && (
// //               <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
// //                 <span className="loading loading-spinner loading-sm text-blue-600"></span>
// //                 <span className="text-blue-700 font-medium">Uploading image...</span>
// //               </div>
// //             )}

// //             {/* Image Preview */}
// //             {imagePreview && !uploadingImage && (
// //               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
// //                 <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
// //                 <div className="relative inline-block">
// //                   <img
// //                     src={imagePreview}
// //                     alt="Preview"
// //                     className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
// //                     onError={(e) => {
// //                       e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
// //                     }}
// //                   />
// //                   <button
// //                     type="button"
// //                     onClick={() => {
// //                       setImagePreview(null);
// //                       setFormData(prev => ({ ...prev, productImage: "" }));
// //                     }}
// //                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
// //                   >
// //                     ×
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* ImgBB API Key Warning */}
// //             {!import.meta.env.VITE_IMGBB_API_KEY && (
// //               <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                 <p className="text-sm text-yellow-800">
// //                   ⚠️ <strong>Note:</strong> ImgBB API key not configured. Please use the manual URL option or add VITE_IMGBB_API_KEY to your .env file.
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Submit Buttons */}
// //           <div className="flex gap-4 pt-4 border-t border-gray-200">
// //             <button
// //               type="submit"
// //               className="btn bg-blue-600 hover:bg-blue-700 text-white flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
// //               disabled={loading || uploadingImage || !formData.productImage}
// //             >
// //               {loading ? (
// //                 <>
// //                   <span className="loading loading-spinner loading-sm"></span>
// //                   Adding Asset...
// //                 </>
// //               ) : (
// //                 <>
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                   </svg>
// //                   Add Asset
// //                 </>
// //               )}
// //             </button>
// //             <button
// //               type="button"
// //               className="btn btn-outline flex-1"
// //               onClick={() => navigate("/hr/assets")}
// //               disabled={loading}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {/* Info Card */}
// //       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-6 max-w-2xl">
// //         <div className="flex items-start gap-4">
// //           <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
// //             <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //             </svg>
// //           </div>
// //           <div>
// //             <h3 className="font-bold text-blue-900 mb-2 text-lg">Quick Tips</h3>
// //             <ul className="text-sm text-blue-800 space-y-2">
// //               <li className="flex items-start">
// //                 <span className="mr-2">•</span>
// //                 <span>Use clear, high-quality images for better visibility</span>
// //               </li>
// //               <li className="flex items-start">
// //                 <span className="mr-2">•</span>
// //                 <span>Set accurate quantities to track inventory properly</span>
// //               </li>
// //               <li className="flex items-start">
// //                 <span className="mr-2">•</span>
// //                 <span>Choose "Returnable" for expensive items like laptops, monitors</span>
// //               </li>
// //               <li className="flex items-start">
// //                 <span className="mr-2">•</span>
// //                 <span>Choose "Non-returnable" for consumables like stationery, t-shirts</span>
// //               </li>
// //               <li className="flex items-start">
// //                 <span className="mr-2">•</span>
// //                 <span>You can use either file upload or paste an image URL directly</span>
// //               </li>
// //             </ul>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // 2////////////

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../services/axios.config";
// import { toast } from "react-hot-toast";

// export default function AddAsset() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [formData, setFormData] = useState({
//     productName: "",
//     productImage: "",
//     productType: "Returnable",
//     productQuantity: 1,
//   });
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Upload image to ImgBB
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload an image file");
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Image size should be less than 5MB");
//       return;
//     }

//     // Show preview
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);

//     // Upload to ImgBB
//     setUploadingImage(true);
//     try {
//       const formDataImg = new FormData();
//       formDataImg.append("image", file);

//       // Get ImgBB API key from environment variable
//       const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

//       if (!IMGBB_API_KEY) {
//         throw new Error(
//           "ImgBB API key not configured. Please add VITE_IMGBB_API_KEY to your .env file"
//         );
//       }

//       const response = await fetch(
//         `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
//         {
//           method: "POST",
//           body: formDataImg,
//         }
//       );

//       const data = await response.json();

//       if (data.success && data.data?.url) {
//         setFormData((prev) => ({ ...prev, productImage: data.data.url }));
//         toast.success("Image uploaded successfully!");
//       } else {
//         throw new Error(data.error?.message || "Upload failed");
//       }
//     } catch (error) {
//       console.error("Image upload error:", error);
//       toast.error(error.message || "Failed to upload image. Please try again.");
//       setImagePreview(null);
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // Alternative: Manual URL input
//   const handleManualUrlInput = (e) => {
//     const url = e.target.value;
//     setFormData((prev) => ({ ...prev, productImage: url }));
//     if (url) {
//       setImagePreview(url);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.productImage) {
//       toast.error("Please upload a product image or provide an image URL");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Try different possible endpoints
//       const response = await axios.post("/hr/assets", formData);

//       toast.success("Asset added successfully!");

//       // Navigate immediately to /hr (Asset List)
//       navigate("/hr", { replace: true });

//       // Reset form after navigation
//       setFormData({
//         productName: "",
//         productImage: "",
//         productType: "Returnable",
//         productQuantity: 1,
//       });
//       setImagePreview(null);
//     } catch (err) {
//       console.error("Error adding asset:", err);

//       // If /hr/assets doesn't work, try /assets
//       if (err.response?.status === 404) {
//         try {
//           await axios.post("/assets", formData);
//           toast.success("Asset added successfully!");
//           navigate("/hr", { replace: true });
//           return;
//         } catch (retryErr) {
//           console.error("Retry failed:", retryErr);
//         }
//       }

//       toast.error(err.response?.data?.message || "Failed to add asset");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-6">
//         <h2 className="text-3xl font-bold text-gray-800">Add New Asset</h2>
//         <p className="text-gray-600 mt-2">Add a new asset to your inventory</p>
//       </div>

//       <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Product Name */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">
//                 Product Name <span className="text-red-500">*</span>
//               </span>
//             </label>
//             <input
//               type="text"
//               name="productName"
//               value={formData.productName}
//               onChange={handleChange}
//               placeholder="e.g., MacBook Pro 16, Dell Monitor, Office Chair"
//               className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             />
//           </div>

//           {/* Product Type */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">
//                 Product Type <span className="text-red-500">*</span>
//               </span>
//             </label>
//             <select
//               name="productType"
//               value={formData.productType}
//               onChange={handleChange}
//               className="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               required
//             >
//               <option value="Returnable">Returnable</option>
//               <option value="Non-returnable">Non-returnable</option>
//             </select>
//             <label className="label">
//               <span className="label-text-alt text-gray-500">
//                 <strong>Returnable:</strong> Employee must return when leaving
//                 (e.g., Laptop, Monitor)
//                 <br />
//                 <strong>Non-returnable:</strong> Employee keeps permanently
//                 (e.g., Stationery, T-shirt)
//               </span>
//             </label>
//           </div>

//           {/* Product Quantity */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">
//                 Product Quantity <span className="text-red-500">*</span>
//               </span>
//             </label>
//             <input
//               type="number"
//               name="productQuantity"
//               value={formData.productQuantity}
//               onChange={handleChange}
//               placeholder="Enter available quantity"
//               className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               min="1"
//               max="10000"
//               required
//             />
//             <label className="label">
//               <span className="label-text-alt text-gray-500">
//                 Total number of items available for distribution
//               </span>
//             </label>
//           </div>

//           {/* Product Image Upload */}
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text font-semibold text-gray-700">
//                 Product Image <span className="text-red-500">*</span>
//               </span>
//             </label>

//             {/* File Upload Option */}
//             <div className="mb-3">
//               <label className="block text-sm text-gray-600 mb-2">
//                 Option 1: Upload Image
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="file-input file-input-bordered w-full focus:ring-2 focus:ring-blue-500"
//                 disabled={uploadingImage}
//               />
//             </div>

//             {/* Manual URL Input Option */}
//             <div>
//               <label className="block text-sm text-gray-600 mb-2">
//                 Option 2: Paste Image URL
//               </label>
//               <input
//                 type="url"
//                 name="productImageUrl"
//                 value={formData.productImage}
//                 onChange={handleManualUrlInput}
//                 placeholder="https://example.com/image.jpg"
//                 className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 disabled={uploadingImage}
//               />
//             </div>

//             <label className="label">
//               <span className="label-text-alt text-gray-500">
//                 Maximum file size: 5MB. Supported: JPG, PNG, GIF, WebP
//               </span>
//             </label>

//             {/* Upload Progress */}
//             {uploadingImage && (
//               <div className="mt-4 flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
//                 <span className="loading loading-spinner loading-sm text-blue-600"></span>
//                 <span className="text-blue-700 font-medium">
//                   Uploading image...
//                 </span>
//               </div>
//             )}

//             {/* Image Preview */}
//             {imagePreview && !uploadingImage && (
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <p className="text-sm font-medium text-gray-700 mb-2">
//                   Preview:
//                 </p>
//                 <div className="relative inline-block">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/200x200?text=Invalid+Image";
//                     }}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setImagePreview(null);
//                       setFormData((prev) => ({ ...prev, productImage: "" }));
//                     }}
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
//                   >
//                     ×
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* ImgBB API Key Warning */}
//             {!import.meta.env.VITE_IMGBB_API_KEY && (
//               <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-sm text-yellow-800">
//                   ⚠️ <strong>Note:</strong> ImgBB API key not configured. Please
//                   use the manual URL option or add VITE_IMGBB_API_KEY to your
//                   .env file.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Submit Buttons */}
//           <div className="flex gap-4 pt-4 border-t border-gray-200">
//             <button
//               type="submit"
//               className="btn bg-blue-600 hover:bg-blue-700 text-white flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
//               disabled={loading || uploadingImage || !formData.productImage}
//             >
//               {loading ? (
//                 <>
//                   <span className="loading loading-spinner loading-sm"></span>
//                   Adding Asset...
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 4v16m8-8H4"
//                     />
//                   </svg>
//                   Add Asset
//                 </>
//               )}
//             </button>
//             <button
//               type="button"
//               className="btn btn-outline flex-1"
//               onClick={() => navigate("/hr")}
//               disabled={loading}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Info Card */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mt-6 max-w-2xl">
//         <div className="flex items-start gap-4">
//           <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
//             <svg
//               className="w-6 h-6 text-blue-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <div>
//             <h3 className="font-bold text-blue-900 mb-2 text-lg">Quick Tips</h3>
//             <ul className="text-sm text-blue-800 space-y-2">
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>
//                   Use clear, high-quality images for better visibility
//                 </span>
//               </li>
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>Set accurate quantities to track inventory properly</span>
//               </li>
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>
//                   Choose "Returnable" for expensive items like laptops, monitors
//                 </span>
//               </li>
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>
//                   Choose "Non-returnable" for consumables like stationery,
//                   t-shirts
//                 </span>
//               </li>
//               <li className="flex items-start">
//                 <span className="mr-2">•</span>
//                 <span>
//                   You can use either file upload or paste an image URL directly
//                 </span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 2.................................

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";

export default function AddAsset() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    productType: "Returnable",
    productQuantity: 1,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload image to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to ImgBB
    setUploadingImage(true);
    try {
      const formDataImg = new FormData();
      formDataImg.append("image", file);

      // Get ImgBB API key from environment variable
      const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

      if (!IMGBB_API_KEY) {
        throw new Error(
          "ImgBB API key not configured. Please add VITE_IMGBB_API_KEY to your .env file"
        );
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const data = await response.json();

      if (data.success && data.data?.url) {
        setFormData((prev) => ({ ...prev, productImage: data.data.url }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(data.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Failed to upload image. Please try again.");
      setImagePreview(null);
    } finally {
      setUploadingImage(false);
    }
  };

  // Alternative: Manual URL input
  const handleManualUrlInput = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, productImage: url }));
    if (url) {
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productImage) {
      toast.error("Please upload a product image or provide an image URL");
      return;
    }

    setLoading(true);
    try {
      // Try different possible endpoints
      const response = await axios.post("/hr/assets", formData);

      toast.success("Asset added successfully!");

      // Navigate immediately to /hr (Asset List)
      navigate("/hr", { replace: true });

      // Reset form after navigation
      setFormData({
        productName: "",
        productImage: "",
        productType: "Returnable",
        productQuantity: 1,
      });
      setImagePreview(null);
    } catch (err) {
      console.error("Error adding asset:", err);

      // If /hr/assets doesn't work, try /assets
      if (err.response?.status === 404) {
        try {
          await axios.post("/assets", formData);
          toast.success("Asset added successfully!");
          navigate("/hr", { replace: true });
          return;
        } catch (retryErr) {
          console.error("Retry failed:", retryErr);
        }
      }

      toast.error(err.response?.data?.message || "Failed to add asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          Add New Asset
        </h2>
        <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
          Add a new asset to your inventory
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Product Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-semibold text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="e.g., MacBook Pro 16"
              className="input input-bordered w-full text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Product Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-semibold text-gray-700">
                Product Type <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="select select-bordered w-full text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            <label className="label">
              <span className="label-text-alt text-xs sm:text-sm text-gray-500">
                <strong>Returnable:</strong> Must return when leaving
                <br className="hidden sm:block" />
                <span className="sm:hidden"> / </span>
                <strong>Non-returnable:</strong> Keep permanently
              </span>
            </label>
          </div>

          {/* Product Quantity */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-semibold text-gray-700">
                Product Quantity <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              name="productQuantity"
              value={formData.productQuantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              className="input input-bordered w-full text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              max="10000"
              required
            />
            <label className="label">
              <span className="label-text-alt text-xs sm:text-sm text-gray-500">
                Total items available for distribution
              </span>
            </label>
          </div>

          {/* Product Image Upload */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-sm sm:text-base font-semibold text-gray-700">
                Product Image <span className="text-red-500">*</span>
              </span>
            </label>

            {/* File Upload Option */}
            <div className="mb-3">
              <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                Option 1: Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full text-xs sm:text-sm focus:ring-2 focus:ring-blue-500"
                disabled={uploadingImage}
              />
            </div>

            {/* Manual URL Input Option */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-600 mb-2">
                Option 2: Paste Image URL
              </label>
              <input
                type="url"
                name="productImageUrl"
                value={formData.productImage}
                onChange={handleManualUrlInput}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={uploadingImage}
              />
            </div>

            <label className="label">
              <span className="label-text-alt text-xs sm:text-sm text-gray-500">
                Max 5MB. JPG, PNG, GIF, WebP
              </span>
            </label>

            {/* Upload Progress */}
            {uploadingImage && (
              <div className="mt-3 sm:mt-4 flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                <span className="loading loading-spinner loading-sm text-blue-600"></span>
                <span className="text-xs sm:text-sm text-blue-700 font-medium">
                  Uploading image...
                </span>
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && !uploadingImage && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Preview:
                </p>
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x200?text=Invalid+Image";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, productImage: "" }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-red-600 transition-colors text-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            {/* ImgBB API Key Warning */}
            {!import.meta.env.VITE_IMGBB_API_KEY && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-800">
                  ⚠️ <strong>Note:</strong> ImgBB API key not configured. Use
                  manual URL or add VITE_IMGBB_API_KEY to .env
                </p>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="btn btn-sm sm:btn-md bg-blue-600 hover:bg-blue-700 text-white flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading || uploadingImage || !formData.productImage}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-xs sm:loading-sm"></span>
                  <span className="text-xs sm:text-base">Adding Asset...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-xs sm:text-base">Add Asset</span>
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-sm sm:btn-md btn-outline flex-1"
              onClick={() => navigate("/hr")}
              disabled={loading}
            >
              <span className="text-xs sm:text-base">Cancel</span>
            </button>
          </div>
        </form>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6 max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
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
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-blue-900 mb-2 text-base sm:text-lg">
              Quick Tips
            </h3>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1.5 sm:space-y-2">
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">•</span>
                <span>Use clear, high-quality images</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">•</span>
                <span>Set accurate quantities for tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">•</span>
                <span>"Returnable" for laptops, monitors</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">•</span>
                <span>"Non-returnable" for stationery</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 flex-shrink-0">•</span>
                <span>Use file upload or paste URL</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
