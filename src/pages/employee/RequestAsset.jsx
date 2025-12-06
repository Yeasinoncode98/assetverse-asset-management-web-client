import React, { useState, useEffect } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";

export default function RequestAsset() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchAvailableAssets();
  }, []);

  const fetchAvailableAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/employee/available-assets");
      setAssets(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      toast.error("Failed to load available assets");
      setLoading(false);
    }
  };

  const handleRequestClick = (asset) => {
    if (asset.availableQuantity < 1) {
      toast.error("This asset is currently not available");
      return;
    }
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const handleSubmitRequest = async () => {
    if (!selectedAsset) return;

    setRequestLoading(true);
    try {
      await axios.post("/employee/request-asset", {
        assetId: selectedAsset._id,
        note: note.trim(),
      });

      toast.success(
        "Asset request submitted successfully! HR will review it soon."
      );
      setIsModalOpen(false);
      setNote("");
      setSelectedAsset(null);
      fetchAvailableAssets(); // Refresh the list
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error(error.response?.data?.message || "Failed to submit request");
    } finally {
      setRequestLoading(false);
    }
  };

  const closeModal = () => {
    if (!requestLoading) {
      setIsModalOpen(false);
      setNote("");
      setSelectedAsset(null);
    }
  };

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "All" || asset.productType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Request Asset</h2>
        <p className="text-gray-600 mt-1">
          Browse and request available assets from your company
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Assets</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {assets.length}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Available Now</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {assets.filter((a) => a.availableQuantity > 0).length}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Out of Stock</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {assets.filter((a) => a.availableQuantity === 0).length}
              </p>
            </div>
            <div className="text-4xl">📭</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered flex-1"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select select-bordered min-w-[200px]"
        >
          <option value="All">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Assets Grid */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading available assets...
          </p>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-gray-500 text-xl font-semibold mb-2">
            {searchTerm || filterType !== "All"
              ? "No assets found matching your criteria"
              : "No assets available at the moment"}
          </p>
          <p className="text-gray-400">
            {searchTerm || filterType !== "All"
              ? "Try adjusting your search or filter"
              : "Check back later or contact HR"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Asset Image */}
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <img
                  src={asset.productImage}
                  alt={asset.productName}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                {asset.availableQuantity === 0 && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Asset Details */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                  {asset.productName}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span
                      className={`badge ${
                        asset.productType === "Returnable"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Available:</span>
                    <span
                      className={`font-bold ${
                        asset.availableQuantity > 5
                          ? "text-green-600"
                          : asset.availableQuantity > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {asset.availableQuantity} / {asset.productQuantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Company:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {asset.companyName || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Availability Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        asset.availableQuantity > 5
                          ? "bg-green-500"
                          : asset.availableQuantity > 0
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${
                          (asset.availableQuantity / asset.productQuantity) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Request Button */}
                <button
                  onClick={() => handleRequestClick(asset)}
                  disabled={asset.availableQuantity === 0}
                  className={`w-full btn ${
                    asset.availableQuantity > 0
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "btn-disabled"
                  }`}
                >
                  {asset.availableQuantity > 0 ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Request Asset
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request Modal */}
      {isModalOpen && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">
                  Request Asset
                </h3>
                <button
                  onClick={closeModal}
                  disabled={requestLoading}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>

              {/* Selected Asset Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedAsset.productImage}
                    alt={selectedAsset.productName}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100?text=Asset";
                    }}
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {selectedAsset.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Type:{" "}
                      <span className="font-medium">
                        {selectedAsset.productType}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Available:{" "}
                      <span className="font-bold text-green-600">
                        {selectedAsset.availableQuantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Note Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Why do you need this asset? (e.g., For development work, Home office setup)"
                  className="textarea textarea-bordered w-full h-24 resize-none"
                  disabled={requestLoading}
                  maxLength={500}
                ></textarea>
                <div className="text-right text-xs text-gray-500 mt-1">
                  {note.length}/500 characters
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  disabled={requestLoading}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRequest}
                  disabled={requestLoading}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white flex-1"
                >
                  {requestLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
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
                      Submit Request
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      {assets.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-600"
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
            <div>
              <h3 className="font-bold text-blue-900 mb-2 text-lg">
                Request Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Provide a clear reason for requesting the asset to speed up
                    approval
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Returnable assets must be returned when you leave the
                    company
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    HR will review your request and notify you of the decision
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You can track your requests in the "My Assets" section
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
