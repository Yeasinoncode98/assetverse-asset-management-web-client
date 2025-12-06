// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function Navbar() {
//   const { user, appUser, logout } = useAuth();
//   return (
//     <nav className="bg-white shadow">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">
//           AssetVerse
//         </Link>
//         <div className="flex items-center gap-3">
//           <Link to="/" className="btn btn-ghost btn-sm">
//             Home
//           </Link>
//           {!user ? (
//             <>
//               <Link to="/login" className="btn btn-primary btn-sm">
//                 Login
//               </Link>
//             </>
//           ) : (
//             <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="btn btn-ghost normal-case">
//                 {user.displayName || user.email}
//               </label>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
//               >
//                 {appUser?.role === "hr" ? (
//                   <li>
//                     <Link to="/hr">HR Dashboard</Link>
//                   </li>
//                 ) : (
//                   <li>
//                     <Link to="/employee">Employee Dashboard</Link>
//                   </li>
//                 )}
//                 <li>
//                   <button onClick={logout}>Logout</button>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, appUser, logout } = useAuth();
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          AssetVerse
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/" className="btn btn-ghost btn-sm">
            Home
          </Link>
          {!user ? (
            <>
              {/* Register Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowRegisterDropdown(!showRegisterDropdown)}
                  className="btn btn-ghost btn-sm flex items-center gap-1"
                >
                  Register
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showRegisterDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <Link
                      to="/register/hr"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setShowRegisterDropdown(false)}
                    >
                      Register as HR
                    </Link>
                    <Link
                      to="/register/employee"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setShowRegisterDropdown(false)}
                    >
                      Register as Employee
                    </Link>
                  </div>
                )}
              </div>

              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost normal-case">
                {user.displayName || user.email}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {appUser?.role === "hr" ? (
                  <li>
                    <Link to="/hr">HR Dashboard</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/employee">Employee Dashboard</Link>
                  </li>
                )}
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
