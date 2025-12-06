// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// /* Public pages */
// import Home from "./pages/public/Home";
// import Login from "./pages/public/Login";
// import RegisterHR from "./pages/public/RegisterHR";
// import RegisterEmployee from "./pages/public/RegisterEmployee";
// import NotFound from "./pages/public/NotFound";

// /* Protected & Role routes */
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import HRRoute from "./components/common/HRRoute";

// /* HR pages */
// import HRDashboard from "./pages/hr/HRDashboard";
// import AssetList from "./pages/hr/AssetList";
// import AddAsset from "./pages/hr/AddAsset";
// import AllRequests from "./pages/hr/AllRequests";
// import Employees from "./pages/hr/Employees";
// import UpgradePackage from "./pages/hr/UpgradePackage";

// /* Employee pages */
// import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
// import MyAssets from "./pages/employee/MyAssets";
// import RequestAsset from "./pages/employee/RequestAsset";
// import MyTeam from "./pages/employee/MyTeam";
// import Profile from "./pages/employee/Profile";

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register/hr" element={<RegisterHR />} />
//           <Route path="/register/employee" element={<RegisterEmployee />} />

//           {/* any logged-in user */}
//           <Route element={<ProtectedRoute />}>
//             <Route path="/employee" element={<EmployeeDashboard />}>
//               <Route index element={<MyAssets />} />
//               <Route path="request" element={<RequestAsset />} />
//               <Route path="team" element={<MyTeam />} />
//               <Route path="profile" element={<Profile />} />
//             </Route>
//           </Route>

//           {/* HR-only */}
//           <Route element={<HRRoute />}>
//             <Route path="/hr" element={<HRDashboard />}>
//               <Route index element={<AssetList />} />
//               <Route path="add-asset" element={<AddAsset />} />
//               <Route path="requests" element={<AllRequests />} />
//               <Route path="employees" element={<Employees />} />
//               <Route path="upgrade" element={<UpgradePackage />} />
//             </Route>
//           </Route>

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// 2..................

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

/* Public pages */
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import RegisterHR from "./pages/public/RegisterHR";
import RegisterEmployee from "./pages/public/RegisterEmployee";
import NotFound from "./pages/public/NotFound";

/* Protected & Role routes */
import ProtectedRoute from "./components/common/ProtectedRoute";
import HRRoute from "./components/common/HRRoute";

/* HR pages */
import HRDashboard from "./pages/hr/HRDashboard";
import AssetList from "./pages/hr/AssetList";
import AddAsset from "./pages/hr/AddAsset";
import AllRequests from "./pages/hr/AllRequests";
import Employees from "./pages/hr/Employees";
import AvailableEmployees from "./pages/hr/AvailableEmployees"; // ✅ Import new component
import UpgradePackage from "./pages/hr/UpgradePackage";

/* Employee pages */
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyAssets from "./pages/employee/MyAssets";
import RequestAsset from "./pages/employee/RequestAsset";
import MyTeam from "./pages/employee/MyTeam";
import Profile from "./pages/employee/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/hr" element={<RegisterHR />} />
          <Route path="/register/employee" element={<RegisterEmployee />} />

          {/* any logged-in user */}
          <Route element={<ProtectedRoute />}>
            {/* FIX 1: Added /* to allow nested employee routes to match */}
            <Route path="/employee/*" element={<EmployeeDashboard />}>
              <Route index element={<MyAssets />} />
              <Route path="request" element={<RequestAsset />} />
              <Route path="team" element={<MyTeam />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* HR-only */}
          <Route element={<HRRoute />}>
            {/* FIX 2: Added /* to allow nested HR routes to match (This was the error from the log) */}
            <Route path="/hr/*" element={<HRDashboard />}>
              <Route index element={<AssetList />} />
              <Route path="add-asset" element={<AddAsset />} />
              <Route path="requests" element={<AllRequests />} />
              <Route path="employees" element={<Employees />} />
              <Route
                path="available-employees"
                element={<AvailableEmployees />}
              />{" "}
              {/* ✅ New AvailableEmployees route is correctly defined */}
              <Route path="upgrade" element={<UpgradePackage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
