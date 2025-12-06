// import React, { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import PackageCard from "./components/PackageCard";
// import PaymentModal from "./components/PaymentModal";
// import axios from "../../services/axios.config";
// import { useAuth } from "../../context/AuthContext";
// import toast from "react-hot-toast";

// // Initialize Stripe
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// export default function UpgradePackage() {
//   const { appUser, refreshAppUser } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [packages, setPackages] = useState([]);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [clientSecret, setClientSecret] = useState(null);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);

//   // Default packages (fallback if backend doesn't have any)
//   const defaultPackages = [
//     {
//       _id: "basic",
//       name: "Basic",
//       price: 5,
//       employeeLimit: 5,
//       features: [
//         "Up to 5 employees",
//         "Unlimited assets",
//         "Basic support",
//         "Email notifications",
//       ],
//       popular: false,
//     },
//     {
//       _id: "standard",
//       name: "Standard",
//       price: 8,
//       employeeLimit: 10,
//       features: [
//         "Up to 10 employees",
//         "Unlimited assets",
//         "Priority support",
//         "Advanced analytics",
//         "Email & SMS notifications",
//       ],
//       popular: true,
//     },
//     {
//       _id: "premium",
//       name: "Premium",
//       price: 15,
//       employeeLimit: 20,
//       features: [
//         "Up to 20 employees",
//         "Unlimited assets",
//         "24/7 Premium support",
//         "Advanced analytics & reports",
//         "All notification types",
//         "Custom integrations",
//       ],
//       popular: false,
//     },
//   ];

//   // Fetch packages from backend
//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get("/packages");
//         if (response.data && response.data.length > 0) {
//           setPackages(response.data);
//         } else {
//           setPackages(defaultPackages);
//         }
//       } catch (error) {
//         console.error("Failed to fetch packages:", error);
//         setPackages(defaultPackages);
//       }
//     };

//     fetchPackages();
//   }, []);

//   // Fetch payment history
//   useEffect(() => {
//     const fetchPaymentHistory = async () => {
//       try {
//         const response = await axios.get("/payment/history");
//         setPaymentHistory(response.data);
//       } catch (error) {
//         console.error("Failed to fetch payment history:", error);
//       }
//     };

//     if (appUser?.role === "hr") {
//       fetchPaymentHistory();
//     }
//   }, [appUser]);

//   // Handle package selection
//   const handleSelectPackage = async (pkg) => {
//     // Check if already on this package
//     if (appUser?.packageLimit === pkg.employeeLimit) {
//       toast.error("You are already on this package");
//       return;
//     }

//     // Check if downgrading
//     if (appUser?.packageLimit > pkg.employeeLimit) {
//       const confirmDowngrade = window.confirm(
//         `Are you sure you want to downgrade from ${appUser.packageLimit} to ${pkg.employeeLimit} employees? This may affect your current team.`
//       );
//       if (!confirmDowngrade) return;
//     }

//     setLoading(true);
//     try {
//       // Create payment intent
//       const response = await axios.post("/payment/create-intent", {
//         packageName: pkg.name,
//         amount: pkg.price,
//         employeeLimit: pkg.employeeLimit,
//       });

//       setClientSecret(response.data.clientSecret);
//       setSelectedPackage(pkg);
//       setShowPaymentModal(true);
//     } catch (error) {
//       console.error("Failed to create payment intent:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Failed to initiate payment. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle successful payment
//   const handlePaymentSuccess = async (paymentIntentId) => {
//     try {
//       // Confirm payment with backend
//       await axios.post("/payment/confirm", {
//         paymentIntentId,
//         packageName: selectedPackage.name,
//         employeeLimit: selectedPackage.employeeLimit,
//         amount: selectedPackage.price,
//       });

//       toast.success("Payment successful! Your package has been upgraded.");

//       // Refresh user data to get updated package info
//       await refreshAppUser();

//       // Refresh payment history
//       const historyResponse = await axios.get("/payment/history");
//       setPaymentHistory(historyResponse.data);

//       // Close modal
//       setShowPaymentModal(false);
//       setClientSecret(null);
//       setSelectedPackage(null);
//     } catch (error) {
//       console.error("Failed to confirm payment:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Payment confirmation failed. Please contact support."
//       );
//     }
//   };

//   // Handle payment cancellation
//   const handlePaymentCancel = () => {
//     setShowPaymentModal(false);
//     setClientSecret(null);
//     setSelectedPackage(null);
//     toast.info("Payment cancelled");
//   };

//   // Get current package name
//   const getCurrentPackageName = () => {
//     if (!appUser) return "Loading...";
//     const limit = appUser.packageLimit || 5;
//     const pkg = packages.find((p) => p.employeeLimit === limit);
//     return pkg ? pkg.name : appUser.subscription || "Basic";
//   };

//   // Format date
//   const formatDate = (date) => {
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-2">
//           Upgrade Your Package
//         </h2>
//         <p className="text-gray-600">
//           Choose the perfect plan for your team size
//         </p>
//       </div>

//       {/* Current Package Info */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8 shadow-sm">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 rounded-full p-3">
//               <svg
//                 className="w-6 h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Current Package</p>
//               <p className="text-xl font-bold text-gray-800 capitalize">
//                 {getCurrentPackageName()}
//               </p>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-600">Employee Limit</p>
//             <p className="text-2xl font-bold text-indigo-600">
//               {appUser?.currentEmployees || 0} / {appUser?.packageLimit || 5}
//             </p>
//           </div>
//         </div>
//         {appUser?.currentEmployees >= appUser?.packageLimit && (
//           <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
//             <p className="text-sm text-yellow-800">
//               ⚠️ You've reached your employee limit. Upgrade to add more team
//               members.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Package Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//         {packages.map((pkg) => (
//           <PackageCard
//             key={pkg._id}
//             package={pkg}
//             currentPackage={appUser?.packageLimit}
//             loading={loading}
//             onPurchase={handleSelectPackage}
//           />
//         ))}
//       </div>

//       {/* Payment History */}
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//             />
//           </svg>
//           Payment History
//         </h3>

//         {paymentHistory.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             <svg
//               className="w-16 h-16 mx-auto mb-4 text-gray-300"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <p>No payment history yet</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Package
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Employee Limit
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Transaction ID
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paymentHistory.map((payment) => (
//                   <tr key={payment._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatDate(payment.paymentDate)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {payment.packageName}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {payment.employeeLimit} employees
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
//                       ${payment.amount.toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           payment.status === "completed"
//                             ? "bg-green-100 text-green-800"
//                             : payment.status === "pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {payment.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
//                       {payment.transactionId.substring(0, 20)}...
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Payment Modal */}
//       {showPaymentModal && clientSecret && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <PaymentModal
//             clientSecret={clientSecret}
//             selectedPackage={selectedPackage}
//             onSuccess={handlePaymentSuccess}
//             onCancel={handlePaymentCancel}
//           />
//         </Elements>
//       )}
//     </div>
//   );
// }

// 222//////............................

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PackageCard from "./components/PackageCard";
import PaymentModal from "./components/PaymentModal";
import axios from "../../services/axios.config";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function UpgradePackage() {
  const { appUser, refreshAppUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Default packages (fallback if backend doesn't have any)
  const defaultPackages = [
    {
      _id: "basic",
      name: "Basic",
      price: 5,
      employeeLimit: 5,
      features: [
        "Up to 5 employees",
        "Unlimited assets",
        "Basic support",
        "Email notifications",
      ],
      popular: false,
    },
    {
      _id: "standard",
      name: "Standard",
      price: 8,
      employeeLimit: 10,
      features: [
        "Up to 10 employees",
        "Unlimited assets",
        "Priority support",
        "Advanced analytics",
        "Email & SMS notifications",
      ],
      popular: true,
    },
    {
      _id: "premium",
      name: "Premium",
      price: 15,
      employeeLimit: 20,
      features: [
        "Up to 20 employees",
        "Unlimited assets",
        "24/7 Premium support",
        "Advanced analytics & reports",
        "All notification types",
        "Custom integrations",
      ],
      popular: false,
    },
  ];

  // Fetch packages from backend
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("/packages");
        if (response.data && response.data.length > 0) {
          setPackages(response.data);
        } else {
          setPackages(defaultPackages);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
        setPackages(defaultPackages);
      }
    };

    fetchPackages();
  }, []);

  // Fetch payment history
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get("/payment/history");
        setPaymentHistory(response.data);
      } catch (error) {
        console.error("Failed to fetch payment history:", error);
      }
    };

    if (appUser?.role === "hr") {
      fetchPaymentHistory();
    }
  }, [appUser]);

  // Handle package selection
  const handleSelectPackage = async (pkg) => {
    // Check if already on this package
    if (appUser?.packageLimit === pkg.employeeLimit) {
      toast.error("You are already on this package");
      return;
    }

    // Check if downgrading
    if (appUser?.packageLimit > pkg.employeeLimit) {
      const confirmDowngrade = window.confirm(
        `Are you sure you want to downgrade from ${appUser.packageLimit} to ${pkg.employeeLimit} employees? This may affect your current team.`
      );
      if (!confirmDowngrade) return;
    }

    setLoading(true);
    try {
      // Create payment intent
      const response = await axios.post("/payment/create-intent", {
        packageName: pkg.name,
        amount: pkg.price,
        employeeLimit: pkg.employeeLimit,
      });

      setClientSecret(response.data.clientSecret);
      setSelectedPackage(pkg);
      setShowPaymentModal(true);
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to initiate payment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      // Confirm payment with backend
      await axios.post("/payment/confirm", {
        paymentIntentId,
        packageName: selectedPackage.name,
        employeeLimit: selectedPackage.employeeLimit,
        amount: selectedPackage.price,
      });

      toast.success("Payment successful! Your package has been upgraded.");

      // Refresh user data to get updated package info
      await refreshAppUser();

      // Refresh payment history
      const historyResponse = await axios.get("/payment/history");
      setPaymentHistory(historyResponse.data);

      // Close modal
      setShowPaymentModal(false);
      setClientSecret(null);
      setSelectedPackage(null);
    } catch (error) {
      console.error("Failed to confirm payment:", error);
      toast.error(
        error.response?.data?.message ||
          "Payment confirmation failed. Please contact support."
      );
    }
  };

  // Handle payment cancellation
  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
    setClientSecret(null);
    setSelectedPackage(null);
    toast.info("Payment cancelled");
  };

  // Get current package name
  const getCurrentPackageName = () => {
    if (!appUser) return "Loading...";
    const limit = appUser.packageLimit || 5;
    const pkg = packages.find((p) => p.employeeLimit === limit);
    return pkg ? pkg.name : appUser.subscription || "Basic";
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Upgrade Your Package
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Choose the perfect plan for your team size
        </p>
      </div>

      {/* Current Package Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 rounded-full p-2 sm:p-3 flex-shrink-0">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">
                Current Package
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-800 capitalize">
                {getCurrentPackageName()}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto sm:text-right">
            <p className="text-xs sm:text-sm text-gray-600">Employee Limit</p>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600">
              {appUser?.currentEmployees || 0} / {appUser?.packageLimit || 5}
            </p>
          </div>
        </div>
        {appUser?.currentEmployees >= appUser?.packageLimit && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-xs sm:text-sm text-yellow-800">
              ⚠️ You've reached your employee limit. Upgrade to add more team
              members.
            </p>
          </div>
        )}
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg._id}
            package={pkg}
            currentPackage={appUser?.packageLimit}
            loading={loading}
            onPurchase={handleSelectPackage}
          />
        ))}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span className="text-base sm:text-xl">Payment History</span>
        </h3>

        {paymentHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm sm:text-base">No payment history yet</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View - Hidden on Mobile */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Limit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(payment.paymentDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.packageName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.employeeLimit} employees
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : payment.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {payment.transactionId.substring(0, 20)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View - Shown only on Mobile/Tablet */}
            <div className="lg:hidden space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment._id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  {/* Date and Status */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(payment.paymentDate)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>

                  {/* Package Info */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Package</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {payment.packageName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        Employee Limit
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {payment.employeeLimit} employees
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Amount</p>
                    <p className="text-lg font-bold text-gray-900">
                      ${payment.amount.toFixed(2)}
                    </p>
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
                    <p className="text-xs text-gray-600 font-mono break-all">
                      {payment.transactionId}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentModal
            clientSecret={clientSecret}
            selectedPackage={selectedPackage}
            onSuccess={handlePaymentSuccess}
            onCancel={handlePaymentCancel}
          />
        </Elements>
      )}
    </div>
  );
}
