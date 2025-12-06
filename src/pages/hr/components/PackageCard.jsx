// import React from "react";

// export default function PackageCard({ packageInfo, onSelect }) {
//   return (
//     <div className="card bg-base-100 shadow-lg p-6 flex flex-col justify-between">
//       <div className="mb-4 text-center">
//         <h3 className="text-xl font-bold">{packageInfo.name}</h3>
//         <p className="text-gray-500 mt-1">
//           Employee Limit: {packageInfo.employeeLimit}
//         </p>
//         <p className="text-primary text-2xl font-bold mt-2">
//           ${packageInfo.price}
//         </p>
//       </div>

//       <ul className="mb-4 space-y-1">
//         {packageInfo.features.map((feat, index) => (
//           <li key={index} className="flex items-center gap-2">
//             <span className="text-green-500 font-bold">✔</span> {feat}
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={() => onSelect(packageInfo)}
//         className="btn btn-primary w-full mt-auto"
//       >
//         Upgrade
//       </button>
//     </div>
//   );
// }

// 2.............AbortController

// src/pages/hr/components/PackageCard.jsx
import React from "react";

export default function PackageCard({
  package: pkg,
  currentPackage,
  loading,
  onPurchase,
}) {
  const isCurrentPackage = currentPackage === pkg.employeeLimit;
  const isDowngrade = currentPackage > pkg.employeeLimit;

  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        pkg.popular ? "ring-2 ring-indigo-500 transform scale-105" : ""
      } ${isCurrentPackage ? "ring-2 ring-green-500" : ""}`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
          MOST POPULAR
        </div>
      )}

      {/* Current Package Badge */}
      {isCurrentPackage && (
        <div className="absolute top-0 left-0 bg-green-500 text-white px-4 py-1 text-xs font-bold rounded-br-lg">
          CURRENT PLAN
        </div>
      )}

      <div className="p-6">
        {/* Package Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
          <div className="flex items-baseline justify-center">
            <span className="text-4xl font-extrabold text-gray-900">
              ${pkg.price}
            </span>
            <span className="text-gray-500 ml-2">/month</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Up to {pkg.employeeLimit} employees
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          {pkg.features?.map((feature, index) => (
            <div key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onPurchase(pkg)}
          disabled={loading || isCurrentPackage}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
            isCurrentPackage
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : pkg.popular
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
              : "bg-gray-800 text-white hover:bg-gray-900"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : isCurrentPackage ? (
            "Current Plan"
          ) : isDowngrade ? (
            "Downgrade"
          ) : (
            "Upgrade Now"
          )}
        </button>

        {isDowngrade && !isCurrentPackage && (
          <p className="text-xs text-orange-600 text-center mt-2">
            ⚠️ This will reduce your employee limit
          </p>
        )}
      </div>
    </div>
  );
}
