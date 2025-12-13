// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";

// export default function Home() {
//   const [openFAQ, setOpenFAQ] = useState(null);

//   const features = [
//     {
//       icon: "💼",
//       title: "Asset Tracking",
//       desc: "Real-time tracking of all company assets with detailed history logs",
//     },
//     {
//       icon: "⚡",
//       title: "Quick Assignment",
//       desc: "Assign assets to employees instantly with automated notifications",
//     },
//     {
//       icon: "📊",
//       title: "Analytics Dashboard",
//       desc: "Comprehensive insights into asset utilization and department allocation",
//     },
//     {
//       icon: "🔒",
//       title: "Secure Access",
//       desc: "Role-based permissions ensuring data security and compliance",
//     },
//     {
//       icon: "📱",
//       title: "Mobile Ready",
//       desc: "Access and manage assets on-the-go from any device",
//     },
//     {
//       icon: "🔔",
//       title: "Smart Alerts",
//       desc: "Automated reminders for maintenance, returns, and renewals",
//     },
//   ];

//   const testimonials = [
//     {
//       company: "TechCorp Global",
//       person: "Sarah Johnson, HR Director",
//       text: "AssetVerse reduced our asset loss by 85% in just 6 months. The tracking system is incredibly intuitive.",
//     },
//     {
//       company: "Innovate Solutions",
//       person: "Michael Chen, Operations Manager",
//       text: "The automated assignment process saved us countless hours. Our team loves how simple it is to use.",
//     },
//     {
//       company: "Enterprise Dynamics",
//       person: "Emma Williams, IT Lead",
//       text: "Best investment we made this year. The analytics help us make data-driven decisions about our asset portfolio.",
//     },
//   ];

//   const stats = [
//     { number: "500+", label: "Companies Trust Us" },
//     { number: "50K+", label: "Assets Managed" },
//     { number: "99.9%", label: "Uptime Guarantee" },
//     { number: "24/7", label: "Support Available" },
//   ];

//   const faqs = [
//     {
//       q: "How does AssetVerse help prevent asset loss?",
//       a: "Our system tracks every asset assignment with timestamps, digital signatures, and automatic reminders for returns, ensuring complete accountability.",
//     },
//     {
//       q: "Can I integrate AssetVerse with existing HR systems?",
//       a: "Yes! AssetVerse offers API integration with popular HR platforms and can import your existing employee database seamlessly.",
//     },
//     {
//       q: "What kind of assets can I manage?",
//       a: "Manage any physical or digital asset including laptops, phones, software licenses, vehicles, office equipment, and more.",
//     },
//     {
//       q: "Is training required for my team?",
//       a: "AssetVerse is designed to be intuitive. We provide onboarding support and video tutorials, but most users are up and running within minutes.",
//     },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
//         <div className="absolute inset-0 bg-black opacity-10"></div>
//         <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
//           <div className="flex flex-col md:flex-row items-center gap-12">
//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//                 Smart Asset Management for Modern Companies
//               </h1>
//               <p className="text-xl mb-8 text-blue-100">
//                 Track, assign, and optimize your company assets with AI-powered
//                 insights. Join 500+ companies saving time and money.
//               </p>
//               <div className="flex gap-4">
//                 <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg">
//                   Start Free Trial
//                 </button>
//                 <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
//                   Watch Demo
//                 </button>
//               </div>
//             </motion.div>

//             <motion.div
//               className="md:w-1/2"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4">
//                     <div className="text-3xl mb-2">📊</div>
//                     <div className="text-sm">Real-time Analytics</div>
//                   </div>
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4">
//                     <div className="text-3xl mb-2">🔒</div>
//                     <div className="text-sm">Secure & Compliant</div>
//                   </div>
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4">
//                     <div className="text-3xl mb-2">⚡</div>
//                     <div className="text-sm">Lightning Fast</div>
//                   </div>
//                   <div className="bg-white bg-opacity-20 rounded-lg p-4">
//                     <div className="text-3xl mb-2">📱</div>
//                     <div className="text-sm">Mobile Ready</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, idx) => (
//               <motion.div
//                 key={idx}
//                 className="text-center"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//               >
//                 <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Powerful Features for Complete Control
//             </h2>
//             <p className="text-xl text-gray-600">
//               Everything you need to manage your assets efficiently
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, idx) => (
//               <motion.div
//                 key={idx}
//                 className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <div className="text-5xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">How AssetVerse Works</h2>
//             <p className="text-xl text-gray-600">
//               Get started in three simple steps
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "1",
//                 title: "Import Your Assets",
//                 desc: "Upload your inventory or add items manually. Bulk import supported.",
//               },
//               {
//                 step: "2",
//                 title: "Assign to Employees",
//                 desc: "Allocate assets with a click. Automated notifications sent instantly.",
//               },
//               {
//                 step: "3",
//                 title: "Track & Optimize",
//                 desc: "Monitor usage, get insights, and make data-driven decisions.",
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 className="relative"
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.2 }}
//               >
//                 <div className="bg-white p-8 rounded-xl shadow-lg">
//                   <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
//                     {item.step}
//                   </div>
//                   <h3 className="text-2xl font-bold mb-3 mt-4">{item.title}</h3>
//                   <p className="text-gray-600">{item.desc}</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Trusted by Leading Companies
//             </h2>
//             <p className="text-xl text-gray-600">
//               See what our customers say about us
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {testimonials.map((test, idx) => (
//               <motion.div
//                 key={idx}
//                 className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md border border-gray-100"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.15 }}
//               >
//                 <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
//                 <p className="text-gray-700 mb-6 italic">"{test.text}"</p>
//                 <div className="border-t pt-4">
//                   <div className="font-semibold text-gray-900">
//                     {test.person}
//                   </div>
//                   <div className="text-blue-600 text-sm">{test.company}</div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 max-w-3xl">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold mb-4">
//               Frequently Asked Questions
//             </h2>
//             <p className="text-xl text-gray-600">
//               Got questions? We've got answers
//             </p>
//           </div>
//           <div className="space-y-4">
//             {faqs.map((faq, idx) => (
//               <motion.div
//                 key={idx}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: idx * 0.1 }}
//               >
//                 <button
//                   className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-gray-50 transition"
//                   onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
//                 >
//                   {faq.q}
//                   <span className="text-2xl">
//                     {openFAQ === idx ? "−" : "+"}
//                   </span>
//                 </button>
//                 {openFAQ === idx && (
//                   <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
//                 )}
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold mb-6">
//               Ready to Transform Your Asset Management?
//             </h2>
//             <p className="text-xl mb-8 text-blue-100">
//               Join hundreds of companies already saving time and money with
//               AssetVerse
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg text-lg">
//                 Start Free 14-Day Trial
//               </button>
//               <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-lg">
//                 Schedule a Demo
//               </button>
//             </div>
//             <p className="mt-6 text-blue-100">
//               No credit card required • Cancel anytime • 24/7 support
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

// 2.........................................//.....................................

// 3................................
import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Smartphone,
  Bell,
  Package,
  ChevronDown,
  Check,
  Star,
} from "lucide-react";

// Import your existing components
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

// // Placeholder Navbar
// const Navbar = () => (
//   <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
//     <div className="container mx-auto px-6 py-4 flex items-center justify-between">
//       <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//         AssetVerse
//       </div>
//       <div className="flex items-center gap-6">
//         <a href="#" className="text-gray-600 hover:text-blue-600 transition">
//           Features
//         </a>
//         <a href="#" className="text-gray-600 hover:text-blue-600 transition">
//           Pricing
//         </a>
//         <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
//           Sign In
//         </button>
//       </div>
//     </div>
//   </nav>
// );

// // Placeholder Footer
// const Footer = () => (
//   <footer className="bg-gray-900 text-white py-12">
//     <div className="container mx-auto px-6 text-center">
//       <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//         AssetVerse
//       </div>
//       <p className="text-gray-400">© 2025 AssetVerse. All rights reserved.</p>
//     </div>
//   </footer>
// );

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const slidingWords = [
    "Asset",
    "Inventory",
    "Equipment",
    "Resource",
    "Technology",
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % slidingWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, [slidingWords.length]);

  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(bgTimer);
  }, [backgroundImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [
              ...new Set([...prev, entry.target.dataset.index]),
            ]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll("[data-index]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Package,
      title: "Asset Tracking",
      desc: "Real-time tracking of all company assets with detailed history logs",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Quick Assignment",
      desc: "Assign assets to employees instantly with automated notifications",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Comprehensive insights into asset utilization and department allocation",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Shield,
      title: "Secure Access",
      desc: "Role-based permissions ensuring data security and compliance",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      desc: "Access and manage assets on-the-go from any device",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      desc: "Automated reminders for maintenance, returns, and renewals",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const testimonials = [
    {
      company: "TechCorp Global",
      person: "Sarah Johnson",
      role: "HR Director",
      text: "AssetVerse reduced our asset loss by 85% in just 6 months. The tracking system is incredibly intuitive.",
      avatar: "SJ",
    },
    {
      company: "Innovate Solutions",
      person: "Michael Chen",
      role: "Operations Manager",
      text: "The automated assignment process saved us countless hours. Our team loves how simple it is to use.",
      avatar: "MC",
    },
    {
      company: "Enterprise Dynamics",
      person: "Emma Williams",
      role: "IT Lead",
      text: "Best investment we made this year. The analytics help us make data-driven decisions about our asset portfolio.",
      avatar: "EW",
    },
  ];

  const stats = [
    { number: "500+", label: "Companies Trust Us" },
    { number: "50K+", label: "Assets Managed" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Support Available" },
  ];

  const faqs = [
    {
      q: "How does AssetVerse help prevent asset loss?",
      a: "Our system tracks every asset assignment with timestamps, digital signatures, and automatic reminders for returns, ensuring complete accountability.",
    },
    {
      q: "Can I integrate AssetVerse with existing HR systems?",
      a: "Yes! AssetVerse offers API integration with popular HR platforms and can import your existing employee database seamlessly.",
    },
    {
      q: "What kind of assets can I manage?",
      a: "Manage any physical or digital asset including laptops, phones, software licenses, vehicles, office equipment, and more.",
    },
    {
      q: "Is training required for my team?",
      a: "AssetVerse is designed to be intuitive. We provide onboarding support and video tutorials, but most users are up and running within minutes.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {backgroundImages.map((img, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                idx === currentBgIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${img}')`,
                }}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Animated Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
                style={{
                  background:
                    i % 3 === 0
                      ? "#3B82F6"
                      : i % 3 === 1
                      ? "#8B5CF6"
                      : "#EC4899",
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-5 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6 animate-bounce border border-white/30 mt-15 ">
                🎉 Trusted by 500+ Companies
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white drop-shadow-lg">
                  Smart{" "}
                  <span className="inline-block relative h-20 lg:h-24 overflow-hidden align-middle">
                    <span
                      className="absolute inset-0 transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateY(-${currentWordIndex * 100}%)`,
                      }}
                    >
                      {slidingWords.map((word, idx) => (
                        <span
                          key={idx}
                          className="block h-20 lg:h-24 flex items-center text-yellow-300"
                        >
                          {word}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
                <br />
                <span className="text-white drop-shadow-lg">Management</span>
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-md">
                Track, assign, and optimize your company assets with AI-powered
                insights. Join hundreds of companies saving time and money.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
                  Watch Demo
                </button>
              </div>
              <p className="mt-6 text-sm text-white/80">
                ✓ No credit card required ✓ 14-day free trial ✓ Cancel anytime
              </p>
            </div>

            {/* Right Visual */}
            <div className="lg:w-1/2 relative">
              {/* Mobile: Vertical Stack */}
              <div className="lg:hidden flex flex-col gap-4 max-w-sm mx-auto mb-8">
                {[
                  {
                    icon: Package,
                    label: "Real-time Tracking",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Shield,
                    label: "Secure & Compliant",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Zap,
                    label: "Lightning Fast",
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    icon: BarChart3,
                    label: "Smart Analytics",
                    color: "from-green-500 to-emerald-500",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl flex items-center gap-4 hover:shadow-2xl transition-all duration-300"
                    >
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-base font-bold text-gray-800">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: Floating Cards */}
              <div className="hidden lg:block relative w-full max-w-lg mx-auto">
                <div className="relative h-96">
                  {[
                    {
                      icon: Package,
                      label: "Real-time Tracking",
                      color: "from-blue-500 to-cyan-500",
                      delay: 0,
                    },
                    {
                      icon: Shield,
                      label: "Secure & Compliant",
                      color: "from-purple-500 to-pink-500",
                      delay: 0.2,
                    },
                    {
                      icon: Zap,
                      label: "Lightning Fast",
                      color: "from-orange-500 to-red-500",
                      delay: 0.4,
                    },
                    {
                      icon: BarChart3,
                      label: "Smart Analytics",
                      color: "from-green-500 to-emerald-500",
                      delay: 0.6,
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        className="absolute bg-white rounded-2xl p-6 shadow-2xl hover:scale-110 transition-all duration-300"
                        style={{
                          left: `${(i % 2) * 50}%`,
                          top: `${Math.floor(i / 2) * 45}%`,
                          transform: `translateY(${
                            Math.sin(scrollY * 0.01 + i) * 10
                          }px)`,
                          animationDelay: `${item.delay}s`,
                        }}
                      >
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center group hover:scale-110 transition-transform duration-300"
              >
                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your assets efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  data-index={idx}
                  className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden ${
                    visibleCards.includes(String(idx))
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How AssetVerse Works
            </h2>
            <p className="text-xl text-blue-100">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "1",
                title: "Import Your Assets",
                desc: "Upload your inventory or add items manually. Bulk import supported.",
              },
              {
                step: "2",
                title: "Assign to Employees",
                desc: "Allocate assets with a click. Automated notifications sent instantly.",
              },
              {
                step: "3",
                title: "Track & Optimize",
                desc: "Monitor usage, get insights, and make data-driven decisions.",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <div className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-xl">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted by Leading Companies
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{test.text}"
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {test.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {test.person}
                    </div>
                    <div className="text-sm text-gray-600">
                      {test.role}, {test.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <button
                  className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-gray-50 transition"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                >
                  <span className="text-gray-900">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white transition-transform ${
                      openFAQ === idx ? "rotate-180" : ""
                    }`}
                  >
                    <span className="text-xl">
                      {openFAQ === idx ? "−" : "+"}
                    </span>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === idx ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-10 animate-float"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Asset Management?
          </h2>
          <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
            Join hundreds of companies already saving time and money with
            AssetVerse
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-10 py-4 bg-white text-blue-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition text-lg">
              Start Free 14-Day Trial
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition text-lg">
              Schedule a Demo
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-blue-100">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animate-float {
          animation: float 10s infinite;
        }
      `}</style>
    </div>
  );
}
