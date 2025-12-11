// import React, { useState } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import MyAssets from "./MyAssets";
// import RequestAsset from "./RequestAsset";
// import MyTeam from "./MyTeam";
// import Profile from "./Profile";

// export default function EmployeeDashboard() {
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navItems = [
//     { path: "/employee", label: "My Assets", icon: "📦" },
//     { path: "/employee/request", label: "Request Asset", icon: "📝" },
//     { path: "/employee/team", label: "My Team", icon: "👥" },
//     { path: "/employee/profile", label: "Profile", icon: "👤" },
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
//               <h1 className="text-2xl font-bold text-blue-600">
//                 Employee Dashboard
//               </h1>
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
//             <Route path="/" element={<MyAssets />} />
//             <Route path="/request" element={<RequestAsset />} />
//             <Route path="/team" element={<MyTeam />} />
//             <Route path="/profile" element={<Profile />} />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }

// 2....................................

import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import MyAssets from "./MyAssets";
import RequestAsset from "./RequestAsset";
import MyTeam from "./MyTeam";
import Profile from "./Profile";

export default function EmployeeDashboard() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 4 + Math.random() * 8,
    }));
    setFloatingParticles(particles);
  }, []);

  const navItems = [
    {
      path: "/employee",
      label: "My Assets",
      icon: "📦",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      path: "/employee/request",
      label: "Request Asset",
      icon: "📝",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      path: "/employee/team",
      label: "My Team",
      icon: "👥",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      path: "/employee/profile",
      label: "Profile",
      icon: "👤",
      gradient: "from-orange-500 to-red-500",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-6000" />
      </div>

      {/* Floating Particles */}
      {floatingParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/10 backdrop-blur-sm animate-float pointer-events-none"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Top Navbar with Animated Gradient Border */}
      <nav className="relative bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-indigo-900/90 shadow-2xl sticky top-0 z-50 backdrop-blur-xl border-b-2 border-gradient-animate">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-xl animate-gradient-shift" />
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button with 3D Effect */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:rotate-180 active:scale-95 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-purple-500/50"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-white transition-all duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    transform: isMobileMenuOpen
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                  }}
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-2xl animate-gradient-text">
                Employee Dashboard
              </h1>
            </div>
            <Link
              to="/"
              className="group relative px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 backdrop-blur-sm font-medium shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
            >
              <span className="relative z-10">Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex relative">
        {/* Mobile Overlay with Advanced Blur */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-md animate-fade-in-fast"
            onClick={closeMobileMenu}
          />
        )}

        {/* Sidebar with Glass Morphism and 3D Effects */}
        <aside
          className={`
            fixed lg:sticky top-[73px] left-0 min-h-[calc(100vh-73px)]
            w-64 bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95
            shadow-2xl z-40 backdrop-blur-2xl
            transform transition-all duration-700 ease-out
            ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100 scale-100"
                : "-translate-x-full opacity-0 scale-95"
            }
            lg:translate-x-0 lg:opacity-100 lg:scale-100
            border-r border-purple-500/30
            overflow-auto
          `}
        >
          {/* Sidebar Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-shift-slow" />

          <nav className="p-4 relative z-10">
            <ul className="space-y-3">
              {navItems.map((item, index) => (
                <li
                  key={item.path}
                  className="animate-slide-in-left"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-x-1 active:scale-95 overflow-hidden ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r " +
                          item.gradient +
                          " text-white shadow-2xl shadow-purple-500/50 scale-105"
                        : "hover:bg-white/10 text-gray-300 hover:text-white hover:shadow-xl backdrop-blur-sm"
                    }`}
                  >
                    {/* Animated Background on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />

                    {/* Icon with 3D Effect */}
                    <span className="relative z-10 text-2xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-lg">
                      {item.icon}
                    </span>

                    {/* Label with Glow Effect */}
                    <span className="relative z-10 font-semibold group-hover:tracking-wide transition-all duration-300">
                      {item.label}
                    </span>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Multiple Decorative Gradient Orbs */}
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
          <div className="absolute top-20 left-5 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full blur-2xl animate-float pointer-events-none" />
        </aside>

        {/* Main Content with 3D Card Effect */}
        <main className="flex-1 p-8 animate-fade-in-up-slow relative z-10">
          <div className="relative bg-gradient-to-br from-slate-800/90 via-purple-900/80 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 min-h-[calc(100vh-170px)] border border-purple-500/30 overflow-hidden transform transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/30">
            {/* Card Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-gradient-shift-slow" />

            {/* Content */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<MyAssets />} />
                <Route path="/request" element={<RequestAsset />} />
                <Route path="/team" element={<MyTeam />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />
          </div>
        </main>
      </div>

      {/* Advanced CSS Animations */}
      <style>{`
        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up-slow {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px) rotate(-5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-100px) translateX(20px) rotate(90deg);
          }
          50% {
            transform: translateY(-200px) translateX(-20px) rotate(180deg);
          }
          75% {
            transform: translateY(-300px) translateX(20px) rotate(270deg);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            transform: translateX(-50%) translateY(-50%) scale(1);
          }
          50% {
            transform: translateX(50%) translateY(50%) scale(1.2);
          }
        }

        @keyframes gradient-shift-slow {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(0) translateY(0);
          }
          50% {
            opacity: 0.6;
            transform: translateX(20px) translateY(20px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes gradient-text {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-fast {
          animation: fade-in-fast 0.3s ease-out;
        }

        .animate-fade-in-up-slow {
          animation: fade-in-up-slow 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-6000 {
          animation-delay: 6s;
        }

        .animate-float {
          animation: float 20s infinite linear;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease infinite;
        }

        .animate-gradient-shift-slow {
          animation: gradient-shift-slow 15s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
