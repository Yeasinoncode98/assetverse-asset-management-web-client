// import React, { useState } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import AssetList from "./AssetList";
// import AddAsset from "./AddAsset";
// import AllRequests from "./AllRequests";
// import Employees from "./Employees";
// import AvailableEmployees from "./AvailableEmployees";
// import ProfileHr from "./ProfileHr"; // ✅ Import HR Profile component
// import UpgradePackage from "./UpgradePackage";

// export default function HRDashboard() {
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navItems = [
//     { path: "/hr", label: "Asset List", icon: "📦" },
//     { path: "/hr/add-asset", label: "Add Asset", icon: "➕" },
//     { path: "/hr/requests", label: "All Requests", icon: "📋" },
//     { path: "/hr/employees", label: "My Employees", icon: "👥" },
//     {
//       path: "/hr/available-employees",
//       label: "Available Employees",
//       icon: "🔍",
//     },
//     // ✅ ADD: HR Profile navigation item
//     {
//       path: "/hr/profile",
//       label: "HR Profile",
//       icon: "👔",
//     },
//     { path: "/hr/upgrade", label: "Upgrade Package", icon: "⬆️" },
//   ];

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top Navbar */}
//       <nav className="bg-white shadow-md sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               {/* Mobile Menu Button */}
//               <button
//                 onClick={toggleMobileMenu}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//                 aria-label="Toggle menu"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   {isMobileMenuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   )}
//                 </svg>
//               </button>
//               <h1 className="text-2xl font-bold text-blue-600">HR Dashboard</h1>
//             </div>
//             <Link to="/" className="btn btn-ghost btn-sm">
//               Back to Home
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <div className="flex relative">
//         {/* Mobile Overlay */}
//         {isMobileMenuOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
//             onClick={closeMobileMenu}
//           />
//         )}

//         {/* Sidebar */}
//         <aside
//           className={`
//             fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)]
//             w-64 bg-white shadow-lg z-40
//             transform transition-transform duration-300 ease-in-out
//             ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//             lg:translate-x-0
//           `}
//         >
//           <nav className="p-4">
//             <ul className="space-y-2">
//               {navItems.map((item) => (
//                 <li key={item.path}>
//                   <Link
//                     to={item.path}
//                     onClick={closeMobileMenu}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
//                       location.pathname === item.path
//                         ? "bg-blue-600 text-white"
//                         : "hover:bg-gray-100 text-gray-700"
//                     }`}
//                   >
//                     <span className="text-xl">{item.icon}</span>
//                     <span className="font-medium">{item.label}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <Routes>
//             <Route path="/" element={<AssetList />} />
//             <Route path="/add-asset" element={<AddAsset />} />
//             <Route path="/requests" element={<AllRequests />} />
//             <Route path="/employees" element={<Employees />} />
//             <Route
//               path="/available-employees"
//               element={<AvailableEmployees />}
//             />
//             {/* ✅ ADD: HR Profile route */}
//             <Route path="/profile" element={<ProfileHr />} />
//             <Route path="/upgrade" element={<UpgradePackage />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// 2.............................Analytics
import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import AssetList from "./AssetList";
import AddAsset from "./AddAsset";
import AllRequests from "./AllRequests";
import Employees from "./Employees";
import AvailableEmployees from "./AvailableEmployees";
import ProfileHr from "./ProfileHr";
import Analytics from "./Analytics"; // ✅ Import Analytics component
import UpgradePackage from "./UpgradePackage";

export default function HRDashboard() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/hr", label: "Asset List", icon: "📦" },
    { path: "/hr/add-asset", label: "Add Asset", icon: "➕" },
    { path: "/hr/requests", label: "All Requests", icon: "📋" },
    { path: "/hr/employees", label: "My Employees", icon: "👥" },
    {
      path: "/hr/available-employees",
      label: "Available Employees",
      icon: "🔍",
    },
    {
      path: "/hr/profile",
      label: "HR Profile",
      icon: "👔",
    },
    // ✅ ADD: Analytics navigation item
    {
      path: "/hr/analytics",
      label: "Analytics",
      icon: "📊",
    },
    { path: "/hr/upgrade", label: "Upgrade Package", icon: "⬆️" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-blue-600">HR Dashboard</h1>
            </div>
            <Link to="/" className="btn btn-ghost btn-sm">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)]
            w-64 bg-white shadow-lg z-40
            transform transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AssetList />} />
            <Route path="/add-asset" element={<AddAsset />} />
            <Route path="/requests" element={<AllRequests />} />
            <Route path="/employees" element={<Employees />} />
            <Route
              path="/available-employees"
              element={<AvailableEmployees />}
            />
            <Route path="/profile" element={<ProfileHr />} />
            {/* ✅ ADD: Analytics route */}
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/upgrade" element={<UpgradePackage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
