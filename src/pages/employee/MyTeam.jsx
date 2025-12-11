// import React, { useState, useEffect, useCallback } from "react";
// import axios from "../../services/axios.config";
// import { toast } from "react-hot-toast";

// export default function MyTeam() {
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompanyId, setSelectedCompanyId] = useState("");
//   const [teammates, setTeammates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);

//   // Use useCallback to memoize the fetchTeammates function
//   const fetchTeammates = useCallback(
//     async (companyId) => {
//       // Only show the spinner if it's not the very initial load,
//       // as the initial load is handled by the main 'loading' state.
//       if (!isInitialLoad) {
//         setLoading(true);
//       }
//       setTeammates([]); // Clear previous team members

//       if (!companyId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // ✅ GET TEAM MEMBERS FROM BACKEND
//         const response = await axios.get(`/employee/team/${companyId}`);
//         const teammatesData = response.data;

//         console.log("👥 Fetched teammates:", teammatesData);

//         setTeammates(teammatesData);
//       } catch (error) {
//         console.error("❌ Error fetching teammates:", error);
//         toast.error(
//           error.response?.data?.message || "Failed to load team members"
//         );
//         setTeammates([]);
//       } finally {
//         setLoading(false);
//         setIsInitialLoad(false);
//       }
//     },
//     [isInitialLoad] // Dependency: update if initial load state changes
//   );

//   const fetchCompanies = async () => {
//     try {
//       // ✅ GET USER'S COMPANIES FROM BACKEND
//       const response = await axios.get("/employee/my-companies");
//       const companiesData = response.data;

//       console.log("📦 Fetched companies:", companiesData);

//       setCompanies(companiesData);

//       // ✅ AUTO-SELECT FIRST COMPANY
//       if (companiesData.length > 0) {
//         const firstCompanyId = companiesData[0].id;
//         setSelectedCompanyId(firstCompanyId);
//       } else {
//         // If no companies, stop loading immediately
//         setLoading(false);
//         setIsInitialLoad(false);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching companies:", error);
//       toast.error(error.response?.data?.message || "Failed to load companies");
//       setCompanies([]);
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   };

//   // 1. Initial Data Fetch: Get companies.
//   useEffect(() => {
//     fetchCompanies();
//   }, []); // Runs once on mount

//   // 2. Team Member Fetch: Triggers when selectedCompanyId changes (including initial auto-select).
//   useEffect(() => {
//     if (selectedCompanyId) {
//       fetchTeammates(selectedCompanyId);
//     }
//   }, [selectedCompanyId, fetchTeammates]);

//   const handleCompanyChange = (e) => {
//     const companyId = e.target.value;
//     setSelectedCompanyId(companyId);
//     // The useEffect above will handle calling fetchTeammates(companyId)
//   };

//   const getUpcomingBirthdays = () => {
//     const currentMonth = new Date().getMonth();
//     return teammates.filter((member) => {
//       if (!member.birthday) return false;
//       const birthday = new Date(member.birthday);
//       return birthday.getMonth() === currentMonth;
//     });
//   };

//   const upcomingBirthdays = getUpcomingBirthdays();

//   // --- RENDER LOGIC ---

//   // ✅ LOADING STATE (Covers both company and initial team member load)
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen px-4">
//         <div className="text-center">
//           <div className="loading loading-spinner loading-lg text-blue-600"></div>
//           <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base">
//             Loading team members...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ NO COMPANIES STATE
//   if (companies.length === 0) {
//     return (
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
//           My Team 👥
//         </h2>
//         <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-gray-200">
//           <svg
//             className="w-16 h-16 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mx-auto text-gray-300 mb-4 sm:mb-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//             />
//           </svg>
//           <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
//             No Company Affiliations
//           </h3>
//           <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-2">
//             You are not currently affiliated with any company. Please contact
//             your HR to get added to a team.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//       {/* Page Header */}
//       <div className="mb-6 sm:mb-8 lg:mb-10">
//         <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2 tracking-tight">
//           My Team 👥
//         </h2>
//         <p className="text-sm sm:text-base lg:text-lg text-gray-500">
//           View your colleagues and stay connected with your team.
//         </p>
//       </div>

//       {/* Company Selector */}
//       {companies.length > 0 && (
//         <div className="mb-6 sm:mb-8 bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
//           <label className="label">
//             <span className="label-text font-bold text-gray-700 text-base sm:text-lg flex items-center gap-2">
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//               Select Company
//             </span>
//           </label>
//           <select
//             value={selectedCompanyId}
//             onChange={handleCompanyChange}
//             className="select select-bordered w-full text-sm sm:text-base mt-2 p-2 sm:p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//           >
//             {companies.map((company) => (
//               <option key={company.id} value={company.id}>
//                 {company.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Upcoming Birthdays Section */}
//       {upcomingBirthdays.length > 0 && (
//         <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-10 shadow-2xl border border-purple-400">
//           <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
//             🎉 Upcoming Birthdays This Month
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
//             {upcomingBirthdays.map((member) => (
//               <div
//                 key={member.id}
//                 className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center gap-3 sm:gap-4 border border-white/30 hover:bg-white/30 transition-all shadow-lg"
//               >
//                 <img
//                   src={
//                     member.photo ||
//                     `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       member.name
//                     )}&size=100&background=random&color=fff&bold=true`
//                   }
//                   alt={member.name}
//                   onError={(e) => {
//                     e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                       member.name
//                     )}&size=100&background=random&color=fff&bold=true`;
//                   }}
//                   className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white shadow-lg object-cover flex-shrink-0"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="font-extrabold text-base sm:text-lg truncate">
//                     {member.name}
//                   </p>
//                   <p className="text-xs sm:text-sm opacity-95 font-semibold truncate">
//                     🎂{" "}
//                     {new Date(member.birthday).toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Team Members Grid or No Team Members Message */}
//       {teammates.length === 0 ? (
//         <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-gray-200">
//           <svg
//             className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-3 sm:mb-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M12 4.5v15m7.5-7.5h-15"
//             />
//           </svg>
//           <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
//             No Team Members Yet
//           </h3>
//           <p className="text-base sm:text-lg text-gray-500 px-2">
//             There are currently no other team members in this company.
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* Team Stats */}
//           <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="bg-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 flex-shrink-0">
//                 <svg
//                   className="w-6 h-6 sm:w-8 sm:h-8 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                   />
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm sm:text-base text-gray-600 font-semibold">
//                   Total Team Members
//                 </p>
//                 <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700">
//                   {teammates.length}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Team Members Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {teammates.map((member) => (
//               <div
//                 key={member.id}
//                 className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group"
//               >
//                 <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 h-20 sm:h-28">
//                   <div className="absolute inset-0 bg-black/10"></div>
//                 </div>

//                 <div className="relative px-4 sm:px-6 pb-4 sm:pb-6 -mt-12 sm:-mt-16">
//                   {/* Member Photo */}
//                   <div className="flex justify-center mb-3 sm:mb-4">
//                     <img
//                       src={
//                         member.photo ||
//                         `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                           member.name
//                         )}&size=150&background=random&color=fff&bold=true`
//                       }
//                       alt={member.name}
//                       onError={(e) => {
//                         e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                           member.name
//                         )}&size=150&background=random&color=fff&bold=true`;
//                       }}
//                       className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-3 sm:border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>

//                   {/* Member Info */}
//                   <div className="text-center">
//                     <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1 truncate px-1">
//                       {member.name}
//                     </h3>
//                     <p className="text-blue-600 font-bold text-xs sm:text-sm mb-2 sm:mb-3 truncate px-1">
//                       {member.position || "Employee"}
//                     </p>

//                     {/* Email */}
//                     <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 bg-gray-50 rounded-lg p-2">
//                       <svg
//                         className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                         />
//                       </svg>
//                       <p className="text-gray-600 text-xs truncate">
//                         {member.email}
//                       </p>
//                     </div>

//                     {/* Birthday Info */}
//                     {member.birthday && (
//                       <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-purple-200">
//                         <div className="flex justify-between items-center gap-2">
//                           <span className="text-gray-600 text-xs sm:text-sm font-semibold flex items-center gap-1">
//                             🎂 Birthday
//                           </span>
//                           <span className="font-bold text-xs sm:text-sm text-purple-700">
//                             {new Date(member.birthday).toLocaleDateString(
//                               "en-US",
//                               {
//                                 month: "short",
//                                 day: "numeric",
//                               }
//                             )}
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// 2...................
import React, { useState, useEffect, useCallback } from "react";
import axios from "../../services/axios.config";
import { toast } from "react-hot-toast";

export default function MyTeam() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Use useCallback to memoize the fetchTeammates function
  const fetchTeammates = useCallback(
    async (companyId) => {
      // Only show the spinner if it's not the very initial load,
      // as the initial load is handled by the main 'loading' state.
      if (!isInitialLoad) {
        setLoading(true);
      }
      setTeammates([]); // Clear previous team members

      if (!companyId) {
        setLoading(false);
        return;
      }

      try {
        // ✅ GET TEAM MEMBERS FROM BACKEND
        const response = await axios.get(`/employee/team/${companyId}`);
        const teammatesData = response.data;

        console.log("👥 Fetched teammates:", teammatesData);

        setTeammates(teammatesData);
      } catch (error) {
        console.error("❌ Error fetching teammates:", error);
        toast.error(
          error.response?.data?.message || "Failed to load team members"
        );
        setTeammates([]);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    },
    [isInitialLoad] // Dependency: update if initial load state changes
  );

  const fetchCompanies = async () => {
    try {
      // ✅ GET USER'S COMPANIES FROM BACKEND
      const response = await axios.get("/employee/my-companies");
      const companiesData = response.data;

      console.log("📦 Fetched companies:", companiesData);

      setCompanies(companiesData);

      // ✅ AUTO-SELECT FIRST COMPANY
      if (companiesData.length > 0) {
        const firstCompanyId = companiesData[0].id;
        setSelectedCompanyId(firstCompanyId);
      } else {
        // If no companies, stop loading immediately
        setLoading(false);
        setIsInitialLoad(false);
      }
    } catch (error) {
      console.error("❌ Error fetching companies:", error);
      toast.error(error.response?.data?.message || "Failed to load companies");
      setCompanies([]);
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  // 1. Initial Data Fetch: Get companies.
  useEffect(() => {
    fetchCompanies();
  }, []); // Runs once on mount

  // 2. Team Member Fetch: Triggers when selectedCompanyId changes (including initial auto-select).
  useEffect(() => {
    if (selectedCompanyId) {
      fetchTeammates(selectedCompanyId);
    }
  }, [selectedCompanyId, fetchTeammates]);

  const handleCompanyChange = (e) => {
    const companyId = e.target.value;
    setSelectedCompanyId(companyId);
    // The useEffect above will handle calling fetchTeammates(companyId)
  };

  const getUpcomingBirthdays = () => {
    const currentMonth = new Date().getMonth();
    return teammates.filter((member) => {
      if (!member.birthday) return false;
      const birthday = new Date(member.birthday);
      return birthday.getMonth() === currentMonth;
    });
  };

  const upcomingBirthdays = getUpcomingBirthdays();

  // --- RENDER LOGIC ---

  // ✅ LOADING STATE (Covers both company and initial team member load)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base">
            Loading team members...
          </p>
        </div>
      </div>
    );
  }

  // ✅ NO COMPANIES STATE
  if (companies.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
          My Team 👥
        </h2>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-gray-200">
          <svg
            className="w-16 h-16 sm:w-20 lg:w-24 sm:h-20 lg:h-24 mx-auto text-gray-300 mb-4 sm:mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
            No Company Affiliations
          </h3>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 px-2">
            You are not currently affiliated with any company. Please contact
            your HR to get added to a team.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black mb-1 sm:mb-2 tracking-tight">
          My Team 👥
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-green-500">
          View your colleagues and stay connected with your team.
        </p>
      </div>

      {/* Company Selector */}
      {companies.length > 0 && (
        <div className="mb-6 sm:mb-8 bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
          <label className="label">
            <span className="label-text font-bold text-gray-700 text-base sm:text-lg flex items-center gap-2">
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Select Company
            </span>
          </label>
          <select
            value={selectedCompanyId}
            onChange={handleCompanyChange}
            className="select select-bordered w-full text-sm sm:text-base mt-2 p-2 sm:p-3 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Upcoming Birthdays Section */}
      {upcomingBirthdays.length > 0 && (
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-10 shadow-2xl border border-purple-400">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            🎉 Upcoming Birthdays This Month
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {upcomingBirthdays.map((member) => (
              <div
                key={member.id}
                className="bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-5 flex items-center gap-3 sm:gap-4 border border-white/30 hover:bg-white/30 transition-all shadow-lg"
              >
                <img
                  src={
                    member.photo ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name
                    )}&size=100&background=random&color=fff&bold=true`
                  }
                  alt={member.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member.name
                    )}&size=100&background=random&color=fff&bold=true`;
                  }}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white shadow-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-base sm:text-lg truncate">
                    {member.name}
                  </p>
                  <p className="text-xs sm:text-sm opacity-95 font-semibold truncate">
                    🎂{" "}
                    {new Date(member.birthday).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members Grid or No Team Members Message */}
      {teammates.length === 0 ? (
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-gray-200">
          <svg
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-300 mb-3 sm:mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
            No Team Members Yet
          </h3>
          <p className="text-base sm:text-lg text-gray-500 px-2">
            There are currently no other team members in this company.
          </p>
        </div>
      ) : (
        <>
          {/* Team Stats */}
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-200">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="bg-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-gray-600 font-semibold">
                  Total Team Members
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-700">
                  {teammates.length}
                </p>
              </div>
            </div>
          </div>

          {/* Team Members Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {teammates.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group"
              >
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 h-20 sm:h-28">
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="relative px-4 sm:px-6 pb-4 sm:pb-6 -mt-12 sm:-mt-16">
                  {/* Member Photo */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <img
                      src={
                        member.photo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&size=150&background=random&color=fff&bold=true`
                      }
                      alt={member.name}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          member.name
                        )}&size=150&background=random&color=fff&bold=true`;
                      }}
                      className="w-20 h-20 sm:w-28 sm:h-28 rounded-full object-cover border-3 sm:border-4 border-white shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1 truncate px-1">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-bold text-xs sm:text-sm mb-2 sm:mb-3 truncate px-1">
                      {member.position || "Employee"}
                    </p>

                    {/* Email */}
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4 bg-gray-50 rounded-lg p-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-gray-600 text-xs truncate">
                        {member.email}
                      </p>
                    </div>

                    {/* Birthday Info */}
                    {member.birthday && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-purple-200">
                        <div className="flex justify-between items-center gap-2">
                          <span className="text-gray-600 text-xs sm:text-sm font-semibold flex items-center gap-1">
                            🎂 Birthday
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-purple-700">
                            {new Date(member.birthday).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
