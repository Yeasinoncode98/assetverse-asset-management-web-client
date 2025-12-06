// import React from "react";

// export default function AssetTable({ assets, onDelete }) {
//   return (
//     <table className="table w-full">
//       <thead>
//         <tr>
//           <th>Image</th>
//           <th>Name</th>
//           <th>Type</th>
//           <th>Quantity</th>
//           <th>Date Added</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {assets.map((asset) => (
//           <tr key={asset._id}>
//             <td>
//               <img src={asset.productImage} alt="" className="w-16 h-16" />
//             </td>
//             <td>{asset.productName}</td>
//             <td>{asset.productType}</td>
//             <td>{asset.productQuantity}</td>
//             <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
//             <td>
//               <button
//                 className="btn btn-sm btn-error"
//                 onClick={() => onDelete(asset._id)}
//               >
//                 Delete
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// 2.

import React from "react";

export default function AssetTable({ assets, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left">Image</th>
              <th className="text-left">Name</th>
              <th className="text-left">Type</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Date Added</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50 transition">
                {/* Asset Image */}
                <td>
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                </td>

                {/* Asset Name */}
                <td>
                  <span className="font-semibold text-gray-800">
                    {asset.name}
                  </span>
                </td>

                {/* Asset Type */}
                <td>
                  <span
                    className={`badge ${
                      asset.type === "Returnable"
                        ? "badge-primary"
                        : "badge-secondary"
                    }`}
                  >
                    {asset.type}
                  </span>
                </td>

                {/* Quantity */}
                <td>
                  <span className="font-bold text-lg text-gray-800">
                    {asset.quantity}
                  </span>
                </td>

                {/* Date Added */}
                <td>
                  <span className="text-gray-600">
                    {new Date(asset.dateAdded).toLocaleDateString()}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(asset.id)}
                      className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                      title="Edit Asset"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(asset.id)}
                      className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                      title="Delete Asset"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
