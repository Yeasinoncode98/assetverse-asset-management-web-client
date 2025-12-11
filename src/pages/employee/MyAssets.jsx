import React, { useState, useEffect } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";

export default function MyAssets() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/employee/my-assets", {
        params: {
          search: searchTerm,
          type: filterType,
        },
      });

      setAssets(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast.error("Failed to load your assets");
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!loading) {
        fetchAssets();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, filterType]);

  const handleReturn = async (assetId, assetName) => {
    if (!window.confirm(`Are you sure you want to return ${assetName}?`)) {
      return;
    }

    try {
      await axios.post(`/employee/return-asset/${assetId}`);
      toast.success("Asset return request submitted!");
      fetchAssets();
    } catch (error) {
      console.error("Error returning asset:", error);
      toast.error(error.response?.data?.message || "Failed to return asset");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const statusBadge = (status) => {
    const badges = {
      assigned: "badge-success",
      returned: "badge-warning",
      pending: "badge-warning",
    };
    return badges[status] || "badge-ghost";
  };

  const stats = {
    total: assets.length,
    approved: assets.filter((a) => a.status === "assigned").length,
    pending: assets.filter((a) => a.status === "pending").length,
    returned: assets.filter((a) => a.status === "returned").length,
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            My Assets
          </h2>
          <p className="text-sm sm:text-base text-green-500 mt-1">
            View and manage your assigned assets
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="btn btn-sm sm:btn-md btn-outline gap-2 w-full sm:w-auto"
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print
        </button>
      </div>

      {/* Stats Cards - Single Column on Mobile */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {stats.total}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Assigned</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats.approved}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Returned</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats.returned}
              </p>
            </div>
            <div className="text-4xl">🔄</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Returnable</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {
                  assets.filter(
                    (a) =>
                      a.assetType === "Returnable" && a.status === "assigned"
                  ).length
                }
              </p>
            </div>
            <div className="text-4xl">↩️</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Search by asset name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full text-sm sm:text-base"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered w-full sm:min-w-[200px] text-sm sm:text-base"
        >
          <option value="All">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Assets Content */}
      {loading ? (
        <div className="text-center py-8 sm:py-12 bg-white rounded-lg shadow">
          <div className="loading loading-spinner loading-md sm:loading-lg text-blue-600"></div>
          <p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
            Loading your assets...
          </p>
        </div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-white rounded-lg shadow px-4">
          <div className="text-4xl sm:text-6xl mb-4">📭</div>
          <p className="text-gray-500 text-lg sm:text-xl font-semibold mb-2">
            No assets found
          </p>
          <p className="text-sm sm:text-base text-gray-400">
            {searchTerm || filterType !== "All"
              ? "Try adjusting your search or filter"
              : "You haven't been assigned any assets yet"}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View - Hidden on Mobile */}
          <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <tr>
                    <th className="font-bold text-gray-700">Image</th>
                    <th className="font-bold text-gray-700">Asset Name</th>
                    <th className="font-bold text-gray-700">Type</th>
                    <th className="font-bold text-gray-700">Company</th>
                    <th className="font-bold text-gray-700">Request Date</th>
                    <th className="font-bold text-gray-700">Assigned Date</th>
                    <th className="font-bold text-gray-700">Status</th>
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
                              src={
                                asset.assetImage ||
                                "https://via.placeholder.com/100?text=No+Image"
                              }
                              alt={asset.assetName}
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
                          {asset.assetName}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            asset.assetType === "Returnable"
                              ? "badge-primary"
                              : "badge-secondary"
                          }`}
                        >
                          {asset.assetType}
                        </span>
                      </td>
                      <td className="text-gray-700">
                        {asset.companyName || "N/A"}
                      </td>
                      <td className="text-gray-600">
                        {asset.requestDate
                          ? new Date(asset.requestDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td className="text-gray-600">
                        {asset.assignmentDate
                          ? new Date(asset.assignmentDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td>
                        <span className={`badge ${statusBadge(asset.status)}`}>
                          {asset.status === "assigned"
                            ? "Assigned"
                            : asset.status === "returned"
                            ? "Returned"
                            : asset.status.charAt(0).toUpperCase() +
                              asset.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        {asset.status === "assigned" &&
                        asset.assetType === "Returnable" ? (
                          <button
                            onClick={() =>
                              handleReturn(asset._id, asset.assetName)
                            }
                            className="btn btn-sm btn-warning gap-2 hover:btn-error transition-colors"
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
                                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                              />
                            </svg>
                            Return
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            {asset.status === "returned"
                              ? "Returned"
                              : "Non-returnable"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View - Shown only on Mobile/Tablet */}
          <div className="lg:hidden space-y-4">
            {assets.map((asset) => (
              <div
                key={asset._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Card Header with Image */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="avatar flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg">
                      <img
                        src={
                          asset.assetImage ||
                          "https://via.placeholder.com/100?text=No+Image"
                        }
                        alt={asset.assetName}
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
                      {asset.assetName}
                    </h3>
                    <span
                      className={`badge badge-sm mt-1 ${
                        asset.assetType === "Returnable"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {asset.assetType}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Company */}
                  <div className="flex items-start gap-2">
                    <div className="text-lg flex-shrink-0">🏢</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">
                        Company
                      </p>
                      <p className="text-sm text-gray-800 truncate">
                        {asset.companyName || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <div className="text-lg flex-shrink-0">📅</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-medium">
                          Requested
                        </p>
                        <p className="text-xs text-gray-700">
                          {asset.requestDate
                            ? new Date(asset.requestDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "2-digit",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-lg flex-shrink-0">✅</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-medium">
                          Assigned
                        </p>
                        <p className="text-xs text-gray-700">
                          {asset.assignmentDate
                            ? new Date(asset.assignmentDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "2-digit",
                                }
                              )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-start gap-2">
                    <div className="text-lg flex-shrink-0">🏷️</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium mb-1">
                        Status
                      </p>
                      <span className={`badge ${statusBadge(asset.status)}`}>
                        {asset.status === "assigned"
                          ? "Assigned"
                          : asset.status === "returned"
                          ? "Returned"
                          : asset.status.charAt(0).toUpperCase() +
                            asset.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t">
                    {asset.status === "assigned" &&
                    asset.assetType === "Returnable" ? (
                      <button
                        onClick={() => handleReturn(asset._id, asset.assetName)}
                        className="w-full btn btn-sm btn-warning gap-2 hover:btn-error"
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
                            d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          />
                        </svg>
                        Return Asset
                      </button>
                    ) : (
                      <div className="text-center py-2 bg-gray-50 rounded text-sm text-gray-500 italic">
                        {asset.status === "returned"
                          ? "🔄 Returned"
                          : "Non-returnable"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Info Section */}
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
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1.5 sm:space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span>
                    Returnable assets must be returned when leaving the company
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span>
                    Non-returnable assets are yours to keep permanently
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 flex-shrink-0">•</span>
                  <span>
                    Contact HR if you have any issues with your assigned assets
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
