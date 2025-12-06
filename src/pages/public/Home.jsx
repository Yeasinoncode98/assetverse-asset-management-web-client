// import React from "react";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";
// import { motion } from "framer-motion";
// import heroImage from "../../assets/logo.png"; // replace with corporate hero image

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       {/* Hero Banner */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-32">
//         <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
//           <motion.div
//             className="md:w-1/2"
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Efficient Asset Management for Your Company
//             </h1>
//             <p className="mb-6 text-lg md:text-xl">
//               Track, assign, and manage all your company assets with ease.
//               Streamline your HR & asset processes today.
//             </p>
//             <button className="btn btn-primary btn-lg">Get Started</button>
//           </motion.div>

//           <motion.div
//             className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <img
//               src={heroImage}
//               alt="AssetVerse Hero"
//               className="w-80 md:w-full rounded-lg shadow-lg"
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold mb-12">Why Choose AssetVerse?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             <motion.div
//               className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="text-blue-600 text-4xl mb-4">💼</div>
//               <h3 className="font-semibold text-xl mb-2">Prevent Asset Loss</h3>
//               <p>Keep track of all company assets and ensure accountability.</p>
//             </motion.div>

//             <motion.div
//               className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="text-green-600 text-4xl mb-4">⚡</div>
//               <h3 className="font-semibold text-xl mb-2">
//                 Streamlined HR Process
//               </h3>
//               <p>
//                 Manage employees, assign assets, and approve requests with ease.
//               </p>
//             </motion.div>

//             <motion.div
//               className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="text-purple-600 text-4xl mb-4">📊</div>
//               <h3 className="font-semibold text-xl mb-2">
//                 Analytics & Reporting
//               </h3>
//               <p>
//                 Visualize your assets, requests, and employee activity
//                 efficiently.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }

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
