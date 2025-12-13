import React, { useEffect, useRef } from "react";
import { gsap } from "gsap"; // <--- Import GSAP for proper use (MUST be installed)
import { ScrollTrigger } from "gsap/ScrollTrigger"; // <--- Import ScrollTrigger (MUST be installed)
import {
  // Fa icons for general use
  FaRocket,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaBolt,
  FaCode,
  FaPalette,
  FaCheckCircle,
  FaGithub,
  FaEnvelope,
  FaStar,
  FaLightbulb,
  FaHandshake,
  FaCodeBranch,
  FaTools,
  FaRegBuilding,
  FaServer,
  FaDesktop,
  FaProjectDiagram,
} from "react-icons/fa";
import {
  // Custom icons for partners
  FaGoogle,
  FaApple,
  FaAmazon,
  FaFacebook,
} from "react-icons/fa";
import {
  MdDashboard,
  MdSecurity,
  MdSpeed,
  MdDevices,
  MdOutlineSupportAgent,
} from "react-icons/md";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Register GSAP plugins when importing
// gsap.registerPlugin(ScrollTrigger); // <--- Uncomment this line in a real project

const AboutUs = () => {
  // === REFERENCES FOR GSAP ANIMATION TARGETING ===
  const techStackRef = useRef(null);
  const partnerSectionRef = useRef(null);

  // === GSAP ANIMATION LOGIC ===
  useEffect(() => {
    // Check if GSAP is available (it won't be in this simulated environment, but this is the structure)
    // if (gsap && ScrollTrigger) {
    //   // --- 1. Tech Stack (Glowing Cards Stagger) ---
    //   gsap.from(".tech-card-group", {
    //     scrollTrigger: {
    //       trigger: techStackRef.current,
    //       start: "top 80%",
    //     },
    //     opacity: 0,
    //     y: 50,
    //     duration: 1,
    //     stagger: 0.2,
    //     ease: "power3.out"
    //   });
    //   // --- 2. Partner Cards Pop-In ---
    //   gsap.from(".partner-card", {
    //     scrollTrigger: {
    //       trigger: partnerSectionRef.current,
    //       start: "top 80%",
    //     },
    //     opacity: 0,
    //     scale: 0.8,
    //     rotation: -10,
    //     duration: 0.5,
    //     stagger: 0.1,
    //     ease: "back.out(1.7)"
    //   });
    // }
  }, []); // Background images for hero slider
  // ===============================================

  const heroImages = [
    "https://i.postimg.cc/dt05BfYh/pexels-tara-winstead-8386519.jpg",
    "https://i.postimg.cc/8PGvHfg8/pexels-pixabay-416405.jpg",
    "https://i.postimg.cc/gcXwHk6s/pexels-yankrukov-7693142.jpg",
    "https://i.postimg.cc/28swmKn2/pexels-tima-miroshnichenko-7567304.jpg",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit-crop",
  ];

  const features = [
    {
      icon: <FaPalette className="text-4xl text-blue-500" />,
      title: "Modern UI/UX",
      description:
        "Clean, responsive design with TailwindCSS and dark/light mode support",
    },
    {
      icon: <FaBolt className="text-4xl text-yellow-500" />,
      title: "Real-time Updates",
      description: "Instant reflection of data changes across all dashboards",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-green-500" />,
      title: "Secure Authentication",
      description:
        "Firebase-powered authentication with role-based access control",
    },
    {
      icon: <FaMobileAlt className="text-4xl text-purple-500" />,
      title: "Fully Responsive",
      description: "Optimized for mobile, tablet, and desktop devices",
    },
    {
      icon: <MdDashboard className="text-4xl text-red-500" />,
      title: "Analytics Dashboard",
      description:
        "Visual charts and statistics for asset distribution insights",
    },
    {
      icon: <FaChartLine className="text-4xl text-indigo-500" />,
      title: "Advanced Filtering",
      description: "Search and filter assets with powerful query options",
    },
  ]; // UPDATED TECH STACK DATA FOR GROUPING

  const techStack = [
    {
      name: "React.js",
      category: "Frontend",
      color: "bg-cyan-500",
      icon: <FaDesktop />,
    },
    {
      name: "TailwindCSS",
      category: "Frontend",
      color: "bg-blue-500",
      icon: <FaPalette />,
    },
    {
      name: "Firebase",
      category: "Backend/Auth",
      color: "bg-orange-500",
      icon: <FaServer />,
    },
    {
      name: "Stripe",
      category: "Backend/Auth",
      color: "bg-indigo-500",
      icon: <FaServer />,
    },
    {
      name: "Vite",
      category: "Build Tool",
      color: "bg-purple-500",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Axios",
      category: "Build Tool",
      color: "bg-green-500",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Recharts",
      category: "Data Viz",
      color: "bg-pink-500",
      icon: <FaChartLine />,
    },
    {
      name: "React Router",
      category: "Data Viz",
      color: "bg-red-500",
      icon: <FaChartLine />,
    },
  ]; // Group the tech stack for better layout

  const groupedTech = {
    Frontend: techStack.filter((t) => t.category === "Frontend"),
    "Backend/Auth": techStack.filter((t) => t.category === "Backend/Auth"),
    "Build Tools": techStack.filter((t) => t.category === "Build Tool"),
    "Data/Utility": techStack.filter((t) => t.category === "Data Viz"),
  };

  const hrFeatures = [
    "Add, edit, delete, and track all company assets",
    "View, add, and remove employees from company",
    "Approve or reject employee asset requests",
    "Direct asset assignment to employees",
    "Visual analytics with charts and statistics",
    "Package upgrades with Stripe integration",
    "Payment history tracking",
    "Company profile management",
  ];

  const employeeFeatures = [
    "Browse and request available company assets",
    "View all assigned assets with search",
    "Return borrowed assets to the company",
    "View affiliated companies",
    "See all team members in the company",
    "Update personal information and photo",
    "Track all asset request statuses",
  ]; // UPDATED STATS DATA FOR NEW SECTION

  const stats = [
    {
      number: "100%",
      label: "Fully Responsive",
      icon: <MdDevices className="text-4xl text-green-400" />,
    },
    {
      number: "99.9%",
      label: "Guaranteed Uptime",
      icon: <FaBolt className="text-4xl text-yellow-400" />,
    },
    {
      number: "24/7",
      label: "Dedicated Support",
      icon: <MdOutlineSupportAgent className="text-4xl text-red-400" />,
    },
    {
      number: "10K+",
      label: "Assets Managed",
      icon: <FaChartLine className="text-4xl text-blue-400" />,
    },
  ];

  const values = [
    {
      icon: <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />,
      title: "Innovation",
      description: "Continuously seeking better ways to manage resources.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-teal-500 mx-auto mb-4" />,
      title: "Integrity",
      description: "Ensuring transparent and trustworthy data handling.",
    },
    {
      icon: <FaHandshake className="text-5xl text-red-500 mx-auto mb-4" />,
      title: "Collaboration",
      description:
        "Building an inclusive platform for all organizational roles.",
    },
  ];

  const roadmapItems = [
    {
      icon: <FaTools className="text-3xl text-blue-600" />,
      title: "Q1 2024: Advanced Reporting",
      description: "Implement custom report generation and export features.",
    },
    {
      icon: <MdSecurity className="text-3xl text-green-600" />,
      title: "Q2 2024: Inventory Barcode Scanning",
      description:
        "Add support for mobile barcode scanning for fast inventory.",
    },
    {
      icon: <FaCodeBranch className="text-3xl text-purple-600" />,
      title: "Q3 2024: API Integration",
      description: "Develop a public API for connecting external services.",
    },
  ]; // UPDATED PARTNERS LIST (FAANG + Tech Partners)
  const partners = [
    {
      name: "Google",
      logo: <FaGoogle className="text-6xl text-red-600" />,
      link: "#",
      color: "border-red-600",
    },
    {
      name: "Apple",
      logo: <FaApple className="text-6xl text-gray-800" />,
      link: "#",
      color: "border-gray-800",
    },
    {
      name: "Amazon",
      logo: <FaAmazon className="text-6xl text-orange-500" />,
      link: "#",
      color: "border-orange-500",
    },
    {
      name: "Meta (Facebook)",
      logo: <FaFacebook className="text-6xl text-blue-600" />,
      link: "#",
      color: "border-blue-600",
    },
    {
      name: "Tancent",
      logo: "https://i.postimg.cc/7YD2fCDt/download-(3).webp",
      link: "#",
    },
    {
      name: "Firebase",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Firebase_logo_white.svg/1000px-Firebase_logo_white.svg.png",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
            <Navbar />
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden bg-gray-900">
        {/* ... Hero Slider and Content remain unchanged ... */}
        <div className="absolute inset-0 opacity-80">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1500}
            className="w-full h-full"
          >
            {heroImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Asset management background ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Animated Floating Elements - Retained */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <div className="w-20 h-20 bg-white rounded-full"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-pulse delay-100">
          <div className="w-32 h-32 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-bounce">
          <div className="w-16 h-16 bg-white rounded-full"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <FaRocket className="text-6xl animate-bounce" />
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            data-aos="fade-up"
          >
            About AssetVerse
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            A modern Asset Management System built with cutting-edge
            technologies to streamline company asset tracking and team workflows
          </p>
          <div
            className="flex justify-center gap-4 flex-wrap"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <a
              href="https://github.com/Yeasinoncode98/assetverse-asset-management-web-server.git"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <FaGithub /> View on GitHub
            </a>
            <a
              href="https://assetverse-asset-management-web-cli.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Live Demo
            </a>
          </div>
        </div>
      </section>
      {/* Mission Section - Added AOS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl font-bold mb-6 text-gray-800"
              data-aos="fade-zoom-in"
            >
              Our Mission
            </h2>
            <p
              className="text-lg text-gray-600 leading-relaxed mb-8"
              data-aos="fade-up"
            >
              AssetVerse aims to revolutionize how companies manage their assets
              by providing an intuitive, efficient, and powerful platform. We
              believe that asset management should be simple, transparent, and
              accessible to everyone in the organization—from HR managers to
              employees.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div
                className="text-center"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <MdSpeed className="text-5xl text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600">
                  Built with Vite for blazing-fast performance
                </p>
              </div>
              <div
                className="text-center"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <MdSecurity className="text-5xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure & Safe</h3>
                <p className="text-gray-600">
                  Enterprise-grade security with Firebase
                </p>
              </div>
              <div
                className="text-center"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <MdDevices className="text-5xl text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
                <p className="text-gray-600">Works seamlessly on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Values - Added AOS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            data-aos="fade-down"
          >
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                data-aos="flip-up"
                data-aos-delay={index * 100}
                className="bg-white p-8 rounded-xl shadow-xl text-center border-t-4 border-blue-500"
              >
                {value.icon}
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Key Features - Added AOS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            data-aos="fade-down"
          >
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-aos="fade-right"
                data-aos-delay={index * 50}
                className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* HR vs Employee Features - Added AOS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            data-aos="fade-down"
          >
            Features by Role
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* HR Features */}
            <div
              data-aos="zoom-in-right"
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <FaUsers className="text-4xl text-blue-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">
                  HR Dashboard
                </h3>
              </div>
              <ul className="space-y-3">
                {hrFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Employee Features */}
            <div
              data-aos="zoom-in-left"
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <FaUsers className="text-4xl text-green-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Employee Dashboard
                </h3>
              </div>
              <ul className="space-y-3">
                {employeeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-green-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Roadmap/Future Plans - Added AOS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12 text-gray-800"
            data-aos="fade-down"
          >
            Roadmap & Future Plans
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="flex items-start p-6 bg-gray-50 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition"
              >
                <div className="mr-4 mt-1 flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MODIFIED SECTION: Our Trusted Partners (Card Design & FAANG) */}
      <section ref={partnerSectionRef} className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-12">
            <FaRegBuilding className="text-4xl text-blue-600 mr-4" />
            <h2
              className="text-4xl font-bold text-gray-800"
              data-aos="fade-down"
            >
              Our Trusted Partners & Technologies
            </h2>
          </div>
          <p
            className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto"
            data-aos="fade-up"
          >
            AssetVerse is built using reliable, modern services and is
            compatible with enterprise-level standards set by industry leaders.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {partners.map((partner, index) => (
              <a
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`partner-card bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 ${
                  partner.color
                    ? `border-b-4 ${partner.color}`
                    : "border-b-4 border-gray-200"
                }`}
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="w-full h-16 flex items-center justify-center mb-3">
                  {typeof partner.logo === "string" ? (
                    <img
                      src={partner.logo}
                      alt={`${partner.name} Logo`}
                      className="max-h-full max-w-full object-contain grayscale opacity-60 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                      style={{
                        filter:
                          partner.name === "Firebase" ? "invert(1)" : "none",
                      }}
                    />
                  ) : (
                    <div className="transition duration-300 transform hover:scale-110">
                      {partner.logo}
                    </div>
                  )}
                </div>
                <div className="font-semibold text-gray-800">
                  {partner.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* MODIFIED SECTION: Tech Stack (Eye-Catching Glow Background) */}
      <section
        ref={techStackRef}
        className="py-16 bg-gray-950 text-white relative overflow-hidden"
      >
        {/* Glowing Background Effect (CSS Filter Simulation) */}
        <div className="absolute inset-0 opacity-20 filter blur-3xl">
          <div className="w-1/3 h-2/3 bg-cyan-500 rounded-full absolute -top-10 -left-10 mix-blend-screen animate-pulse duration-[5000ms]"></div>
          <div className="w-1/3 h-2/3 bg-blue-500 rounded-full absolute -bottom-10 -right-10 mix-blend-screen animate-pulse duration-[6000ms] delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            className="flex flex-col items-center justify-center mb-12"
            data-aos="fade-down"
          >
            <FaCode className="text-5xl text-green-400 mb-4 animate-spin-slow" />
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Tech Stack: The Foundation of AssetVerse
            </h2>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(groupedTech).map(
              ([category, techs], categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="tech-card-group bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 backdrop-blur-sm relative overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={categoryIndex * 150}
                >
                  {/* Inner Glow Border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 opacity-0 hover:opacity-100 transition duration-500"></div>

                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-300 relative z-10">
                    {techs[0]?.icon} {category}
                  </h3>
                  <div className="space-y-3 relative z-10">
                    {techs.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        // Simulating GSAP animation with Tailwind transforms on hover
                        className={`tech-card flex items-center p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.05] hover:shadow-blue-500/50 hover:shadow-xl`}
                      >
                        <span
                          className={`${
                            tech.color
                          } w-3 h-3 rounded-full mr-3 flex-shrink-0 shadow-lg ${
                            tech.color === "bg-cyan-500"
                              ? "shadow-cyan-400/50"
                              : ""
                          }`}
                        ></span>
                        <div>
                          <div className="font-semibold text-gray-100">
                            {tech.name}
                          </div>
                          <div className="text-xs opacity-70 text-gray-300">
                            {tech.category}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      {/* MODIFIED SECTION: Why Choose Us (Enhanced Stats/Responsive Design) - Added AOS */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center mb-12"
            data-aos="fade-zoom-in"
          >
            Why Choose AssetVerse?
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-aos="flip-right"
                data-aos-delay={index * 100}
                // Simulating attention-grabbing animation with Tailwind
                className="bg-white/10 p-6 rounded-xl backdrop-blur-sm shadow-2xl transition transform hover:scale-105 hover:bg-white/20 border-b-4 border-white/50"
              >
                <div className="mb-4 mx-auto w-fit p-3 bg-white/20 rounded-full">
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold mb-1 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-lg font-medium opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Author & Contact - Added AOS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold mb-8 text-gray-800"
            data-aos="fade-down"
          >
            Get In Touch
          </h2>
          <p
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            data-aos="fade-up"
          >
            Have questions or want to contribute? We'd love to hear from you!
          </p>
          <div
            className="flex justify-center gap-6 flex-wrap"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <a
              href="mailto:devoncode98@gmail.com"
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              <FaEnvelope /> Contact Us
            </a>
            <a
              href="https://github.com/Yeasinoncode98"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              <FaGithub /> Follow on GitHub
            </a>
          </div>
          <div
            className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl max-w-2xl mx-auto"
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-center mb-4">
              <FaStar className="text-yellow-500 text-2xl" />
            </div>
            <p className="text-gray-700 text-lg mb-4">
              Made with ❤️ by{" "}
              <span className="font-bold text-blue-600">Yeasin Arafat</span>
            </p>
            <p className="text-gray-600">
              If you find this project helpful, please give it a star on GitHub!
            </p>
          </div>
        </div>
      </section>
      <Footer />{" "}
    </div>
  );
};

export default AboutUs;
