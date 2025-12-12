import React, { useState, useEffect } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";
import EmployeeCard from "./components/EmployeeCard";
import AssignAssetModal from "../hr/AssignAssetModal"; // ✅ Import the modal

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageLimit, setPackageLimit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [removeLoading, setRemoveLoading] = useState(null);

  // ✅ Modal state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/hr/employees");

      setEmployees(response.data.employees || []);
      setPackageLimit(response.data.packageLimit || 5);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to load employees");
      setLoading(false);
    }
  };

  const handleRemove = async (employeeEmail, employeeName) => {
    if (
      !window.confirm(
        `Are you sure you want to remove ${employeeName} from the team? All their assigned assets will be returned.`
      )
    ) {
      return;
    }

    setRemoveLoading(employeeEmail);
    try {
      await axios.delete(`/hr/employees/${employeeEmail}`);

      toast.success(`${employeeName} has been removed from the team`);
      fetchEmployees(); // Refresh the list
    } catch (error) {
      console.error("Error removing employee:", error);
      toast.error(error.response?.data?.message || "Failed to remove employee");
    } finally {
      setRemoveLoading(null);
    }
  };

  // ✅ Handle opening assign asset modal
  const handleOpenAssignModal = (employee) => {
    setSelectedEmployee(employee);
    setShowAssignModal(true);
  };

  // ✅ Handle closing modal
  const handleCloseAssignModal = () => {
    setShowAssignModal(false);
    setSelectedEmployee(null);
  };

  // ✅ Handle successful assignment
  const handleAssignSuccess = () => {
    fetchEmployees(); // Refresh employee list to update asset counts
  };

  // Filter employees by search term
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usedSlots = employees.length;
  const percentageUsed = (usedSlots / packageLimit) * 100;
  const isLimitReached = usedSlots >= packageLimit;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-black">My Employees</h2>
          <p className="text-green-500 mt-1">
            Manage your team members and assign assets
          </p>
        </div>
      </div>

      {/* Employee Count Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6 mb-8 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg opacity-90">Employee Slots Used</p>
            <p className="text-4xl font-bold">
              {usedSlots} / {packageLimit}
            </p>
            <p className="text-sm opacity-75 mt-1">
              {packageLimit - usedSlots} slots remaining
            </p>
          </div>
          <div className="text-6xl opacity-80">👥</div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              percentageUsed >= 90 ? "bg-red-300" : "bg-white"
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-sm opacity-90">
          <span>{percentageUsed.toFixed(0)}% used</span>
          {isLimitReached ? (
            <span className="font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
              ⚠️ Limit reached - Upgrade package!
            </span>
          ) : percentageUsed >= 80 ? (
            <span className="font-semibold">⚠️ Almost full</span>
          ) : null}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Employees
              </p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {employees.length}
              </p>
            </div>
            <div className="text-4xl">👨‍💼</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">With Assets</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {employees.filter((e) => e.assetsCount > 0).length}
              </p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Available Slots
              </p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {Math.max(0, packageLimit - usedSlots)}
              </p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {employees.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search employees by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full max-w-md"
          />
        </div>
      )}

      {/* Employees List */}
      {loading ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading employees...</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-gray-500 text-xl font-semibold mb-2">
            No employees in your team yet
          </p>
          <p className="text-gray-400 mb-6">
            Employees will appear here once they join your company by requesting
            assets
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Employees automatically join your team
              when you approve their first asset request
            </p>
          </div>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 text-lg">
            No employees found matching "{searchTerm}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee._id || employee.email}
              employee={employee}
              onRemove={handleRemove}
              isRemoving={removeLoading === employee.email}
              onAssignAsset={handleOpenAssignModal} // ✅ Pass callback
            />
          ))}
        </div>
      )}

      {/* Warning if limit is reached */}
      {isLimitReached && (
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">
                Employee Limit Reached
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                You've reached your maximum employee limit of {packageLimit}. To
                add more employees, please upgrade your package.
              </p>
              <button className="btn btn-sm bg-yellow-600 hover:bg-yellow-700 text-white">
                Upgrade Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      {employees.length > 0 && (
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
                Employee Management Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Employees join automatically when you approve their first
                    asset request
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    You can directly assign assets to employees without waiting
                    for requests
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Removing an employee will return all their assigned assets
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Monitor your employee count to stay within your package
                    limit
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    Upgrade your package anytime to add more employees
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Assign Asset Modal */}
      {showAssignModal && selectedEmployee && (
        <AssignAssetModal
          employee={selectedEmployee}
          onClose={handleCloseAssignModal}
          onSuccess={handleAssignSuccess}
        />
      )}
    </div>
  );
}
