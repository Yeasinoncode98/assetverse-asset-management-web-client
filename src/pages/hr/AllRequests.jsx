// // ....................3................update real time

import React, { useState, useEffect, useRef } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";
import RequestTable from "./components/RequestTable";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [actionLoading, setActionLoading] = useState(null);
  const [isAutoRefreshActive, setIsAutoRefreshActive] = useState(true);
  const [lastPendingCount, setLastPendingCount] = useState(0); // ✅ Track pending count only
  const intervalRef = useRef(null);

  // ✅ INITIAL FETCH
  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  // ✅ AUTO-REFRESH EVERY 10 SECONDS
  useEffect(() => {
    if (isAutoRefreshActive) {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up new interval
      intervalRef.current = setInterval(() => {
        fetchRequestsSilently();
      }, 10000); // 10 seconds

      console.log("🔄 Auto-refresh activated (every 10 seconds)");
    } else {
      // Clear interval when auto-refresh is disabled
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        console.log("⏸️ Auto-refresh paused");
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoRefreshActive, filterStatus]);

  // ✅ FETCH REQUESTS (WITH LOADING)
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/hr/requests", {
        params: {
          status: filterStatus,
        },
      });

      const newRequests = response.data || [];
      setRequests(newRequests);

      // ✅ Count only PENDING requests
      const pendingCount = newRequests.filter(
        (r) => r.requestStatus === "pending"
      ).length;
      setLastPendingCount(pendingCount);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
      setLoading(false);
    }
  };

  // ✅ FETCH REQUESTS SILENTLY (WITHOUT LOADING INDICATOR)
  const fetchRequestsSilently = async () => {
    try {
      const response = await axios.get("/hr/requests", {
        params: {
          status: filterStatus,
        },
      });

      const newRequests = response.data || [];

      // ✅ Count only PENDING requests
      const currentPendingCount = newRequests.filter(
        (r) => r.requestStatus === "pending"
      ).length;

      // 🔔 CHECK IF NEW PENDING REQUESTS ARRIVED
      if (currentPendingCount > lastPendingCount) {
        const newPendingCount = currentPendingCount - lastPendingCount;

        // Show notification
        toast.success(
          `🔔 ${newPendingCount} new pending request${
            newPendingCount > 1 ? "s" : ""
          } received!`,
          {
            duration: 5000,
            icon: "🆕",
            style: {
              background: "#10B981",
              color: "white",
              fontWeight: "bold",
            },
          }
        );

        // Play notification sound
        playNotificationSound();

        console.log(`✅ ${newPendingCount} new pending request(s) detected!`);
      }

      setRequests(newRequests);
      setLastPendingCount(currentPendingCount);

      console.log(
        "✅ Requests refreshed at",
        new Date().toLocaleTimeString(),
        "| Pending:",
        currentPendingCount
      );
    } catch (error) {
      console.error("Silent fetch error:", error);
      // Don't show error toast for silent refresh
    }
  };

  // ✅ PLAY NOTIFICATION SOUND
  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log("Notification sound error:", error);
    }
  };

  const handleApprove = async (requestId) => {
    if (!window.confirm("Are you sure you want to approve this request?")) {
      return;
    }

    setActionLoading(requestId);
    try {
      await axios.post(`/hr/requests/${requestId}/approve`);

      toast.success(
        "Request approved! Asset has been assigned to the employee."
      );

      // Update local state immediately
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, requestStatus: "approved" } : req
        )
      );

      // Also fetch fresh data
      fetchRequestsSilently();
    } catch (error) {
      console.error("Error approving request:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to approve request";
      toast.error(errorMessage);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (requestId) => {
    const reason = window.prompt("Reason for rejection (optional):");
    if (reason === null) return;

    setActionLoading(requestId);
    try {
      await axios.post(`/hr/requests/${requestId}/reject`, {
        reason: reason || "No reason provided",
      });

      toast.success("Request rejected");

      // Update local state immediately
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, requestStatus: "rejected" } : req
        )
      );

      // Also fetch fresh data
      fetchRequestsSilently();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error(error.response?.data?.message || "Failed to reject request");
    } finally {
      setActionLoading(null);
    }
  };

  // Filter requests based on status
  const filteredRequests =
    filterStatus === "All"
      ? requests
      : requests.filter(
          (req) => req.requestStatus === filterStatus.toLowerCase()
        );

  // Calculate status counts
  const statusCounts = {
    All: requests.length,
    Pending: requests.filter((r) => r.requestStatus === "pending").length,
    Approved: requests.filter((r) => r.requestStatus === "approved").length,
    Rejected: requests.filter((r) => r.requestStatus === "rejected").length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ✅ AUTO-REFRESH INDICATOR & TOGGLE */}
      <div className="mb-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            {isAutoRefreshActive ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </>
            ) : (
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">
              {isAutoRefreshActive
                ? "Auto-Refresh Active 🟢"
                : "Auto-Refresh Paused ⏸️"}
            </p>
            <p className="text-xs text-gray-600">
              {isAutoRefreshActive
                ? "Updates every 10 seconds"
                : "Click to enable automatic updates"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsAutoRefreshActive(!isAutoRefreshActive)}
          className={`btn btn-sm ${
            isAutoRefreshActive
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isAutoRefreshActive ? (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Enable
            </>
          )}
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-3xl font-bold text-black">All Requests</h2>
        <p className="text-green-500 mt-1">
          Review and manage asset requests from employees
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Requests
              </p>
              <p className="text-3xl font-bold text-gray-600 mt-1">
                {statusCounts.All}
              </p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {statusCounts.Pending}
              </p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {statusCounts.Approved}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {statusCounts.Rejected}
              </p>
            </div>
            <div className="text-4xl">❌</div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`btn btn-sm ${
              filterStatus === status
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "btn-outline"
            }`}
          >
            {status}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                filterStatus === status
                  ? "bg-white text-blue-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {statusCounts[status]}
            </span>
          </button>
        ))}
      </div>

      {/* Pending Requests Alert */}
      {statusCounts.Pending > 0 && filterStatus !== "Pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⏰</span>
            <div>
              <p className="text-sm text-yellow-800">
                <strong>{statusCounts.Pending}</strong> request
                {statusCounts.Pending > 1 ? "s" : ""} waiting for your review
              </p>
            </div>
            <button
              onClick={() => setFilterStatus("Pending")}
              className="ml-auto btn btn-sm btn-warning"
            >
              View Pending
            </button>
          </div>
        </div>
      )}

      {/* Requests Table */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">
            {filterStatus === "All"
              ? "📭"
              : filterStatus === "Pending"
              ? "⏳"
              : filterStatus === "Approved"
              ? "✅"
              : "❌"}
          </div>
          <p className="text-gray-500 text-xl font-semibold mb-2">
            No {filterStatus.toLowerCase()} requests found
          </p>
          <p className="text-gray-400">
            {filterStatus === "Pending"
              ? "All requests have been reviewed"
              : `No requests with status: ${filterStatus}`}
          </p>
        </div>
      ) : (
        <RequestTable
          requests={filteredRequests}
          onApprove={handleApprove}
          onReject={handleReject}
          actionLoading={actionLoading}
        />
      )}

      {/* Info Card */}
      {requests.length > 0 && (
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
                Request Management Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    New requests appear automatically every 10 seconds 🔄
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Approving a request automatically assigns the asset to the
                    employee
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Check asset availability before approving multiple requests
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You can pause auto-refresh anytime using the toggle button
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

// 2..............................
