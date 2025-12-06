// import React from "react";

// export default function EmployeeCard({ employee, onRemove, isRemoving }) {
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
//       <div className="p-6">
//         {/* Employee Photo and Name */}
//         <div className="flex items-center gap-4 mb-4">
//           <div className="avatar">
//             <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//               <img
//                 src={
//                   employee.profileImage ||
//                   employee.photo ||
//                   `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                     employee.name
//                   )}&size=200&background=4F46E5&color=fff`
//                 }
//                 alt={employee.name}
//                 onError={(e) => {
//                   e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                     employee.name
//                   )}&size=200&background=4F46E5&color=fff`;
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex-1">
//             <h3 className="font-bold text-lg text-gray-800">{employee.name}</h3>
//             <p className="text-sm text-gray-500">{employee.email}</p>
//           </div>
//         </div>

//         {/* Employee Details */}
//         <div className="space-y-3 mb-4">
//           <div className="flex items-center gap-2 text-sm">
//             <svg
//               className="w-5 h-5 text-blue-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             <span className="text-gray-600">
//               Joined:{" "}
//               <span className="font-medium text-gray-800">
//                 {formatDate(employee.joinDate)}
//               </span>
//             </span>
//           </div>

//           <div className="flex items-center gap-2 text-sm">
//             <svg
//               className="w-5 h-5 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
//               />
//             </svg>
//             <span className="text-gray-600">
//               Assets:{" "}
//               <span className="font-bold text-green-600">
//                 {employee.assetsCount || 0}
//               </span>
//             </span>
//           </div>

//           {employee.dateOfBirth && (
//             <div className="flex items-center gap-2 text-sm">
//               <svg
//                 className="w-5 h-5 text-purple-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
//                 />
//               </svg>
//               <span className="text-gray-600">
//                 Birthday:{" "}
//                 <span className="font-medium text-gray-800">
//                   {formatDate(employee.dateOfBirth)}
//                 </span>
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Asset Badge */}
//         {employee.assetsCount > 0 ? (
//           <div className="mb-4">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Active Employee
//             </span>
//           </div>
//         ) : (
//           <div className="mb-4">
//             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
//               <svg
//                 className="w-4 h-4 mr-1"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               No Assets
//             </span>
//           </div>
//         )}

//         {/* Actions */}
//         <div className="pt-4 border-t border-gray-200">
//           <button
//             onClick={() => onRemove(employee.email, employee.name)}
//             disabled={isRemoving}
//             className="w-full btn btn-sm btn-outline btn-error hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isRemoving ? (
//               <>
//                 <span className="loading loading-spinner loading-xs"></span>
//                 Removing...
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                   />
//                 </svg>
//                 Remove from Team
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 2...................

import React from "react";

export default function EmployeeCard({
  employee,
  onRemove,
  isRemoving,
  onAssignAsset,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        {/* Employee Photo and Name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  employee.profileImage ||
                  employee.photo ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    employee.name
                  )}&size=200&background=4F46E5&color=fff`
                }
                alt={employee.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    employee.name
                  )}&size=200&background=4F46E5&color=fff`;
                }}
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.email}</p>
          </div>
        </div>

        {/* Employee Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <svg
              className="w-5 h-5 text-blue-600"
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
            <span className="text-gray-600">
              Joined:{" "}
              <span className="font-medium text-gray-800">
                {formatDate(employee.joinDate)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-gray-600">
              Assets:{" "}
              <span className="font-bold text-green-600">
                {employee.assetsCount || 0}
              </span>
            </span>
          </div>

          {employee.dateOfBirth && (
            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
              <span className="text-gray-600">
                Birthday:{" "}
                <span className="font-medium text-gray-800">
                  {formatDate(employee.dateOfBirth)}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Asset Badge */}
        {employee.assetsCount > 0 ? (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Active Employee
            </span>
          </div>
        ) : (
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              No Assets
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          {/* ✅ NEW: Assign Asset Button */}
          <button
            onClick={() => onAssignAsset && onAssignAsset(employee)}
            className="w-full btn btn-sm btn-primary gap-2"
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            Assign Asset
          </button>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(employee.email, employee.name)}
            disabled={isRemoving}
            className="w-full btn btn-sm btn-outline btn-error hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRemoving ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Removing...
              </>
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
                Remove from Team
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
