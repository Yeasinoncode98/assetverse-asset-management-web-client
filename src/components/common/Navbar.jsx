// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const { user, appUser, logout } = useAuth();
//   const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLinkClick = () => {
//     setIsMobileMenuOpen(false);
//     setShowRegisterDropdown(false);
//   };

//   // --- Register Dropdown Content (for desktop) ---
//   const registerDropdownContent = (
//     <ul
//       tabIndex={0}
//       className="menu p-2 shadow bg-white rounded-box w-48 z-50 border border-gray-100"
//     >
//       <li>
//         <Link to="/register/hr" onClick={handleLinkClick}>
//           Register as HR
//         </Link>
//       </li>
//       <li>
//         <Link to="/register/employee" onClick={handleLinkClick}>
//           Register as Employee
//         </Link>
//       </li>
//     </ul>
//   );

//   // --- DESKTOP Register Dropdown ---
//   const desktopRegisterDropdown = (
//     <div className="dropdown dropdown-end">
//       <label
//         tabIndex={0}
//         className="btn btn-ghost btn-sm flex items-center gap-1"
//       >
//         Register
//         <svg
//           className="w-4 h-4"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </label>
//       <div className="dropdown-content mt-2">{registerDropdownContent}</div>
//     </div>
//   );

//   // --- Public Nav Links ---
//   const publicLinks = (
//     <>
//       <Link to="/" className="btn btn-ghost btn-sm" onClick={handleLinkClick}>
//         Home
//       </Link>
//       <Link
//         to="/about-us"
//         className="btn btn-ghost btn-sm"
//         onClick={handleLinkClick}
//       >
//         About-Us
//       </Link>
//     </>
//   );

//   // --- Authenticated User Dropdown (DESKTOP ONLY) ---
//   const authUserSection = (
//     <div className="dropdown dropdown-end w-full md:w-auto">
//       <label
//         tabIndex={0}
//         className="btn btn-ghost normal-case btn-sm w-full md:w-auto justify-start md:justify-center"
//       >
//         {user?.displayName || user?.email}
//       </label>
//       <ul
//         tabIndex={0}
//         className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full md:w-52 mt-2"
//       >
//         {appUser?.role === "hr" ? (
//           <li>
//             <Link to="/hr" onClick={handleLinkClick}>
//               HR Dashboard
//             </Link>
//           </li>
//         ) : (
//           <li>
//             <Link to="/employee" onClick={handleLinkClick}>
//               Employee Dashboard
//             </Link>
//           </li>
//         )}
//         <li>
//           <button
//             onClick={() => {
//               logout();
//               handleLinkClick();
//             }}
//           >
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );

//   return (
//     <nav className="bg-white shadow sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
//         {/* === HEADER ROW (Logo + Mobile Toggle) === */}
//         <div className="flex justify-between items-center w-full md:w-auto">
//           <Link to="/" className="text-2xl font-bold">
//             AssetVerse
//           </Link>

//           <button
//             className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
//             onClick={() => {
//               setIsMobileMenuOpen(!isMobileMenuOpen);
//             }}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* === DESKTOP NAVIGATION === */}
//         <div className="hidden md:flex items-center gap-3">
//           {publicLinks}
//           {!user ? (
//             <>
//               {desktopRegisterDropdown}
//               <Link
//                 to="/login"
//                 className="btn btn-primary btn-sm"
//                 onClick={handleLinkClick}
//               >
//                 Login
//               </Link>
//             </>
//           ) : (
//             authUserSection
//           )}
//         </div>

//         {/* === MOBILE NAVIGATION === */}
//         <div
//           className={`w-full ${
//             isMobileMenuOpen ? "block" : "hidden"
//           } md:hidden mt-3 pt-3 border-t border-gray-200 flex flex-col`}
//         >
//           {/* Home and AboutUs */}
//           <Link
//             to="/"
//             className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//             onClick={handleLinkClick}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about-us"
//             className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//             onClick={handleLinkClick}
//           >
//             AboutUs
//           </Link>

//           {!user ? (
//             <>
//               {/* Guest User - Register Options + Login */}
//               <div className="flex flex-col">
//                 <Link
//                   to="/register/hr"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100 mt-2 border-t border-gray-200"
//                   onClick={handleLinkClick}
//                 >
//                   Register as HR
//                 </Link>
//                 <Link
//                   to="/register/employee"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//                   onClick={handleLinkClick}
//                 >
//                   Register as Employee
//                 </Link>

//                 <Link
//                   to="/login"
//                   className="btn btn-primary btn-sm w-full justify-center mt-3"
//                   onClick={handleLinkClick}
//                 >
//                   Login
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Logged In User - Direct Links (No Dropdown) */}
//               <hr className="my-2 border-gray-200" />

//               {/* User Name */}
//               <div className="block py-2 text-center text-gray-700 font-semibold">
//                 {user?.displayName || user?.email}
//               </div>

//               {/* Dashboard Link */}
//               {appUser?.role === "hr" ? (
//                 <Link
//                   to="/hr"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//                   onClick={handleLinkClick}
//                 >
//                   HR Dashboard
//                 </Link>
//               ) : (
//                 <Link
//                   to="/employee"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//                   onClick={handleLinkClick}
//                 >
//                   Employee Dashboard
//                 </Link>
//               )}

//               {/* Logout Button */}
//               <button
//                 onClick={() => {
//                   logout();
//                   handleLinkClick();
//                 }}
//                 className="block py-2 text-center text-red-600 hover:bg-gray-100 w-full"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// 2...................... 2nd added code for profile ..............

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { Menu, X, User } from "lucide-react";

// export default function Navbar() {
//   const { user, appUser, logout } = useAuth();
//   const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLinkClick = () => {
//     setIsMobileMenuOpen(false);
//     setShowRegisterDropdown(false);
//   };

//   // --- Register Dropdown Content (for desktop) ---
//   const registerDropdownContent = (
//     <ul
//       tabIndex={0}
//       className="menu p-2 shadow bg-white rounded-box w-48 z-50 border border-gray-100"
//     >
//       <li>
//         <Link to="/register/hr" onClick={handleLinkClick}>
//           Register as HR
//         </Link>
//       </li>
//       <li>
//         <Link to="/register/employee" onClick={handleLinkClick}>
//           Register as Employee
//         </Link>
//       </li>
//     </ul>
//   );

//   // --- DESKTOP Register Dropdown ---
//   const desktopRegisterDropdown = (
//     <div className="dropdown dropdown-end">
//       <label
//         tabIndex={0}
//         className="btn btn-ghost btn-sm flex items-center gap-1"
//       >
//         Register
//         <svg
//           className="w-4 h-4"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </label>
//       <div className="dropdown-content mt-2">{registerDropdownContent}</div>
//     </div>
//   );

//   // --- Public Nav Links ---
//   const publicLinks = (
//     <>
//       <Link to="/" className="btn btn-ghost btn-sm" onClick={handleLinkClick}>
//         Home
//       </Link>
//       <Link
//         to="/about-us"
//         className="btn btn-ghost btn-sm"
//         onClick={handleLinkClick}
//       >
//         About-Us
//       </Link>
//     </>
//   );

//   // --- Profile Image Component ---
//   const ProfileImage = ({ size = "w-8 h-8" }) => {
//     if (user?.photoURL) {
//       return (
//         <img
//           src={user.photoURL}
//           alt="Profile"
//           className={`${size} rounded-full object-cover border-2 border-gray-200`}
//         />
//       );
//     }
//     // Fallback to icon if no photo
//     return (
//       <div
//         className={`${size} rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300`}
//       >
//         <User className="w-5 h-5 text-gray-600" />
//       </div>
//     );
//   };

//   // --- Authenticated User Dropdown (DESKTOP ONLY) ---
//   const authUserSection = (
//     <div className="dropdown dropdown-end w-full md:w-auto">
//       <label
//         tabIndex={0}
//         className="btn btn-ghost normal-case btn-sm w-full md:w-auto justify-start md:justify-center flex items-center gap-2"
//       >
//         <span>{user?.displayName || user?.email}</span>
//         <ProfileImage />
//       </label>
//       <ul
//         tabIndex={0}
//         className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full md:w-52 mt-2"
//       >
//         {appUser?.role === "hr" ? (
//           <li>
//             <Link to="/hr" onClick={handleLinkClick}>
//               HR Dashboard
//             </Link>
//           </li>
//         ) : (
//           <li>
//             <Link to="/employee" onClick={handleLinkClick}>
//               Employee Dashboard
//             </Link>
//           </li>
//         )}
//         <li>
//           <button
//             onClick={() => {
//               logout();
//               handleLinkClick();
//             }}
//           >
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );

//   return (
//     <nav className="bg-white shadow sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
//         {/* === HEADER ROW (Logo + Mobile Toggle) === */}
//         <div className="flex justify-between items-center w-full md:w-auto">
//           <Link to="/" className="text-2xl font-bold">
//             AssetVerse
//           </Link>

//           <button
//             className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
//             onClick={() => {
//               setIsMobileMenuOpen(!isMobileMenuOpen);
//             }}
//             aria-label="Toggle Menu"
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </button>
//         </div>

//         {/* === DESKTOP NAVIGATION === */}
//         <div className="hidden md:flex items-center gap-3">
//           {publicLinks}
//           {!user ? (
//             <>
//               {desktopRegisterDropdown}
//               <Link
//                 to="/login"
//                 className="btn btn-primary btn-sm"
//                 onClick={handleLinkClick}
//               >
//                 Login
//               </Link>
//             </>
//           ) : (
//             authUserSection
//           )}
//         </div>

//         {/* === MOBILE NAVIGATION === */}
//         <div
//           className={`w-full ${
//             isMobileMenuOpen ? "block" : "hidden"
//           } md:hidden mt-3 pt-3 border-t border-gray-200 flex flex-col`}
//         >
//           {/* Home and AboutUs */}
//           <Link
//             to="/"
//             className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//             onClick={handleLinkClick}
//           >
//             Home
//           </Link>
//           <Link
//             to="/about-us"
//             className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//             onClick={handleLinkClick}
//           >
//             AboutUs
//           </Link>

//           {!user ? (
//             <>
//               {/* Guest User - Register Options + Login */}
//               <div className="flex flex-col">
//                 <Link
//                   to="/register/hr"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100 mt-2 border-t border-gray-200"
//                   onClick={handleLinkClick}
//                 >
//                   Register as HR
//                 </Link>
//                 <Link
//                   to="/register/employee"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//                   onClick={handleLinkClick}
//                 >
//                   Register as Employee
//                 </Link>

//                 <Link
//                   to="/login"
//                   className="btn btn-primary btn-sm w-full justify-center mt-3"
//                   onClick={handleLinkClick}
//                 >
//                   Login
//                 </Link>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Logged In User - Direct Links (No Dropdown) */}
//               <hr className="my-2 border-gray-200" />

//               {/* User Name with Profile Image */}
//               <div className="flex items-center justify-center gap-2 py-2">
//                 <span className="text-gray-700 font-semibold">
//                   {user?.displayName || user?.email}
//                 </span>
//                 <ProfileImage />
//               </div>

//               {/* Dashboard Link */}
//               {appUser?.role === "hr" ? (
//                 <Link
//                   to="/hr"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//                   onClick={handleLinkClick}
//                 >
//                   HR Dashboard
//                 </Link>
//               ) : (
//                 <Link
//                   to="/employee"
//                   className="block py-2 text-center text-gray-700 hover:bg-gray-100"
//                   onClick={handleLinkClick}
//                 >
//                   Employee Dashboard
//                 </Link>
//               )}

//               {/* Logout Button */}
//               <button
//                 onClick={() => {
//                   logout();
//                   handleLinkClick();
//                 }}
//                 className="block py-2 text-center text-red-600 hover:bg-gray-100 w-full"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// ...............3 sudden updatefor the profile image ...................

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const { user, appUser, logout } = useAuth();
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setShowRegisterDropdown(false);
  };

  // --- Register Dropdown Content (for desktop) ---
  const registerDropdownContent = (
    <ul
      tabIndex={0}
      className="menu p-2 shadow bg-white rounded-box w-48 z-50 border border-gray-100"
    >
      <li>
        <Link to="/register/hr" onClick={handleLinkClick}>
          Register as HR
        </Link>
      </li>
      <li>
        <Link to="/register/employee" onClick={handleLinkClick}>
          Register as Employee
        </Link>
      </li>
    </ul>
  );

  // --- DESKTOP Register Dropdown ---
  const desktopRegisterDropdown = (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
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
      </label>
      <div className="dropdown-content mt-2">{registerDropdownContent}</div>
    </div>
  );

  // --- Public Nav Links ---
  const publicLinks = (
    <>
      <Link to="/" className="btn btn-ghost btn-sm" onClick={handleLinkClick}>
        Home
      </Link>
      <Link
        to="/about-us"
        className="btn btn-ghost btn-sm"
        onClick={handleLinkClick}
      >
        About-Us
      </Link>
    </>
  );

  // --- Profile Image Component (UPDATED to use appUser.profileImage) ---
  const ProfileImage = ({ size = "w-8 h-8" }) => {
    // Use profileImage from MongoDB (appUser) instead of Firebase photoURL
    const profileImageUrl = appUser?.profileImage || user?.photoURL;

    if (profileImageUrl) {
      return (
        <img
          src={profileImageUrl}
          alt="Profile"
          className={`${size} rounded-full object-cover border-2 border-gray-200`}
          onError={(e) => {
            // Fallback if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      );
    }
    // Fallback to icon if no photo
    return (
      <div
        className={`${size} rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300`}
      >
        <User className="w-5 h-5 text-gray-600" />
      </div>
    );
  };

  // --- Authenticated User Dropdown (DESKTOP ONLY) ---
  const authUserSection = (
    <div className="dropdown dropdown-end w-full md:w-auto">
      <label
        tabIndex={0}
        className="btn btn-ghost normal-case btn-sm w-full md:w-auto justify-start md:justify-center flex items-center gap-2"
      >
        <span>{appUser?.name || user?.displayName || user?.email}</span>
        <ProfileImage />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full md:w-52 mt-2"
      >
        {appUser?.role === "hr" ? (
          <li>
            <Link to="/hr" onClick={handleLinkClick}>
              HR Dashboard
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/employee" onClick={handleLinkClick}>
              Employee Dashboard
            </Link>
          </li>
        )}
        <li>
          <button
            onClick={() => {
              logout();
              handleLinkClick();
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        {/* === HEADER ROW (Logo + Mobile Toggle) === */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold">
            AssetVerse
          </Link>

          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* === DESKTOP NAVIGATION === */}
        <div className="hidden md:flex items-center gap-3">
          {publicLinks}
          {!user ? (
            <>
              {desktopRegisterDropdown}
              <Link
                to="/login"
                className="btn btn-primary btn-sm"
                onClick={handleLinkClick}
              >
                Login
              </Link>
            </>
          ) : (
            authUserSection
          )}
        </div>

        {/* === MOBILE NAVIGATION === */}
        <div
          className={`w-full ${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden mt-3 pt-3 border-t border-gray-200 flex flex-col`}
        >
          {/* Home and AboutUs */}
          <Link
            to="/"
            className="block py-2 text-center text-gray-700 hover:bg-gray-100"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            to="/about-us"
            className="block py-2 text-center text-gray-700 hover:bg-gray-100"
            onClick={handleLinkClick}
          >
            AboutUs
          </Link>

          {!user ? (
            <>
              {/* Guest User - Register Options + Login */}
              <div className="flex flex-col">
                <Link
                  to="/register/hr"
                  className="block py-2 text-center text-gray-700 hover:bg-gray-100 mt-2 border-t border-gray-200"
                  onClick={handleLinkClick}
                >
                  Register as HR
                </Link>
                <Link
                  to="/register/employee"
                  className="block py-2 text-center text-gray-700 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Register as Employee
                </Link>

                <Link
                  to="/login"
                  className="btn btn-primary btn-sm w-full justify-center mt-3"
                  onClick={handleLinkClick}
                >
                  Login
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Logged In User - Direct Links (No Dropdown) */}
              <hr className="my-2 border-gray-200" />

              {/* User Name with Profile Image */}
              <div className="flex items-center justify-center gap-2 py-2">
                <span className="text-gray-700 font-semibold">
                  {appUser?.name || user?.displayName || user?.email}
                </span>
                <ProfileImage />
              </div>

              {/* Dashboard Link */}
              {appUser?.role === "hr" ? (
                <Link
                  to="/hr"
                  className="block py-2 text-center text-gray-700 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  HR Dashboard
                </Link>
              ) : (
                <Link
                  to="/employee"
                  className="block py-2 text-center text-gray-700 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Employee Dashboard
                </Link>
              )}

              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  handleLinkClick();
                }}
                className="block py-2 text-center text-red-600 hover:bg-gray-100 w-full"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
