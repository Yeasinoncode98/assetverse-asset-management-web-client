import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";
import EditAssetModal from "../hr/components/EditAssetModal";

export default function AssetList() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0); // ✅ NEW: Track total items
  const [deleteLoading, setDeleteLoading] = useState(null);
  const itemsPerPage = 10; // ✅ Configurable

  const [editingAsset, setEditingAsset] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, [currentPage, searchTerm]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/hr/assets", {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm,
        },
      });

      setAssets(response.data.assets || []);
      setTotalPages(response.data.totalPages || 1);
      setTotalItems(response.data.total || 0); // ✅ NEW: Store total
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast.error("Failed to load assets");
      setLoading(false);
    }
  };

  const handleDelete = async (assetId, assetName) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${assetName}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    setDeleteLoading(assetId);
    try {
      await axios.delete(`/hr/assets/${assetId}`);
      toast.success("Asset deleted successfully!");
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
      toast.error(error.response?.data?.message || "Failed to delete asset");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleEdit = (assetId) => {
    const asset = assets.find((a) => a._id === assetId);
    if (asset) {
      setEditingAsset(asset);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingAsset(null);
  };

  const handleUpdateSuccess = () => {
    fetchAssets();
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const stats = {
    total: assets.reduce((sum, a) => sum + a.productQuantity, 0),
    available: assets.reduce((sum, a) => sum + (a.availableQuantity || 0), 0),
    assigned: assets.reduce(
      (sum, a) => sum + (a.productQuantity - (a.availableQuantity || 0)),
      0
    ),
    types: totalItems, // ✅ Use total from backend
  };

  // ✅ NEW: Calculate showing range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // ✅ NEW: Generate page numbers with smart ellipsis
  const generatePageNumbers = () => {
    const pages = [];
    const showMax = 5; // Show max 5 page numbers

    if (totalPages <= showMax) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Asset Management
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your company's assets
          </p>
        </div>
        <button
          onClick={() => navigate("/hr/add-asset")}
          className="btn btn-sm sm:btn-md bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto"
        >
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
          <span className="hidden xs:inline">Add New Asset</span>
          <span className="xs:hidden">Add Asset</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Total Assets
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Available
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-1">
                {stats.available}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Assigned
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 mt-1">
                {stats.assigned}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl">📤</div>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Asset Types
              </p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mt-1">
                {stats.types}
              </p>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl">🏷️</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <input
          type="text"
          placeholder="🔍 Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full text-sm sm:text-base"
        />
      </div>

      {/* ✅ NEW: Showing X-Y of Z items */}
      {!loading && assets.length > 0 && (
        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
          <span>
            Showing{" "}
            <span className="font-semibold text-gray-800">{startItem}</span> to{" "}
            <span className="font-semibold text-gray-800">{endItem}</span> of{" "}
            <span className="font-semibold text-gray-800">{totalItems}</span>{" "}
            assets
          </span>
          <span className="hidden sm:inline">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}

      {/* Assets Content */}
      {loading ? (
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow">
          <div className="loading loading-spinner loading-md sm:loading-lg text-blue-600"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
            Loading assets...
          </p>
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow px-4">
          <div className="text-4xl sm:text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-2">
            No assets found
          </p>
          <p className="text-sm sm:text-base text-gray-400 mb-6">
            {searchTerm
              ? "Try adjusting your search term"
              : "Start by adding your first asset"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => navigate("/hr/add-asset")}
              className="btn btn-sm sm:btn-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Your First Asset
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="font-bold text-gray-700">Image</th>
                    <th className="font-bold text-gray-700">Product Name</th>
                    <th className="font-bold text-gray-700">Type</th>
                    <th className="font-bold text-gray-700">Total Quantity</th>
                    <th className="font-bold text-gray-700">Available</th>
                    <th className="font-bold text-gray-700">Assigned</th>
                    <th className="font-bold text-gray-700">Date Added</th>
                    <th className="font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr
                      key={asset._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td>
                        <div className="avatar">
                          <div className="w-16 h-16 rounded-lg">
                            <img
                              src={asset.productImage}
                              alt={asset.productName}
                              className="object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/100?text=No+Image";
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="font-semibold text-gray-800">
                          {asset.productName}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            asset.productType === "Returnable"
                              ? "badge-primary"
                              : "badge-secondary"
                          }`}
                        >
                          {asset.productType}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="font-semibold text-blue-600">
                          {asset.productQuantity}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="font-semibold text-green-600">
                          {asset.availableQuantity || 0}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="font-semibold text-yellow-600">
                          {asset.productQuantity -
                            (asset.availableQuantity || 0)}
                        </span>
                      </td>
                      <td className="text-gray-600">
                        {new Date(asset.dateAdded).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(asset._id)}
                            className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                            title="Edit"
                          >
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(asset._id, asset.productName)
                            }
                            className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                            disabled={deleteLoading === asset._id}
                            title="Delete"
                          >
                            {deleteLoading === asset._id ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {assets.map((asset) => (
              <div
                key={asset._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="avatar flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg">
                      <img
                        src={asset.productImage}
                        alt={asset.productName}
                        className="object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=No+Image";
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">
                      {asset.productName}
                    </h3>
                    <span
                      className={`badge badge-sm sm:badge-md mt-1 ${
                        asset.productType === "Returnable"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium">Total</p>
                      <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1">
                        {asset.productQuantity}
                      </p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium">
                        Available
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">
                        {asset.availableQuantity || 0}
                      </p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-gray-600 font-medium">
                        Assigned
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-yellow-600 mt-1">
                        {asset.productQuantity - (asset.availableQuantity || 0)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>
                      Added:{" "}
                      {new Date(asset.dateAdded).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      onClick={() => handleEdit(asset._id)}
                      className="flex-1 btn btn-sm bg-blue-600 hover:bg-blue-700 text-white gap-2"
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id, asset.productName)}
                      className="flex-1 btn btn-sm bg-red-600 hover:bg-red-700 text-white gap-2"
                      disabled={deleteLoading === asset._id}
                    >
                      {deleteLoading === asset._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <>
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ ENHANCED PAGINATION */}
          {totalPages > 1 && (
            <div className="mt-6 bg-white rounded-lg shadow p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info - Mobile */}
                <div className="text-sm text-gray-600 sm:hidden">
                  Page {currentPage} of {totalPages}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="btn btn-sm sm:btn-md gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
                  >
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {generatePageNumbers().map((pageNum, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (pageNum !== "...") {
                            setCurrentPage(pageNum);
                          }
                        }}
                        disabled={pageNum === "..."}
                        className={`btn btn-sm sm:btn-md min-w-[2.5rem] ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : pageNum === "..."
                            ? "btn-ghost cursor-default"
                            : "btn-ghost hover:bg-gray-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="btn btn-sm sm:btn-md gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    <span className="hidden sm:inline">Next</span>
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Items Info - Desktop */}
                <div className="hidden sm:block text-sm text-gray-600">
                  Showing {startItem}-{endItem} of {totalItems}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Info Card */}
      {assets.length > 0 && (
        <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6">
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
                Asset Management Tips
              </h3>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span>
                    Keep track of available quantities to ensure proper
                    inventory management
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span>
                    Returnable assets should be tracked when employees leave
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span>Update asset quantities when new stock arrives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Edit Asset Modal */}
      <EditAssetModal
        asset={editingAsset}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
}

// .................2 Gsap .....................

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../../services/axios.config";
// import { toast } from "react-hot-toast";
// import EditAssetModal from "../hr/components/EditAssetModal";
// import gsap from "gsap";

// export default function AssetList() {
//   const navigate = useNavigate();
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0);
//   const [deleteLoading, setDeleteLoading] = useState(null);
//   const itemsPerPage = 10;

//   const [editingAsset, setEditingAsset] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   // GSAP Refs
//   const headerRef = useRef(null);
//   const statsRef = useRef(null);
//   const searchRef = useRef(null);
//   const tableRef = useRef(null);
//   const cardsRef = useRef([]);

//   useEffect(() => {
//     fetchAssets();
//   }, [currentPage, searchTerm]);

//   // GSAP animations on mount
//   useEffect(() => {
//     if (!loading && assets.length > 0) {
//       // Animate header
//       gsap.fromTo(
//         headerRef.current,
//         { y: -50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
//       );

//       // Animate stats cards with stagger
//       gsap.fromTo(
//         statsRef.current.children,
//         { y: 30, opacity: 0, scale: 0.9 },
//         {
//           y: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 0.5,
//           stagger: 0.1,
//           ease: "back.out(1.2)",
//         }
//       );

//       // Animate search bar
//       gsap.fromTo(
//         searchRef.current,
//         { scale: 0.8, opacity: 0 },
//         { scale: 1, opacity: 1, duration: 0.4, delay: 0.3, ease: "power2.out" }
//       );

//       // Animate table/cards
//       if (tableRef.current) {
//         gsap.fromTo(
//           tableRef.current,
//           { y: 30, opacity: 0 },
//           { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: "power3.out" }
//         );
//       }

//       // Animate mobile cards
//       cardsRef.current.forEach((card, index) => {
//         if (card) {
//           gsap.fromTo(
//             card,
//             { x: -30, opacity: 0 },
//             {
//               x: 0,
//               opacity: 1,
//               duration: 0.5,
//               delay: 0.5 + index * 0.1,
//               ease: "power2.out",
//             }
//           );
//         }
//       });
//     }
//   }, [loading, assets]);

//   const fetchAssets = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/hr/assets", {
//         params: {
//           page: currentPage,
//           limit: itemsPerPage,
//           search: searchTerm,
//         },
//       });

//       setAssets(response.data.assets || []);
//       setTotalPages(response.data.totalPages || 1);
//       setTotalItems(response.data.total || 0);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       toast.error("Failed to load assets");
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (assetId, assetName) => {
//     if (
//       !window.confirm(
//         `Are you sure you want to delete "${assetName}"? This action cannot be undone.`
//       )
//     ) {
//       return;
//     }

//     setDeleteLoading(assetId);
//     try {
//       await axios.delete(`/hr/assets/${assetId}`);
//       toast.success("Asset deleted successfully!");
//       fetchAssets();
//     } catch (error) {
//       console.error("Error deleting asset:", error);
//       toast.error(error.response?.data?.message || "Failed to delete asset");
//     } finally {
//       setDeleteLoading(null);
//     }
//   };

//   const handleEdit = (assetId) => {
//     const asset = assets.find((a) => a._id === assetId);
//     if (asset) {
//       setEditingAsset(asset);
//       setIsEditModalOpen(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setIsEditModalOpen(false);
//     setEditingAsset(null);
//   };

//   const handleUpdateSuccess = () => {
//     fetchAssets();
//   };

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       setCurrentPage(1);
//     }, 500);

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm]);

//   const stats = {
//     total: assets.reduce((sum, a) => sum + a.productQuantity, 0),
//     available: assets.reduce((sum, a) => sum + (a.availableQuantity || 0), 0),
//     assigned: assets.reduce(
//       (sum, a) => sum + (a.productQuantity - (a.availableQuantity || 0)),
//       0
//     ),
//     types: totalItems,
//   };

//   const startItem = (currentPage - 1) * itemsPerPage + 1;
//   const endItem = Math.min(currentPage * itemsPerPage, totalItems);

//   const generatePageNumbers = () => {
//     const pages = [];
//     const showMax = 5;

//     if (totalPages <= showMax) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);

//       if (currentPage > 3) {
//         pages.push("...");
//       }

//       for (
//         let i = Math.max(2, currentPage - 1);
//         i <= Math.min(totalPages - 1, currentPage + 1);
//         i++
//       ) {
//         pages.push(i);
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push("...");
//       }

//       if (totalPages > 1) {
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   // Hover animation for stat cards
//   const handleStatHover = (e) => {
//     gsap.to(e.currentTarget, {
//       y: -8,
//       scale: 1.03,
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   const handleStatLeave = (e) => {
//     gsap.to(e.currentTarget, {
//       y: 0,
//       scale: 1,
//       duration: 0.3,
//       ease: "power2.out",
//     });
//   };

//   return (
//     <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
//       {/* Header */}
//       <div
//         ref={headerRef}
//         className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6"
//       >
//         <div>
//           <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
//             Asset Management
//           </h2>
//           <p className="text-sm sm:text-base text-gray-600 mt-1">
//             Manage your company's assets
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/hr/add-asset")}
//           className="btn btn-sm sm:btn-md bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full sm:w-auto transition-all hover:scale-105"
//         >
//           <svg
//             className="w-4 h-4 sm:w-5 sm:h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//           <span className="hidden xs:inline">Add New Asset</span>
//           <span className="xs:hidden">Add Asset</span>
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div
//         ref={statsRef}
//         className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6"
//       >
//         <div
//           onMouseEnter={handleStatHover}
//           onMouseLeave={handleStatLeave}
//           className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-blue-500 cursor-pointer"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
//                 Total Assets
//               </p>
//               <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mt-1">
//                 {stats.total}
//               </p>
//             </div>
//             <div className="text-2xl sm:text-3xl lg:text-4xl">📦</div>
//           </div>
//         </div>

//         <div
//           onMouseEnter={handleStatHover}
//           onMouseLeave={handleStatLeave}
//           className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-green-500 cursor-pointer"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
//                 Available
//               </p>
//               <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mt-1">
//                 {stats.available}
//               </p>
//             </div>
//             <div className="text-2xl sm:text-3xl lg:text-4xl">✅</div>
//           </div>
//         </div>

//         <div
//           onMouseEnter={handleStatHover}
//           onMouseLeave={handleStatLeave}
//           className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-yellow-500 cursor-pointer"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
//                 Assigned
//               </p>
//               <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 mt-1">
//                 {stats.assigned}
//               </p>
//             </div>
//             <div className="text-2xl sm:text-3xl lg:text-4xl">📤</div>
//           </div>
//         </div>

//         <div
//           onMouseEnter={handleStatHover}
//           onMouseLeave={handleStatLeave}
//           className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-md border-l-4 border-purple-500 cursor-pointer"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//             <div className="flex-1 min-w-0">
//               <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">
//                 Asset Types
//               </p>
//               <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600 mt-1">
//                 {stats.types}
//               </p>
//             </div>
//             <div className="text-2xl sm:text-3xl lg:text-4xl">🏷️</div>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div ref={searchRef} className="mb-4 sm:mb-6">
//         <input
//           type="text"
//           placeholder="🔍 Search assets..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="input input-bordered w-full text-sm sm:text-base"
//         />
//       </div>

//       {/* Showing X-Y of Z items */}
//       {!loading && assets.length > 0 && (
//         <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
//           <span>
//             Showing{" "}
//             <span className="font-semibold text-gray-800">{startItem}</span> to{" "}
//             <span className="font-semibold text-gray-800">{endItem}</span> of{" "}
//             <span className="font-semibold text-gray-800">{totalItems}</span>{" "}
//             assets
//           </span>
//           <span className="hidden sm:inline">
//             Page {currentPage} of {totalPages}
//           </span>
//         </div>
//       )}

//       {/* Assets Content */}
//       {loading ? (
//         <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow">
//           <div className="loading loading-spinner loading-md sm:loading-lg text-blue-600"></div>
//           <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
//             Loading assets...
//           </p>
//         </div>
//       ) : assets.length === 0 ? (
//         <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow px-4">
//           <div className="text-4xl sm:text-6xl mb-4">📦</div>
//           <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-2">
//             No assets found
//           </p>
//           <p className="text-sm sm:text-base text-gray-400 mb-6">
//             {searchTerm
//               ? "Try adjusting your search term"
//               : "Start by adding your first asset"}
//           </p>
//           {!searchTerm && (
//             <button
//               onClick={() => navigate("/hr/add-asset")}
//               className="btn btn-sm sm:btn-md bg-blue-600 hover:bg-blue-700 text-white"
//             >
//               Add Your First Asset
//             </button>
//           )}
//         </div>
//       ) : (
//         <>
//           {/* Desktop Table View */}
//           <div
//             ref={tableRef}
//             className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden"
//           >
//             <div className="overflow-x-auto">
//               <table className="table w-full">
//                 <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
//                   <tr>
//                     <th className="font-bold text-gray-700">Image</th>
//                     <th className="font-bold text-gray-700">Product Name</th>
//                     <th className="font-bold text-gray-700">Type</th>
//                     <th className="font-bold text-gray-700">Total Quantity</th>
//                     <th className="font-bold text-gray-700">Available</th>
//                     <th className="font-bold text-gray-700">Assigned</th>
//                     <th className="font-bold text-gray-700">Date Added</th>
//                     <th className="font-bold text-gray-700">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {assets.map((asset) => (
//                     <tr
//                       key={asset._id}
//                       className="hover:bg-gray-50 transition-all hover:scale-[1.01]"
//                     >
//                       <td>
//                         <div className="avatar">
//                           <div className="w-16 h-16 rounded-lg">
//                             <img
//                               src={asset.productImage}
//                               alt={asset.productName}
//                               className="object-cover"
//                               onError={(e) => {
//                                 e.target.src =
//                                   "https://via.placeholder.com/100?text=No+Image";
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </td>
//                       <td>
//                         <div className="font-semibold text-gray-800">
//                           {asset.productName}
//                         </div>
//                       </td>
//                       <td>
//                         <span
//                           className={`badge ${
//                             asset.productType === "Returnable"
//                               ? "badge-primary"
//                               : "badge-secondary"
//                           }`}
//                         >
//                           {asset.productType}
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         <span className="font-semibold text-blue-600">
//                           {asset.productQuantity}
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         <span className="font-semibold text-green-600">
//                           {asset.availableQuantity || 0}
//                         </span>
//                       </td>
//                       <td className="text-center">
//                         <span className="font-semibold text-yellow-600">
//                           {asset.productQuantity -
//                             (asset.availableQuantity || 0)}
//                         </span>
//                       </td>
//                       <td className="text-gray-600">
//                         {new Date(asset.dateAdded).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </td>
//                       <td>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEdit(asset._id)}
//                             className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50 transition-all hover:scale-110"
//                             title="Edit"
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                               />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleDelete(asset._id, asset.productName)
//                             }
//                             className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50 transition-all hover:scale-110"
//                             disabled={deleteLoading === asset._id}
//                             title="Delete"
//                           >
//                             {deleteLoading === asset._id ? (
//                               <span className="loading loading-spinner loading-xs"></span>
//                             ) : (
//                               <svg
//                                 className="w-4 h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                                 />
//                               </svg>
//                             )}
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* PART 1 ENDS HERE - CONTINUE TO PART 2 */}
//           {/* Mobile Card View */}
//           <div className="lg:hidden space-y-4">
//             {assets.map((asset, index) => (
//               <div
//                 key={asset._id}
//                 ref={(el) => (cardsRef.current[index] = el)}
//                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
//               >
//                 <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
//                   <div className="avatar flex-shrink-0">
//                     <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg">
//                       <img
//                         src={asset.productImage}
//                         alt={asset.productName}
//                         className="object-cover"
//                         onError={(e) => {
//                           e.target.src =
//                             "https://via.placeholder.com/100?text=No+Image";
//                         }}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">
//                       {asset.productName}
//                     </h3>
//                     <span
//                       className={`badge badge-sm sm:badge-md mt-1 ${
//                         asset.productType === "Returnable"
//                           ? "badge-primary"
//                           : "badge-secondary"
//                       }`}
//                     >
//                       {asset.productType}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4 space-y-3">
//                   <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                     <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
//                       <p className="text-xs text-gray-600 font-medium">Total</p>
//                       <p className="text-lg sm:text-xl font-bold text-blue-600 mt-1">
//                         {asset.productQuantity}
//                       </p>
//                     </div>
//                     <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
//                       <p className="text-xs text-gray-600 font-medium">
//                         Available
//                       </p>
//                       <p className="text-lg sm:text-xl font-bold text-green-600 mt-1">
//                         {asset.availableQuantity || 0}
//                       </p>
//                     </div>
//                     <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
//                       <p className="text-xs text-gray-600 font-medium">
//                         Assigned
//                       </p>
//                       <p className="text-lg sm:text-xl font-bold text-yellow-600 mt-1">
//                         {asset.productQuantity - (asset.availableQuantity || 0)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
//                     <svg
//                       className="w-4 h-4"
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
//                     <span>
//                       Added:{" "}
//                       {new Date(asset.dateAdded).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "short",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   <div className="flex gap-2 pt-2 border-t">
//                     <button
//                       onClick={() => handleEdit(asset._id)}
//                       className="flex-1 btn btn-sm bg-blue-600 hover:bg-blue-700 text-white gap-2 transition-all hover:scale-105"
//                     >
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                         />
//                       </svg>
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(asset._id, asset.productName)}
//                       className="flex-1 btn btn-sm bg-red-600 hover:bg-red-700 text-white gap-2 transition-all hover:scale-105"
//                       disabled={deleteLoading === asset._id}
//                     >
//                       {deleteLoading === asset._id ? (
//                         <span className="loading loading-spinner loading-xs"></span>
//                       ) : (
//                         <>
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                             />
//                           </svg>
//                           Delete
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ENHANCED PAGINATION */}
//           {totalPages > 1 && (
//             <div className="mt-6 bg-white rounded-lg shadow p-4">
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                 {/* Page Info - Mobile */}
//                 <div className="text-sm text-gray-600 sm:hidden">
//                   Page {currentPage} of {totalPages}
//                 </div>

//                 {/* Pagination Controls */}
//                 <div className="flex items-center gap-2">
//                   {/* Previous Button */}
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.max(1, prev - 1))
//                     }
//                     disabled={currentPage === 1}
//                     className="btn btn-sm sm:btn-md gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition-all hover:scale-105"
//                   >
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                     <span className="hidden sm:inline">Previous</span>
//                   </button>

//                   {/* Page Numbers */}
//                   <div className="flex items-center gap-1">
//                     {generatePageNumbers().map((pageNum, idx) => (
//                       <button
//                         key={idx}
//                         onClick={() => {
//                           if (pageNum !== "...") {
//                             setCurrentPage(pageNum);
//                           }
//                         }}
//                         disabled={pageNum === "..."}
//                         className={`btn btn-sm sm:btn-md min-w-[2.5rem] transition-all hover:scale-105 ${
//                           currentPage === pageNum
//                             ? "bg-blue-600 text-white hover:bg-blue-700"
//                             : pageNum === "..."
//                             ? "btn-ghost cursor-default"
//                             : "btn-ghost hover:bg-gray-100"
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Next Button */}
//                   <button
//                     onClick={() =>
//                       setCurrentPage((prev) => Math.min(totalPages, prev + 1))
//                     }
//                     disabled={currentPage === totalPages}
//                     className="btn btn-sm sm:btn-md gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 transition-all hover:scale-105"
//                   >
//                     <span className="hidden sm:inline">Next</span>
//                     <svg
//                       className="w-4 h-4"
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
//                   </button>
//                 </div>

//                 {/* Items Info - Desktop */}
//                 <div className="hidden sm:block text-sm text-gray-600">
//                   Showing {startItem}-{endItem} of {totalItems}
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}

//       {/* Info Card */}
//       {assets.length > 0 && (
//         <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6">
//           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
//             <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <div className="flex-1">
//               <h3 className="font-bold text-blue-900 mb-2 text-base sm:text-lg">
//                 Asset Management Tips
//               </h3>
//               <ul className="text-xs sm:text-sm text-blue-800 space-y-2">
//                 <li className="flex items-start">
//                   <span className="mr-2 flex-shrink-0">•</span>
//                   <span>
//                     Keep track of available quantities to ensure proper
//                     inventory management
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 flex-shrink-0">•</span>
//                   <span>
//                     Returnable assets should be tracked when employees leave
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="mr-2 flex-shrink-0">•</span>
//                   <span>Update asset quantities when new stock arrives</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Asset Modal */}
//       <EditAssetModal
//         asset={editingAsset}
//         isOpen={isEditModalOpen}
//         onClose={handleCloseModal}
//         onSuccess={handleUpdateSuccess}
//       />
//     </div>
//   );
// }
