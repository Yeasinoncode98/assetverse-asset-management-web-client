import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// Component to assign asset directly from employee list
export default function AssignAssetModal({ employee, onClose, onSuccess }) {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingAssets, setFetchingAssets] = useState(true);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const getToken = () => localStorage.getItem("token");

  // Fetch available assets
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setFetchingAssets(true);
      const token = getToken();

      const response = await axios.get(
        `${API_BASE_URL}/hr/assets?page=1&limit=100`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Filter only available assets
      const availableAssets =
        response.data.assets?.filter((asset) => asset.availableQuantity > 0) ||
        [];

      setAssets(availableAssets);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      toast.error("Failed to load assets");
      setAssets([]);
    } finally {
      setFetchingAssets(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedAsset) {
      toast.error("Please select an asset");
      return;
    }

    try {
      setLoading(true);
      const token = getToken();

      const response = await axios.post(
        `${API_BASE_URL}/hr/assign-asset-directly`,
        {
          employeeEmail: employee.email,
          assetId: selectedAsset._id,
          note: note || "Directly assigned by HR",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message || "Asset assigned successfully!");
      onSuccess && onSuccess();
      onClose();
    } catch (error) {
      console.error("Assignment error:", error);
      toast.error(error.response?.data?.message || "Failed to assign asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">Assign Asset Directly</h3>
            <p className="text-sm text-gray-500 mt-1">
              To: <span className="font-semibold">{employee.name}</span> (
              {employee.email})
            </p>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <hr className="my-4" />

        {/* Asset Selection */}
        {fetchingAssets ? (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : assets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-gray-500">No available assets</p>
          </div>
        ) : (
          <>
            {/* Asset List */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">Select Asset</span>
                <span className="label-text-alt">
                  {assets.length} available
                </span>
              </label>
              <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                {assets.map((asset) => (
                  <div
                    key={asset._id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`card cursor-pointer border-2 transition-all ${
                      selectedAsset?._id === asset._id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <div className="card-body p-4">
                      <div className="flex items-center gap-3">
                        {/* Asset Image */}
                        <div className="avatar">
                          <div className="w-12 h-12 rounded">
                            <img
                              src={
                                asset.productImage ||
                                "https://via.placeholder.com/50"
                              }
                              alt={asset.productName}
                            />
                          </div>
                        </div>

                        {/* Asset Info */}
                        <div className="flex-1">
                          <h4 className="font-semibold">{asset.productName}</h4>
                          <div className="flex gap-3 text-xs text-gray-500 mt-1">
                            <span className="badge badge-sm">
                              {asset.productType}
                            </span>
                            <span>Available: {asset.availableQuantity}</span>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {selectedAsset?._id === asset._id && (
                          <div className="text-primary">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Note (Optional)</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Add a note for this assignment..."
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedAsset || loading || fetchingAssets}
            className="btn btn-primary"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Assigning...
              </>
            ) : (
              "Assign Asset"
            )}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
