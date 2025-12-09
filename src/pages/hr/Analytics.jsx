import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { auth } from "../../firebase.config"; // Adjust path as needed

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assetTypeData, setAssetTypeData] = useState([]);
  const [topRequestedData, setTopRequestedData] = useState([]);

  // Colors for charts
  const PIE_COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];
  const BAR_COLOR = "#3B82F6";

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = await auth.currentUser.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/hr/analytics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch analytics");
      }

      const data = await response.json();

      // Transform asset types data for pie chart
      const transformedAssetTypes = data.assetTypes.map((item) => ({
        name: item._id || "Unknown",
        value: item.count,
      }));

      // Transform top requested data for bar chart
      const transformedTopRequested = data.topRequested.map((item) => ({
        name: item._id,
        count: item.count,
      }));

      setAssetTypeData(transformedAssetTypes);
      setTopRequestedData(transformedTopRequested);
      setError(null);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Custom label for pie chart
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="text-red-800 font-semibold text-lg">
              Error Loading Analytics
            </h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">📊 Analytics Dashboard</h2>
        <p className="text-blue-100">
          Insights into your asset management and requests
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-3xl">📦</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Asset Types</p>
              <p className="text-3xl font-bold text-gray-800">
                {assetTypeData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-3xl">📋</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Approved Requests</p>
              <p className="text-3xl font-bold text-gray-800">
                {topRequestedData.reduce((sum, item) => sum + item.count, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <span className="text-3xl">🏆</span>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Most Requested Asset</p>
              <p className="text-xl font-bold text-gray-800 truncate">
                {topRequestedData[0]?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Asset Type Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🥧 Asset Type Distribution
            </h3>
            <p className="text-gray-600 text-sm">
              Breakdown of returnable vs non-returnable items
            </p>
          </div>

          {assetTypeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="text-6xl">📭</span>
                <p className="mt-4">No asset data available</p>
              </div>
            </div>
          )}

          {/* Legend with counts */}
          <div className="mt-6 space-y-2">
            {assetTypeData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                    }}
                  ></div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Top 5 Requested Assets */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              📊 Top 5 Most Requested Assets
            </h3>
            <p className="text-gray-600 text-sm">
              Assets with the highest approval count
            </p>
          </div>

          {topRequestedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRequestedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill={BAR_COLOR} name="Request Count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <span className="text-6xl">📭</span>
                <p className="mt-4">No request data available</p>
              </div>
            </div>
          )}

          {/* Top assets list */}
          <div className="mt-6 space-y-2">
            {topRequestedData.slice(0, 5).map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-blue-600">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">{item.count}</span>
                  <span className="text-gray-500 text-sm">requests</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchAnalytics}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md flex items-center gap-2"
        >
          <span className="text-xl">🔄</span>
          Refresh Analytics
        </button>
      </div>
    </div>
  );
}
