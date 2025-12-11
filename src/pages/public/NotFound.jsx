import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative flex items-center justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: Math.random() * 10 + 10 + "s",
            }}
          />
        ))}
      </div>

      {/* Parallax floating shapes */}
      <div
        className="absolute w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${
            mousePosition.y * 0.02
          }px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
      <div
        className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{
          transform: `translate(${-mousePosition.x * 0.03}px, ${
            -mousePosition.y * 0.03
          }px)`,
          transition: "transform 0.3s ease-out",
          animationDelay: "1s",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1
            className={`text-8xl sm:text-9xl lg:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 animate-gradient ${
              glitchActive ? "animate-glitch" : ""
            }`}
            style={{
              textShadow: glitchActive
                ? "0 0 30px rgba(255, 255, 255, 0.8)"
                : "0 0 50px rgba(147, 51, 234, 0.5)",
            }}
          >
            404
          </h1>

          {/* Glitch layers */}
          {glitchActive && (
            <>
              <h1
                className="absolute top-0 left-0 w-full text-8xl sm:text-9xl lg:text-[12rem] font-black text-cyan-400 opacity-70 animate-glitch-1"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
              >
                404
              </h1>
              <h1
                className="absolute top-0 left-0 w-full text-8xl sm:text-9xl lg:text-[12rem] font-black text-red-400 opacity-70 animate-glitch-2"
                style={{
                  clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
                }}
              >
                404
              </h1>
            </>
          )}
        </div>

        {/* Animated text */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white animate-bounce-slow">
            Oops! Page Not Found
          </h2>
          <p className="text-lg sm:text-xl text-purple-200 animate-fade-in max-w-2xl mx-auto">
            The page you're looking for seems to have vanished into the digital
            void. Don't worry, we'll help you find your way back!
          </p>
        </div>

        {/* Animated astronaut/robot icon */}
        <div className="mb-12 animate-float-slow">
          <div className="inline-block relative">
            <svg
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Robot head */}
              <rect
                x="60"
                y="50"
                width="80"
                height="80"
                rx="10"
                fill="url(#gradient1)"
                className="animate-pulse-slow"
              />

              {/* Eyes */}
              <circle
                cx="80"
                cy="80"
                r="8"
                fill="#fff"
                className="animate-blink"
              />
              <circle
                cx="120"
                cy="80"
                r="8"
                fill="#fff"
                className="animate-blink"
                style={{ animationDelay: "0.1s" }}
              />

              {/* Mouth */}
              <path
                d="M 75 100 Q 100 115 125 100"
                stroke="#fff"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                className="animate-pulse"
              />

              {/* Antenna */}
              <line
                x1="100"
                y1="50"
                x2="100"
                y2="30"
                stroke="url(#gradient2)"
                strokeWidth="4"
                strokeLinecap="round"
                className="animate-swing"
              />
              <circle
                cx="100"
                cy="25"
                r="6"
                fill="#ff6b9d"
                className="animate-ping-slow"
              />

              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/30 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:bg-white/20"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </span>
          </button>
        </div>

        {/* Fun fact */}
        <div className="mt-12 text-purple-300 text-sm animate-fade-in-up">
          <p className="animate-pulse-slow">
            💡 Fun fact: HTTP 404 errors have been around since 1992!
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-1 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes glitch-2 {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(3px, -3px);
          }
          40% {
            transform: translate(3px, 3px);
          }
          60% {
            transform: translate(-3px, -3px);
          }
          80% {
            transform: translate(-3px, 3px);
          }
          100% {
            transform: translate(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes swing {
          0%,
          100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }

        @keyframes blink {
          0%,
          90%,
          100% {
            opacity: 1;
          }
          95% {
            opacity: 0;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-glitch {
          animation: glitch 0.3s linear infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 0.3s linear infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 0.3s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-in 0.5s both;
        }

        .animate-swing {
          transform-origin: top center;
          animation: swing 2s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// ..........3.................

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";

// export default function NotFound() {
//   const navigate = useNavigate();
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [glitchActive, setGlitchActive] = useState(false);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);

//     // Random glitch effect
//     const glitchInterval = setInterval(() => {
//       setGlitchActive(true);
//       setTimeout(() => setGlitchActive(false), 200);
//     }, 3000);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       clearInterval(glitchInterval);
//     };
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <main className="container mx-auto px-4 py-24 flex-1 relative overflow-hidden">
//         {/* Animated background particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute bg-blue-400 rounded-full opacity-20"
//               style={{
//                 width: Math.random() * 4 + 2 + "px",
//                 height: Math.random() * 4 + 2 + "px",
//                 left: Math.random() * 100 + "%",
//                 top: Math.random() * 100 + "%",
//                 animation: `float ${Math.random() * 10 + 10}s linear infinite`,
//                 animationDelay: Math.random() * 5 + "s",
//               }}
//             />
//           ))}
//         </div>

//         {/* Parallax floating shapes */}
//         <div
//           className="absolute w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"
//           style={{
//             transform: `translate(${mousePosition.x * 0.02}px, ${
//               mousePosition.y * 0.02
//             }px)`,
//             transition: "transform 0.3s ease-out",
//             left: "10%",
//             top: "20%",
//           }}
//         />
//         <div
//           className="absolute w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"
//           style={{
//             transform: `translate(${-mousePosition.x * 0.03}px, ${
//               -mousePosition.y * 0.03
//             }px)`,
//             transition: "transform 0.3s ease-out",
//             animationDelay: "1s",
//             right: "10%",
//             bottom: "20%",
//           }}
//         />

//         {/* Main content */}
//         <div className="relative z-10 text-center">
//           {/* Animated 404 */}
//           <div className="relative mb-8">
//             <h1
//               className={`text-7xl sm:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 ${
//                 glitchActive ? "animate-glitch" : ""
//               }`}
//               style={{
//                 textShadow: glitchActive
//                   ? "0 0 30px rgba(147, 51, 234, 0.8)"
//                   : "0 0 50px rgba(147, 51, 234, 0.3)",
//                 backgroundSize: "200% 200%",
//                 animation: "gradient 3s ease infinite",
//               }}
//             >
//               404
//             </h1>

//             {/* Glitch layers */}
//             {glitchActive && (
//               <>
//                 <h1
//                   className="absolute top-0 left-0 w-full text-7xl sm:text-8xl lg:text-9xl font-black text-cyan-400 opacity-70"
//                   style={{
//                     clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
//                     animation: "glitch-1 0.3s linear infinite",
//                   }}
//                 >
//                   404
//                 </h1>
//                 <h1
//                   className="absolute top-0 left-0 w-full text-7xl sm:text-8xl lg:text-9xl font-black text-red-400 opacity-70"
//                   style={{
//                     clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
//                     animation: "glitch-2 0.3s linear infinite",
//                   }}
//                 >
//                   404
//                 </h1>
//               </>
//             )}
//           </div>

//           {/* Animated text */}
//           <div className="space-y-4 mb-12">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 animate-bounce-slow">
//               Page Not Found
//             </h2>
//             <p className="text-lg text-gray-600 animate-fade-in max-w-2xl mx-auto">
//               The page you are looking for does not exist. Don't worry, we'll
//               help you find your way back!
//             </p>
//           </div>

//           {/* Animated robot icon */}
//           <div className="mb-12 animate-float-slow">
//             <div className="inline-block relative">
//               <svg
//                 className="w-32 h-32 sm:w-40 sm:h-40 mx-auto"
//                 viewBox="0 0 200 200"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 {/* Robot head */}
//                 <rect
//                   x="60"
//                   y="50"
//                   width="80"
//                   height="80"
//                   rx="10"
//                   fill="url(#gradient1)"
//                   className="animate-pulse-slow"
//                 />

//                 {/* Eyes */}
//                 <circle
//                   cx="80"
//                   cy="80"
//                   r="8"
//                   fill="#fff"
//                   className="animate-blink"
//                 />
//                 <circle
//                   cx="120"
//                   cy="80"
//                   r="8"
//                   fill="#fff"
//                   className="animate-blink"
//                   style={{ animationDelay: "0.1s" }}
//                 />

//                 {/* Mouth */}
//                 <path
//                   d="M 75 100 Q 100 115 125 100"
//                   stroke="#fff"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   fill="none"
//                   className="animate-pulse"
//                 />

//                 {/* Antenna */}
//                 <line
//                   x1="100"
//                   y1="50"
//                   x2="100"
//                   y2="30"
//                   stroke="url(#gradient2)"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   className="animate-swing"
//                 />
//                 <circle
//                   cx="100"
//                   cy="25"
//                   r="6"
//                   fill="#ff6b9d"
//                   className="animate-ping-slow"
//                 />

//                 <defs>
//                   <linearGradient
//                     id="gradient1"
//                     x1="0%"
//                     y1="0%"
//                     x2="100%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#a855f7" />
//                     <stop offset="100%" stopColor="#ec4899" />
//                   </linearGradient>
//                   <linearGradient
//                     id="gradient2"
//                     x1="0%"
//                     y1="0%"
//                     x2="0%"
//                     y2="100%"
//                   >
//                     <stop offset="0%" stopColor="#fbbf24" />
//                     <stop offset="100%" stopColor="#f59e0b" />
//                   </linearGradient>
//                 </defs>
//               </svg>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button
//               onClick={() => navigate("/")}
//               className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
//             >
//               <span className="relative z-10 flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 animate-bounce"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//                 Go Home
//               </span>
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             </button>

//             <button
//               onClick={() => navigate(-1)}
//               className="group relative px-8 py-4 bg-gray-800 text-white font-bold rounded-full border-2 border-gray-700 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:bg-gray-700"
//             >
//               <span className="flex items-center gap-2">
//                 <svg
//                   className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M10 19l-7-7m0 0l7-7m-7 7h18"
//                   />
//                 </svg>
//                 Go Back
//               </span>
//             </button>
//           </div>

//           {/* Fun fact */}
//           <div className="mt-12 text-gray-500 text-sm animate-fade-in-up">
//             <p className="animate-pulse-slow">
//               💡 Fun fact: HTTP 404 errors have been around since 1992!
//             </p>
//           </div>
//         </div>
//       </main>

//       <Footer />

//       <style jsx>{`
//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) translateX(0px);
//           }
//           25% {
//             transform: translateY(-20px) translateX(10px);
//           }
//           50% {
//             transform: translateY(-10px) translateX(-10px);
//           }
//           75% {
//             transform: translateY(-30px) translateX(5px);
//           }
//         }

//         @keyframes float-slow {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }

//         @keyframes gradient {
//           0%,
//           100% {
//             background-position: 0% 50%;
//           }
//           50% {
//             background-position: 100% 50%;
//           }
//         }

//         @keyframes glitch {
//           0% {
//             transform: translate(0);
//           }
//           20% {
//             transform: translate(-2px, 2px);
//           }
//           40% {
//             transform: translate(-2px, -2px);
//           }
//           60% {
//             transform: translate(2px, 2px);
//           }
//           80% {
//             transform: translate(2px, -2px);
//           }
//           100% {
//             transform: translate(0);
//           }
//         }

//         @keyframes glitch-1 {
//           0% {
//             transform: translate(0);
//           }
//           20% {
//             transform: translate(-3px, 3px);
//           }
//           40% {
//             transform: translate(-3px, -3px);
//           }
//           60% {
//             transform: translate(3px, 3px);
//           }
//           80% {
//             transform: translate(3px, -3px);
//           }
//           100% {
//             transform: translate(0);
//           }
//         }

//         @keyframes glitch-2 {
//           0% {
//             transform: translate(0);
//           }
//           20% {
//             transform: translate(3px, -3px);
//           }
//           40% {
//             transform: translate(3px, 3px);
//           }
//           60% {
//             transform: translate(-3px, -3px);
//           }
//           80% {
//             transform: translate(-3px, 3px);
//           }
//           100% {
//             transform: translate(0);
//           }
//         }

//         @keyframes bounce-slow {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes swing {
//           0%,
//           100% {
//             transform: rotate(-5deg);
//           }
//           50% {
//             transform: rotate(5deg);
//           }
//         }

//         @keyframes blink {
//           0%,
//           90%,
//           100% {
//             opacity: 1;
//           }
//           95% {
//             opacity: 0;
//           }
//         }

//         @keyframes ping-slow {
//           0% {
//             transform: scale(1);
//             opacity: 1;
//           }
//           50% {
//             transform: scale(1.5);
//             opacity: 0.5;
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .animate-float-slow {
//           animation: float-slow 3s ease-in-out infinite;
//         }

//         .animate-glitch {
//           animation: glitch 0.3s linear infinite;
//         }

//         .animate-bounce-slow {
//           animation: bounce-slow 2s ease-in-out infinite;
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-in;
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-in 0.5s both;
//         }

//         .animate-swing {
//           transform-origin: top center;
//           animation: swing 2s ease-in-out infinite;
//         }

//         .animate-blink {
//           animation: blink 3s ease-in-out infinite;
//         }

//         .animate-ping-slow {
//           animation: ping-slow 2s ease-in-out infinite;
//         }

//         .animate-pulse-slow {
//           animation: pulse 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
