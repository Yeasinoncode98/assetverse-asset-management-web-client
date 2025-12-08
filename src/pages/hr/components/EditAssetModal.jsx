// // src/components/hr/EditAssetModal.jsx
// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
// import axios from "../../../services/axios.config";

// export default function EditAssetModal({ asset, isOpen, onClose, onSuccess }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm();
//   const [submitting, setSubmitting] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");

//   // Populate form when asset changes
//   useEffect(() => {
//     if (asset) {
//       setValue("productName", asset.productName);
//       setValue("productImage", asset.productImage);
//       setValue("productType", asset.productType);
//       setValue("productQuantity", asset.productQuantity);
//       setPreviewImage(asset.productImage);
//     }
//   }, [asset, setValue]);

//   const onSubmit = async (data) => {
//     setSubmitting(true);
//     try {
//       console.log("📝 Updating asset:", asset._id);
//       console.log("📦 Update data:", data);

//       const response = await axios.put(`/hr/assets/${asset._id}`, data);

//       console.log("✅ Update response:", response.data);

//       toast.success("Asset updated successfully! 🎉");
//       reset();
//       onSuccess(); // Refresh asset list
//       onClose();
//     } catch (error) {
//       console.error("❌ Update error:", error);
//       toast.error(error.response?.data?.message || "Failed to update asset");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Handle image URL change for preview
//   const handleImageChange = (e) => {
//     const url = e.target.value;
//     setPreviewImage(url);
//   };

//   if (!isOpen || !asset) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* Modal Header */}
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Edit Asset</h2>
//             <p className="text-sm text-gray-600 mt-1">
//               Update asset information
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
//             disabled={submitting}
//           >
//             ×
//           </button>
//         </div>

//         {/* Modal Body */}
//         <form onSubmit={handleSubmit(onSubmit)} className="p-6">
//           <div className="space-y-5">
//             {/* Asset Name */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Asset Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("productName", {
//                   required: "Asset name is required",
//                 })}
//                 type="text"
//                 className="input input-bordered w-full"
//                 placeholder="e.g., Dell Laptop XPS 15"
//                 disabled={submitting}
//               />
//               {errors.productName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.productName.message}
//                 </p>
//               )}
//             </div>

//             {/* Asset Image URL with Preview */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Asset Image URL <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("productImage", {
//                   required: "Image URL is required",
//                   pattern: {
//                     value: /^https?:\/\/.+/i,
//                     message:
//                       "Please enter a valid URL starting with http:// or https://",
//                   },
//                 })}
//                 type="url"
//                 className="input input-bordered w-full"
//                 placeholder="https://example.com/image.jpg"
//                 onChange={handleImageChange}
//                 disabled={submitting}
//               />
//               {errors.productImage && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.productImage.message}
//                 </p>
//               )}

//               {/* Image Preview */}
//               {previewImage && (
//                 <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
//                   <p className="text-xs font-medium text-gray-600 mb-2">
//                     Preview:
//                   </p>
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     className="w-32 h-32 object-cover rounded-lg border border-gray-300"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://via.placeholder.com/150?text=Invalid+URL";
//                     }}
//                   />
//                 </div>
//               )}
//             </div>

//             {/* Asset Type */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Asset Type <span className="text-red-500">*</span>
//               </label>
//               <select
//                 {...register("productType", {
//                   required: "Asset type is required",
//                 })}
//                 className="select select-bordered w-full"
//                 disabled={submitting}
//               >
//                 <option value="">Select asset type</option>
//                 <option value="Returnable">Returnable</option>
//                 <option value="Non-returnable">Non-returnable</option>
//               </select>
//               {errors.productType && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.productType.message}
//                 </p>
//               )}
//               <p className="text-xs text-gray-500 mt-1">
//                 Returnable: Laptops, Monitors (must be returned when leaving){" "}
//                 <br />
//                 Non-returnable: Office supplies, PPE (employee keeps)
//               </p>
//             </div>

//             {/* Quantity */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Total Quantity <span className="text-red-500">*</span>
//               </label>
//               <input
//                 {...register("productQuantity", {
//                   required: "Quantity is required",
//                   min: { value: 1, message: "Quantity must be at least 1" },
//                   validate: (value) => {
//                     const assigned =
//                       asset.productQuantity - (asset.availableQuantity || 0);
//                     if (parseInt(value) < assigned) {
//                       return `Quantity cannot be less than assigned (${assigned})`;
//                     }
//                     return true;
//                   },
//                 })}
//                 type="number"
//                 min="1"
//                 className="input input-bordered w-full"
//                 placeholder="e.g., 10"
//                 disabled={submitting}
//               />
//               {errors.productQuantity && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.productQuantity.message}
//                 </p>
//               )}

//               {/* Current Status Info */}
//               <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-xs font-medium text-blue-900 mb-1">
//                   Current Status:
//                 </p>
//                 <div className="grid grid-cols-3 gap-2 text-xs">
//                   <div>
//                     <span className="text-blue-600 font-semibold">Total:</span>{" "}
//                     {asset.productQuantity}
//                   </div>
//                   <div>
//                     <span className="text-green-600 font-semibold">
//                       Available:
//                     </span>{" "}
//                     {asset.availableQuantity || 0}
//                   </div>
//                   <div>
//                     <span className="text-yellow-600 font-semibold">
//                       Assigned:
//                     </span>{" "}
//                     {asset.productQuantity - (asset.availableQuantity || 0)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 btn btn-outline"
//               disabled={submitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white"
//               disabled={submitting}
//             >
//               {submitting ? (
//                 <>
//                   <span className="loading loading-spinner loading-sm"></span>
//                   Updating...
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
//                       d="M5 13l4 4L19 7"
//                     />
//                   </svg>
//                   Update Asset
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// 2......................................
// src/components/hr/EditAssetModal.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "../../../services/axios.config";

export default function EditAssetModal({ asset, isOpen, onClose, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Populate form when asset changes
  useEffect(() => {
    if (asset) {
      setValue("productName", asset.productName);
      setValue("productImage", asset.productImage);
      setValue("productType", asset.productType);
      setValue("productQuantity", asset.productQuantity);
      setPreviewImage(asset.productImage);
    }
  }, [asset, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      console.log("📝 Updating asset:", asset._id);
      console.log("📦 Update data:", data);

      const response = await axios.put(`/hr/assets/${asset._id}`, data);

      console.log("✅ Update response:", response.data);

      toast.success("Asset updated successfully! 🎉");
      reset();
      onSuccess(); // Refresh asset list
      onClose();
    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update asset");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle image URL change for preview
  const handleImageChange = (e) => {
    const url = e.target.value;
    setPreviewImage(url);
  };

  if (!isOpen || !asset) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header - Sticky with proper z-index */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-start gap-3 z-10 shadow-sm">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              Edit Asset
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Update asset information
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none flex-shrink-0 -mt-1"
            disabled={submitting}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-5">
              {/* Asset Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asset Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("productName", {
                    required: "Asset name is required",
                  })}
                  type="text"
                  className="input input-bordered w-full text-sm sm:text-base"
                  placeholder="e.g., Dell Laptop XPS 15"
                  disabled={submitting}
                />
                {errors.productName && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.productName.message}
                  </p>
                )}
              </div>

              {/* Asset Image URL with Preview */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asset Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("productImage", {
                    required: "Image URL is required",
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message:
                        "Please enter a valid URL starting with http:// or https://",
                    },
                  })}
                  type="url"
                  className="input input-bordered w-full text-sm sm:text-base"
                  placeholder="https://example.com/image.jpg"
                  onChange={handleImageChange}
                  disabled={submitting}
                />
                {errors.productImage && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.productImage.message}
                  </p>
                )}

                {/* Image Preview */}
                {previewImage && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-medium text-gray-600 mb-2">
                      Preview:
                    </p>
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-300"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Asset Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Asset Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("productType", {
                    required: "Asset type is required",
                  })}
                  className="select select-bordered w-full text-sm sm:text-base"
                  disabled={submitting}
                >
                  <option value="">Select asset type</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
                {errors.productType && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.productType.message}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  <span className="block sm:inline">
                    Returnable: Laptops, Monitors (must be returned when
                    leaving)
                  </span>{" "}
                  <span className="block sm:inline mt-1 sm:mt-0">
                    Non-returnable: Office supplies, PPE (employee keeps)
                  </span>
                </p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("productQuantity", {
                    required: "Quantity is required",
                    min: { value: 1, message: "Quantity must be at least 1" },
                    validate: (value) => {
                      const assigned =
                        asset.productQuantity - (asset.availableQuantity || 0);
                      if (parseInt(value) < assigned) {
                        return `Quantity cannot be less than assigned (${assigned})`;
                      }
                      return true;
                    },
                  })}
                  type="number"
                  min="1"
                  className="input input-bordered w-full text-sm sm:text-base"
                  placeholder="e.g., 10"
                  disabled={submitting}
                />
                {errors.productQuantity && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.productQuantity.message}
                  </p>
                )}

                {/* Current Status Info */}
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-medium text-blue-900 mb-1">
                    Current Status:
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-blue-600 font-semibold block sm:inline">
                        Total:
                      </span>{" "}
                      <span className="block sm:inline">
                        {asset.productQuantity}
                      </span>
                    </div>
                    <div>
                      <span className="text-green-600 font-semibold block sm:inline">
                        Available:
                      </span>{" "}
                      <span className="block sm:inline">
                        {asset.availableQuantity || 0}
                      </span>
                    </div>
                    <div>
                      <span className="text-yellow-600 font-semibold block sm:inline">
                        Assigned:
                      </span>{" "}
                      <span className="block sm:inline">
                        {asset.productQuantity - (asset.availableQuantity || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 btn btn-outline text-sm sm:text-base"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:flex-1 btn bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update Asset
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
