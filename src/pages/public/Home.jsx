import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const features = [
    {
      icon: "💼",
      title: "Asset Tracking",
      desc: "Real-time tracking of all company assets with detailed history logs",
    },
    {
      icon: "⚡",
      title: "Quick Assignment",
      desc: "Assign assets to employees instantly with automated notifications",
    },
    {
      icon: "📊",
      title: "Analytics Dashboard",
      desc: "Comprehensive insights into asset utilization and department allocation",
    },
    {
      icon: "🔒",
      title: "Secure Access",
      desc: "Role-based permissions ensuring data security and compliance",
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      desc: "Access and manage assets on-the-go from any device",
    },
    {
      icon: "🔔",
      title: "Smart Alerts",
      desc: "Automated reminders for maintenance, returns, and renewals",
    },
  ];

  const testimonials = [
    {
      company: "TechCorp Global",
      person: "Sarah Johnson, HR Director",
      text: "AssetVerse reduced our asset loss by 85% in just 6 months. The tracking system is incredibly intuitive.",
    },
    {
      company: "Innovate Solutions",
      person: "Michael Chen, Operations Manager",
      text: "The automated assignment process saved us countless hours. Our team loves how simple it is to use.",
    },
    {
      company: "Enterprise Dynamics",
      person: "Emma Williams, IT Lead",
      text: "Best investment we made this year. The analytics help us make data-driven decisions about our asset portfolio.",
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
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Smart Asset Management for Modern Companies
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Track, assign, and optimize your company assets with AI-powered
                insights. Join 500+ companies saving time and money.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg">
                  Start Free Trial
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                  Watch Demo
                </button>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-sm">Real-time Analytics</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-sm">Secure & Compliant</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl mb-2">⚡</div>
                    <div className="text-sm">Lightning Fast</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <div className="text-3xl mb-2">📱</div>
                    <div className="text-sm">Mobile Ready</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for Complete Control
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your assets efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How AssetVerse Works</h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 mt-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about us
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-700 mb-6 italic">"{test.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">
                    {test.person}
                  </div>
                  <div className="text-blue-600 text-sm">{test.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Got questions? We've got answers
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <button
                  className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-gray-50 transition"
                  onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                >
                  {faq.q}
                  <span className="text-2xl">
                    {openFAQ === idx ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === idx && (
                  <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Asset Management?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of companies already saving time and money with
              AssetVerse
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg text-lg">
                Start Free 14-Day Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition text-lg">
                Schedule a Demo
              </button>
            </div>
            <p className="mt-6 text-blue-100">
              No credit card required • Cancel anytime • 24/7 support
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// 2.......................
// import React, { useState, useEffect, useRef } from "react";
// import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

// export default function Home() {
//   const [openFAQ, setOpenFAQ] = useState(null);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const heroRef = useRef(null);
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

//   const bannerItems = [
//     "Modern Companies",
//     "Innovative Teams",
//     "Smart Businesses",
//     "Forward Thinkers",
//     "Industry Leaders",
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const features = [
//     {
//       icon: "💼",
//       title: "Asset Tracking",
//       desc: "Real-time tracking of all company assets with detailed history logs",
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: "⚡",
//       title: "Quick Assignment",
//       desc: "Assign assets to employees instantly with automated notifications",
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: "📊",
//       title: "Analytics Dashboard",
//       desc: "Comprehensive insights into asset utilization and department allocation",
//       color: "from-orange-500 to-red-500",
//     },
//     {
//       icon: "🔒",
//       title: "Secure Access",
//       desc: "Role-based permissions ensuring data security and compliance",
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: "📱",
//       title: "Mobile Ready",
//       desc: "Access and manage assets on-the-go from any device",
//       color: "from-indigo-500 to-blue-500",
//     },
//     {
//       icon: "🔔",
//       title: "Smart Alerts",
//       desc: "Automated reminders for maintenance, returns, and renewals",
//       color: "from-yellow-500 to-orange-500",
//     },
//   ];

//   const testimonials = [
//     {
//       company: "TechCorp Global",
//       person: "Sarah Johnson, HR Director",
//       text: "AssetVerse reduced our asset loss by 85% in just 6 months. The tracking system is incredibly intuitive.",
//       avatar: "SJ",
//     },
//     {
//       company: "Innovate Solutions",
//       person: "Michael Chen, Operations Manager",
//       text: "The automated assignment process saved us countless hours. Our team loves how simple it is to use.",
//       avatar: "MC",
//     },
//     {
//       company: "Enterprise Dynamics",
//       person: "Emma Williams, IT Lead",
//       text: "Best investment we made this year. The analytics help us make data-driven decisions about our asset portfolio.",
//       avatar: "EW",
//     },
//   ];

//   const stats = [
//     { number: "500+", label: "Companies Trust Us", icon: "🏢" },
//     { number: "50K+", label: "Assets Managed", icon: "📦" },
//     { number: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
//     { number: "24/7", label: "Support Available", icon: "💬" },
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
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 z-0">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-50"></div>
//         <div className="absolute inset-0">
//           {[...Array(50)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-white rounded-full"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//               }}
//               animate={{
//                 opacity: [0, 1, 0],
//                 scale: [0, 1, 0],
//               }}
//               transition={{
//                 duration: Math.random() * 3 + 2,
//                 repeat: Infinity,
//                 delay: Math.random() * 2,
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="relative z-10">
//         {/* Navbar */}
//         <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-80 backdrop-blur-lg border-b border-white border-opacity-10">
//           <div className="container mx-auto px-4 py-4">
//             <div className="flex justify-between items-center">
//               <motion.div
//                 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//               >
//                 AssetVerse
//               </motion.div>
//               <motion.button
//                 className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Get Started
//               </motion.button>
//             </div>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <section
//           ref={heroRef}
//           className="relative min-h-screen flex items-center pt-20"
//         >
//           <div className="container mx-auto px-4 py-20">
//             <div className="flex flex-col md:flex-row items-center gap-12">
//               <motion.div
//                 className="md:w-1/2"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.div
//                   className="inline-block mb-6"
//                   animate={{
//                     boxShadow: [
//                       "0 0 20px rgba(59, 130, 246, 0.5)",
//                       "0 0 40px rgba(147, 51, 234, 0.5)",
//                       "0 0 20px rgba(59, 130, 246, 0.5)",
//                     ],
//                   }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                 >
//                   <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-semibold">
//                     🚀 AI-Powered Platform
//                   </span>
//                 </motion.div>

//                 <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//                   Smart Asset
//                   <br />
//                   Management for{" "}
//                   <div className="inline-block relative h-20 overflow-hidden">
//                     <motion.div
//                       key={currentSlide}
//                       initial={{ y: 100, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       exit={{ y: -100, opacity: 0 }}
//                       transition={{ duration: 0.5 }}
//                       className="absolute bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
//                     >
//                       {bannerItems[currentSlide]}
//                     </motion.div>
//                   </div>
//                 </h1>

//                 <p className="text-xl mb-8 text-gray-300">
//                   Track, assign, and optimize your company assets with
//                   AI-powered insights. Join 500+ companies saving time and
//                   money.
//                 </p>

//                 <div className="flex gap-4">
//                   <motion.button
//                     className="relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold overflow-hidden group"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <span className="relative z-10">Start Free Trial</span>
//                     <motion.div
//                       className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
//                       initial={{ x: "100%" }}
//                       whileHover={{ x: 0 }}
//                       transition={{ duration: 0.3 }}
//                     />
//                   </motion.button>

//                   <motion.button
//                     className="px-8 py-4 border-2 border-purple-500 rounded-lg font-semibold hover:bg-purple-500 hover:bg-opacity-20 transition"
//                     whileHover={{
//                       scale: 1.05,
//                       boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Watch Demo
//                   </motion.button>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="md:w-1/2"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 <div className="relative">
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-30"
//                     animate={{
//                       scale: [1, 1.2, 1],
//                       opacity: [0.3, 0.5, 0.3],
//                     }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                   />

//                   <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500 border-opacity-30 rounded-3xl p-8 backdrop-blur-xl">
//                     <div className="grid grid-cols-2 gap-6">
//                       {[
//                         { icon: "📊", label: "Real-time Analytics", delay: 0 },
//                         { icon: "🔒", label: "Secure & Compliant", delay: 0.1 },
//                         { icon: "⚡", label: "Lightning Fast", delay: 0.2 },
//                         { icon: "📱", label: "Mobile Ready", delay: 0.3 },
//                       ].map((item, idx) => (
//                         <motion.div
//                           key={idx}
//                           className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500 border-opacity-20 hover:border-opacity-50 transition-all"
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: item.delay + 0.5 }}
//                           whileHover={{
//                             scale: 1.05,
//                             boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)",
//                           }}
//                         >
//                           <div className="text-4xl mb-3">{item.icon}</div>
//                           <div className="text-sm font-medium">
//                             {item.label}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="py-20 relative">
//           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900 via-opacity-10 to-transparent"></div>
//           <div className="container mx-auto px-4 relative z-10">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               {stats.map((stat, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="relative group"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                 >
//                   <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
//                   <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500 border-opacity-30 rounded-2xl p-8 text-center">
//                     <div className="text-5xl mb-3">{stat.icon}</div>
//                     <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
//                       {stat.number}
//                     </div>
//                     <div className="text-gray-400">{stat.label}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="py-20 relative">
//           <div className="container mx-auto px-4">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 Powerful Features
//               </h2>
//               <p className="text-xl text-gray-400">
//                 Everything you need to manage your assets efficiently
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {features.map((feature, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="relative group"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ y: -10 }}
//                 >
//                   <motion.div
//                     className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity`}
//                   />
//                   <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500 border-opacity-20 rounded-2xl p-8 h-full">
//                     <motion.div
//                       className="text-6xl mb-4"
//                       animate={{
//                         rotateY: [0, 360],
//                       }}
//                       transition={{
//                         duration: 20,
//                         repeat: Infinity,
//                         ease: "linear",
//                       }}
//                     >
//                       {feature.icon}
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-3 text-white">
//                       {feature.title}
//                     </h3>
//                     <p className="text-gray-400">{feature.desc}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* How It Works */}
//         <section className="py-20 relative">
//           <div className="container mx-auto px-4">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 How AssetVerse Works
//               </h2>
//               <p className="text-xl text-gray-400">
//                 Get started in three simple steps
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
//               {/* Connection Lines */}
//               <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform -translate-y-1/2"></div>

//               {[
//                 {
//                   step: "1",
//                   title: "Import Your Assets",
//                   desc: "Upload your inventory or add items manually. Bulk import supported.",
//                   color: "from-blue-500 to-cyan-500",
//                 },
//                 {
//                   step: "2",
//                   title: "Assign to Employees",
//                   desc: "Allocate assets with a click. Automated notifications sent instantly.",
//                   color: "from-purple-500 to-pink-500",
//                 },
//                 {
//                   step: "3",
//                   title: "Track & Optimize",
//                   desc: "Monitor usage, get insights, and make data-driven decisions.",
//                   color: "from-orange-500 to-red-500",
//                 },
//               ].map((item, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="relative"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.2 }}
//                 >
//                   <motion.div
//                     className={`absolute -inset-4 bg-gradient-to-br ${item.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30`}
//                     animate={{
//                       opacity: [0.2, 0.4, 0.2],
//                     }}
//                     transition={{
//                       duration: 3,
//                       repeat: Infinity,
//                       delay: idx * 0.5,
//                     }}
//                   />

//                   <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500 border-opacity-30 p-8 rounded-2xl group hover:border-opacity-70 transition-all">
//                     <motion.div
//                       className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-3xl font-bold shadow-lg`}
//                       whileHover={{ scale: 1.2, rotate: 360 }}
//                       transition={{ duration: 0.5 }}
//                     >
//                       {item.step}
//                     </motion.div>
//                     <h3 className="text-2xl font-bold mb-3 mt-8 text-white">
//                       {item.title}
//                     </h3>
//                     <p className="text-gray-400">{item.desc}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section className="py-20 relative overflow-hidden">
//           <div className="container mx-auto px-4">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 Trusted by Leading Companies
//               </h2>
//               <p className="text-xl text-gray-400">
//                 See what our customers say about us
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {testimonials.map((test, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="relative group"
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.15 }}
//                   whileHover={{ y: -10 }}
//                 >
//                   <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
//                   <div className="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500 border-opacity-30 p-8 rounded-2xl h-full">
//                     <div className="flex items-center gap-4 mb-6">
//                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold">
//                         {test.avatar}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-white">
//                           {test.person}
//                         </div>
//                         <div className="text-purple-400 text-sm">
//                           {test.company}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
//                     <p className="text-gray-300 italic">"{test.text}"</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section className="py-20">
//           <div className="container mx-auto px-4 max-w-3xl">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
//                 Frequently Asked Questions
//               </h2>
//               <p className="text-xl text-gray-400">
//                 Got questions? We've got answers
//               </p>
//             </motion.div>

//             <div className="space-y-4">
//               {faqs.map((faq, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="bg-gradient-to-br from-gray-900 to-black border border-purple-500 border-opacity-30 rounded-xl overflow-hidden"
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: idx * 0.1 }}
//                 >
//                   <motion.button
//                     className="w-full text-left p-6 font-semibold text-lg flex justify-between items-center hover:bg-purple-500 hover:bg-opacity-10 transition"
//                     onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
//                     whileHover={{ x: 10 }}
//                   >
//                     <span className="text-white">{faq.q}</span>
//                     <motion.span
//                       className="text-3xl text-purple-400"
//                       animate={{ rotate: openFAQ === idx ? 45 : 0 }}
//                     >
//                       {openFAQ === idx ? "−" : "+"}
//                     </motion.span>
//                   </motion.button>
//                   <motion.div
//                     initial={false}
//                     animate={{
//                       height: openFAQ === idx ? "auto" : 0,
//                       opacity: openFAQ === idx ? 1 : 0,
//                     }}
//                     className="overflow-hidden"
//                   >
//                     <div className="px-6 pb-6 text-gray-400">{faq.a}</div>
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 relative overflow-hidden">
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
//             animate={{
//               backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//             }}
//             transition={{ duration: 10, repeat: Infinity }}
//             style={{ backgroundSize: "200% 200%" }}
//           />
//           <div className="container mx-auto px-4 text-center relative z-10">
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl md:text-6xl font-bold mb-6">
//                 Ready to Transform Your
//                 <br />
//                 Asset Management?
//               </h2>
//               <p className="text-xl mb-8 text-blue-100">
//                 Join hundreds of companies already saving time and money with
//                 AssetVerse
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <motion.button
//                   className="px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl"
//                   whileHover={{
//                     scale: 1.05,
//                     boxShadow: "0 0 40px rgba(255, 255, 255, 0.5)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Start Free 14-Day Trial
//                 </motion.button>
//                 <motion.button
//                   className="px-10 py-5 border-2 border-white rounded-full font-bold text-lg"
//                   whileHover={{
//                     scale: 1.05,
//                     backgroundColor: "rgba(255, 255, 255, 0.2)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Schedule a Demo
//                 </motion.button>
//               </div>

//               <p className="mt-6 text-blue-100">
//                 No credit card required • Cancel anytime • 24/7 support
//               </p>
//             </motion.div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="py-12 border-t border-purple-500 border-opacity-20">
//           <div className="container mx-auto px-4 text-center text-gray-400">
//             <p>&copy; 2024 AssetVerse. All rights reserved.</p>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }
