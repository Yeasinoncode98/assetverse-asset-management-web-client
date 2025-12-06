// 3......
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AvailableEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviting, setInviting] = useState(null);
  const [lastFetched, setLastFetched] = useState(new Date());
  const [debugInfo, setDebugInfo] = useState({});

  // ✅ Using your existing env variable
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  // Get token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("🔑 Token status:", token ? "Found ✅" : "Missing ❌");
    return token;
  };

  // Fetch employees on mount and setup auto-refresh
  useEffect(() => {
    console.log("🚀 Component mounted");
    console.log("🌐 API Base URL:", API_BASE_URL);

    // Initial fetch
    fetchAvailableEmployees();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      console.log("🔄 Auto-refresh triggered");
      fetchAvailableEmployees(true);
    }, 10000);

    return () => {
      console.log("🛑 Component unmounted, clearing interval");
      clearInterval(interval);
    };
  }, []);

  // Fetch available employees
  const fetchAvailableEmployees = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const token = getToken();

      if (!token) {
        toast.error("Please login again");
        setEmployees([]);
        setLoading(false);
        return;
      }

      // ✅ Correct endpoint using API_BASE_URL
      const endpoint = `${API_BASE_URL}/hr/available-employees`;
      console.log("📡 Fetching from:", endpoint);

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Response status:", response.status);
      console.log("📦 Response data:", response.data);

      const data = Array.isArray(response.data) ? response.data : [];

      console.log(`📊 Found ${data.length} available employee(s)`);
      if (data.length > 0) {
        console.log(
          "👥 Employees:",
          data.map((e) => `${e.name} (${e.email})`)
        );
      }

      // Show notification for new employees (only during auto-refresh)
      if (silent && data.length > employees.length && employees.length !== 0) {
        const newCount = data.length - employees.length;
        toast.success(`${newCount} new employee(s) available!`, {
          icon: "🆕",
          duration: 4000,
        });
      }

      setEmployees(data);
      setLastFetched(new Date());

      // Store debug info
      setDebugInfo({
        apiUrl: API_BASE_URL,
        tokenPresent: !!token,
        employeeCount: data.length,
        lastFetch: new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.error("❌ Fetch error:", error);
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      if (!silent) {
        const errorMsg =
          error.response?.data?.message ||
          error.response?.statusText ||
          "Failed to load employees";
        toast.error(errorMsg);
      }

      setEmployees([]);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Assign employee to company
  const handleAssignEmployee = async (employee) => {
    const { email: employeeEmail, name: employeeName } = employee;

    console.log("➕ Attempting to assign:", employeeName, employeeEmail);

    try {
      setInviting(employeeEmail);
      const token = getToken();

      if (!token) {
        toast.error("Please login again");
        return;
      }

      // ✅ Correct endpoint using API_BASE_URL
      const endpoint = `${API_BASE_URL}/hr/employees/assign`;
      console.log("📡 Posting to:", endpoint);

      const response = await axios.post(
        endpoint,
        {
          employeeEmail,
          employeeName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Assignment successful:", response.data);

      toast.success(
        response.data.message || `${employeeName} added successfully!`,
        { duration: 3000 }
      );

      // Remove employee from list
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.email !== employeeEmail)
      );
    } catch (error) {
      console.error("❌ Assignment error:", error);
      console.error("❌ Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const errorMsg =
        error.response?.data?.message ||
        error.response?.statusText ||
        "Failed to add employee";
      toast.error(errorMsg);
    } finally {
      setInviting(null);
    }
  };

  // Manual refresh
  const handleManualRefresh = () => {
    console.log("🔄 Manual refresh triggered");
    toast.loading("Refreshing...", { duration: 1000 });
    fetchAvailableEmployees();
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-gray-500">Loading available employees...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Available Employees 👥
            </h2>
            <p className="text-gray-600">
              Employees who haven't joined any company yet. Add them directly to
              your team.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleManualRefresh}
              className="btn btn-ghost btn-sm gap-2"
              title="Manual Refresh"
            >
              🔄 Refresh
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Auto-updating every 10s
            </div>
            <span className="text-xs text-gray-400">
              Last: {lastFetched.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      <hr className="mb-6" />

      {/* Search Bar */}
      <div className="mb-6 flex gap-4 items-center flex-wrap">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          className="input input-bordered flex-1 max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="badge badge-primary badge-lg font-semibold">
          {filteredEmployees.length} Available
        </div>
      </div>

      {/* Employee List */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤷‍♀️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Available Employees
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "No employees match your search."
              : "All registered employees are already assigned to companies."}
          </p>
          {!searchTerm && (
            <p className="text-sm text-gray-400 mb-4">
              New registrations appear here automatically
            </p>
          )}

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border text-left max-w-md mx-auto">
            <p className="text-xs font-mono text-gray-600 mb-1">
              <strong>Debug Info:</strong>
            </p>
            <p className="text-xs font-mono text-gray-600">
              API: {debugInfo.apiUrl}
            </p>
            <p className="text-xs font-mono text-gray-600">
              Token: {debugInfo.tokenPresent ? "Present ✅" : "Missing ❌"}
            </p>
            <p className="text-xs font-mono text-gray-600">
              Count: {debugInfo.employeeCount} employees
            </p>
            <p className="text-xs font-mono text-gray-600">
              Last Fetch: {debugInfo.lastFetch}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((employee) => {
            const isNew =
              new Date() - new Date(employee.createdAt) < 5 * 60 * 1000;

            return (
              <div
                key={employee._id}
                className="card bg-base-100 border border-gray-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar online">
                      <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={
                            employee.profileImage ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              employee.name
                            )}&size=200`
                          }
                          alt={employee.name}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800">
                        {employee.name}
                      </h3>
                      <p className="text-sm text-gray-500 break-all">
                        {employee.email}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📅</span>
                      <span>
                        Joined:{" "}
                        {new Date(employee.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {employee.dateOfBirth && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>🎂</span>
                        <span>
                          Birthday:{" "}
                          {new Date(employee.dateOfBirth).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {/* New Badge */}
                    {isNew && (
                      <div className="badge badge-success badge-sm gap-1">
                        <span>✨</span> New User
                      </div>
                    )}
                  </div>

                  {/* Assign Button */}
                  <button
                    onClick={() => handleAssignEmployee(employee)}
                    disabled={inviting === employee.email}
                    className="btn btn-primary btn-sm w-full"
                  >
                    {inviting === employee.email ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Adding...
                      </>
                    ) : (
                      <>➕ Add to My Company</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1">How it works</h4>
            <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
              <li>Auto-checks for new employees every 10 seconds</li>
              <li>Shows employees not yet assigned to any company</li>
              <li>Click "Add to My Company" to assign instantly</li>
              <li>Uses one slot from your package limit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
