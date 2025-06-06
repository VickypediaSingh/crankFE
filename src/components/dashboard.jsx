// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [customers, setCustomers] = useState([]);
//   const [distributors, setDistributors] = useState([]);
//   const [recipients, setRecipients] = useState([]);
//   const [role, setRole] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const userRole = localStorage.getItem("role");
//     setRole(userRole);

//     const token = localStorage.getItem("token");

//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const roleFromStorage = localStorage.getItem("role");
//       setRole(roleFromStorage);

//       try {
//         if (roleFromStorage === "admin") {
//           const fetchRecipients = async () => {
//             const response = await fetch(
//               "http://localhost:3000/admin/get-daily-recipients",
//               {
//                 method: "POST", // ✅ This is required!
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             const data = await response.json();
//             // console.log("Recipients data:", data); // Add this to debug
//             setRecipients(data);
//           };

//           const fetchCustomers = async () => {
//             const response = await fetch("http://localhost:3000/admin/list", {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//             });
//             const data = await response.json();
//             setCustomers(data);
//           };

//           const fetchDistributors = async () => {
//             const response = await fetch(
//               "http://localhost:3000/admin/distributors-summary",
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             const data = await response.json();
//             setDistributors(data);
//           };

//           await Promise.all([
//             fetchCustomers(),
//             fetchDistributors(),
//             fetchRecipients(),
//           ]);
//         } else if (roleFromStorage === "distributor") {
//           const response = await fetch(
//             "http://localhost:3000/admin/distributor-summary",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           const data = await response.json();
//           setDistributors([data]);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const totalAssigned = distributors.reduce(
//     (sum, d) => sum + Number(d.quantity_alloted || 0),
//     0
//   );
//   const totalRemaining = distributors.reduce(
//     (sum, d) => sum + Number(d.quantity_remaining || 0),
//     0
//   );
//   const totalDistributed = totalAssigned - totalRemaining;

//   const handleDownloadMasterCSV = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:3000/admin/download-recipients",
//         // "https://crank.zeppsandbox.com/api/admin/download-recipients",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to download master CSV");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "master-ambassador-recipient.csv";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("CSV Download Error:", error);
//       alert("Failed to download master CSV");
//     }
//   };

//   const handleDownloadCSV = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:3000/admin/download-distributors",
//         // "https://crank.zeppsandbox.com/api/admin/download-distributors",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to download CSV");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "ambassadors.csv";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("CSV Download Error:", error);
//       alert("Failed to download CSV");
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#121212]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#93c740]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#121212] text-white animate-fadeIn">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h2
//           className={`text-3xl sm:text-4xl font-bold mb-3 transition-all duration-300 ${
//             role === "admin" ? "text-[#93c740]" : "text-[#f1660d]"
//           }`}
//         >
//           {role === "admin" ? "Admin Dashboard" : "Ambassador Dashboard"}
//         </h2>
//         <p className="text-lg text-gray-400 max-w-2xl mx-auto transition-all duration-300">
//           {role === "admin"
//             ? "Manage ambassadors and view analytics"
//             : "Track your distribution progress"}
//         </p>
//       </div>

//       {/* Action Cards Section */}
//       <div className="mb-12 transition-all duration-300">
//         {role === "admin" ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//             <div
//               onClick={handleDownloadMasterCSV}
//               className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#93c740] transition-all cursor-pointer flex items-center space-x-4 group relative overflow-hidden hover:shadow-lg hover:shadow-[#93c740]/10 hover:-translate-y-1"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="bg-[#93c740]/20 p-3 rounded-full group-hover:bg-[#93c740]/30 transition-colors z-10">
//                 <svg
//                   className="w-6 h-6 text-[#93c740]"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   ></path>
//                 </svg>
//               </div>
//               <div className="z-10">
//                 <h3 className="font-medium text-gray-200">Master CSV</h3>
//                 <p className="text-sm text-gray-400">
//                   Download ambassador-recipient list
//                 </p>
//               </div>
//             </div>

//             <Link to="/upload-distributors" className="group">
//               <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#93c740] transition-all flex items-center space-x-4 relative overflow-hidden hover:shadow-lg hover:shadow-[#93c740]/10 hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="bg-[#93c740]/20 p-3 rounded-full group-hover:bg-[#93c740]/30 transition-colors z-10">
//                   <svg
//                     className="w-6 h-6 text-[#93c740]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     ></path>
//                   </svg>
//                 </div>
//                 <div className="z-10">
//                   <h3 className="font-medium text-gray-200">Add Ambassador</h3>
//                   <p className="text-sm text-gray-400">
//                     Upload a new ambassador
//                   </p>
//                 </div>
//               </div>
//             </Link>
//             {/*  */}
//             <Link to="/assign-more-to-an-ambassador" className="group">
//               <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#93c740] transition-all flex items-center space-x-4 relative overflow-hidden hover:shadow-lg hover:shadow-[#93c740]/10 hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="bg-[#93c740]/20 p-3 rounded-full group-hover:bg-[#93c740]/30 transition-colors z-10">
//                   <svg
//                     className="w-6 h-6 text-[#93c740]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     ></path>
//                   </svg>
//                 </div>
//                 <div className="z-10">
//                   <h3 className="font-medium text-gray-200">
//                     Assign More Units
//                   </h3>
//                   <p className="text-sm text-gray-400">
//                     Allocate more units to an existing ambassador
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ) : (
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
//             <Link to="/create-customer" className="w-full sm:w-auto">
//               <div className="bg-gradient-to-r from-[#f1660d] to-[#e05a00] hover:from-[#f1660d]/90 hover:to-[#e05a00]/90 text-white px-8 py-4 rounded-xl shadow-lg transition-all flex items-center space-x-3 justify-center hover:scale-[1.02] active:scale-[0.98] transform hover:shadow-[#f1660d]/20">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                   ></path>
//                 </svg>
//                 <span className="font-medium">Create Recipient</span>
//               </div>
//             </Link>

//             {distributors.length > 0 && (
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
//                 <StatCard
//                   title="Units Assigned"
//                   value={distributors[0].quantity_alloted}
//                   color="blue"
//                   icon="📦"
//                 />
//                 <StatCard
//                   title="Units Sampled"
//                   value={
//                     distributors[0].quantity_alloted -
//                     distributors[0].quantity_remaining
//                   }
//                   color="green"
//                   icon="🚚"
//                 />
//                 <StatCard
//                   title="Units Remaining"
//                   value={distributors[0].quantity_remaining}
//                   color="yellow"
//                   icon="⏳"
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Admin View Summary */}
//       {role === "admin" && (
//         <>
//           <div className="mb-10 transition-all duration-300">
//             <h3 className="text-2xl font-semibold text-gray-200 mb-6">
//               Distribution Overview
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               {/* <StatCard
//                 title="Total Ambassadors"
//                 value={distributors.length}
//                 color="purple"
//                 icon="👥"
//               /> */}
//               <StatCard
//                 title="Total Units Assigned"
//                 value={totalAssigned}
//                 color="blue"
//                 icon="📦"
//               />
//               <StatCard
//                 title="Total Units Sampled"
//                 value={totalDistributed}
//                 color="green"
//                 icon="🚚"
//               />
//               <StatCard
//                 title="Total Units Remaining"
//                 value={totalRemaining}
//                 color="yellow"
//                 icon="⏳"
//               />
//             </div>
//           </div>

//           {/* Ambassador Table */}
//           <div className="mb-10 transition-all duration-300">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <h3 className="text-2xl font-semibold text-gray-200">
//                 Ambassadors' Summary ({distributors.length})
//               </h3>
//               <button
//                 onClick={handleDownloadCSV}
//                 className="flex items-center space-x-2 bg-[#1e1e1e] border border-[#2e2e2e] text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-[#2e2e2e] hover:text-white transition-colors shadow-sm hover:scale-[1.03] active:scale-[0.98] hover:border-[#93c740]"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                   ></path>
//                 </svg>
//                 <span>Export CSV</span>
//               </button>
//             </div>

//             <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#93c740]/10">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-[#2e2e2e]">
//                   <thead className="bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Phone
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Assigned
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Sampled
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Remaining
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-[#1e1e1e] divide-y divide-[#2e2e2e]">
//                     {distributors.length > 0 ? (
//                       distributors.map((d) => (
//                         <tr
//                           key={d.id}
//                           className="hover:bg-[#2e2e2e] transition-colors duration-200"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="font-medium text-white">
//                               {d.name}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                             {d.mobile_number}
//                           </td>
//                           <td className="px-6 py-4 text-center text-gray-400">
//                             {d.quantity_alloted}
//                           </td>
//                           <td className="px-6 py-4 text-center font-medium text-[#93c740]">
//                             {d.quantity_alloted - d.quantity_remaining}
//                           </td>
//                           <td className="px-6 py-4 text-center text-gray-400">
//                             {d.quantity_remaining}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="px-6 py-8 text-center text-gray-500 italic"
//                         >
//                           No Ambassadors Found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           {/* Recipient Table */}
//           <div className="mb-10 transition-all duration-300">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <h3 className="text-2xl font-semibold text-gray-200">
//                 Daily Recipients' Summary ({recipients.length})
//               </h3>
//             </div>
//             <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#93c740]/10">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-[#2e2e2e]">
//                   <thead className="bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Date/Time
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Ambassador Name
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Ambassador Phone
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Recipient Name
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                         Recipient Phone
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-[#1e1e1e] divide-y divide-[#2e2e2e]">
//                     {recipients.length > 0 ? (
//                       recipients.map((r, index) => {
//                         // Parse and format the date
//                         const [datePart, timePart] =
//                           r.date_time_received.split(", ");
//                         const [day, month, year] = datePart.split("/");
//                         const date = new Date(
//                           `${month}/${day}/${year} ${timePart}`
//                         );

//                         const formattedDateTime =
//                           date.toLocaleDateString("en-GB", {
//                             day: "numeric",
//                             month: "long",
//                             year: "numeric",
//                           }) +
//                           " at " +
//                           date.toLocaleTimeString("en-US", {
//                             hour: "numeric",
//                             minute: "2-digit",
//                           });

//                         return (
//                           <tr
//                             key={index}
//                             className="hover:bg-[#2e2e2e] transition-colors duration-200"
//                           >
//                             <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                               {formattedDateTime}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-white">
//                               {r.ambassador_name}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                               {r.ambassador_phone}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-white">
//                               {r.recipient_name}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                               {r.recipient_phone}
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="px-6 py-8 text-center text-gray-500 italic"
//                         >
//                           No Recipients Found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// function StatCard({ title, value, color, icon }) {
//   const colorMap = {
//     purple: {
//       bg: "bg-[#1e1e1e]",
//       border: "border-[#2e2e2e] hover:border-purple-500",
//       text: "text-purple-400",
//       iconBg: "bg-purple-500/20",
//       hover: "hover:shadow-purple-500/10",
//     },
//     blue: {
//       bg: "bg-[#1e1e1e]",
//       border: "border-[#2e2e2e] hover:border-blue-500",
//       text: "text-blue-400",
//       iconBg: "bg-blue-500/20",
//       hover: "hover:shadow-blue-500/10",
//     },
//     green: {
//       bg: "bg-[#1e1e1e]",
//       border: "border-[#2e2e2e] hover:border-[#93c740]",
//       text: "text-[#93c740]",
//       iconBg: "bg-[#93c740]/20",
//       hover: "hover:shadow-[#93c740]/10",
//     },
//     yellow: {
//       bg: "bg-[#1e1e1e]",
//       border: "border-[#2e2e2e] hover:border-yellow-500",
//       text: "text-yellow-400",
//       iconBg: "bg-yellow-500/20",
//       hover: "hover:shadow-yellow-500/10",
//     },
//   };

//   return (
//     <div
//       className={`p-6 rounded-xl border ${colorMap[color].border} ${colorMap[color].bg} transition-all duration-300 hover:-translate-y-1 ${colorMap[color].hover} hover:shadow-lg`}
//     >
//       <div className="flex items-center space-x-4">
//         <div
//           className={`p-3 rounded-full ${colorMap[color].iconBg} transition-colors duration-300`}
//         >
//           <span className="text-xl">{icon}</span>
//         </div>
//         <div>
//           <h4 className="text-sm font-medium text-gray-400">{title}</h4>
//           <div className={`text-2xl font-bold ${colorMap[color].text}`}>
//             {value}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  // const crankURL = "http://localhost:3000";
  const crankURL = "https://crank.zeppsandbox.com/api";
  const [distributors, setDistributors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const roleFromStorage = localStorage.getItem("role");
      setRole(roleFromStorage);

      try {
        if (roleFromStorage === "admin") {
          const [distributorsRes, recipientsRes] = await Promise.all([
            fetch(`${crankURL}/admin/distributors-summary`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${crankURL}/admin/get-daily-recipients`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          setDistributors(await distributorsRes.json());
          setRecipients(await recipientsRes.json());
        } else if (roleFromStorage === "distributor") {
          const response = await fetch(
            `${crankURL}/admin/distributor-summary`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setDistributors([await response.json()]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalAssigned = distributors.reduce(
    (sum, d) => sum + Number(d.quantity_alloted || 0),
    0
  );
  const totalRemaining = distributors.reduce(
    (sum, d) => sum + Number(d.quantity_remaining || 0),
    0
  );
  const totalDistributed = totalAssigned - totalRemaining;

  const handleDownloadMasterCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${crankURL}/admin/download-recipients`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to download master CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "master-ambassador-recipient.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download Error:", error);
      alert("Failed to download master CSV");
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${crankURL}/admin/download-distributors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to download CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ambassadors.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download Error:", error);
      alert("Failed to download CSV");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#2E2E2E]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#93c740]"></div>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#2E2E2E] text-[#F7F7F7] relative">
      {/* <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0 py-0 min-h-screen bg-[#2E2E2E] text-[#F7F7F7] relative"> */}
      {/* Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="text-[40vw] sm:text-[30vw] md:text-[25vw] font-black opacity-[0.03] text-[#F7F7F7]"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          CRANK
        </h1>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              color: role === "admin" ? "#93c740" : "#f1660d",
              fontFamily: "'Archivo Black', sans-serif",
            }}
          >
            {role === "admin" ? "Admin Dashboard" : "Ambassador Dashboard"}
          </h2>
          <p className="text-lg text-[#BDBDBD] max-w-2xl mx-auto">
            {role === "admin"
              ? "Manage ambassadors and view analytics"
              : "Track your distribution progress"}
          </p>
        </div>

        {/* Admin View */}
        {role === "admin" ? (
          <>
            {/* Top Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Master CSV Card - Blue */}
              <div
                onClick={handleDownloadMasterCSV}
                className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#45c4ed]/30 transition-all cursor-pointer hover:bg-[#45c4ed]/10 hover:shadow-lg hover:shadow-[#45c4ed]/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#45c4ed]/20 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-[#45c4ed]"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 17V11L7 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#F7F7F7]">Master CSV</h3>
                    <p className="text-sm text-[#BDBDBD]">
                      Download complete recipient database
                    </p>
                  </div>
                </div>
              </div>

              {/* Add Ambassador Card - Green */}
              <Link to="/upload-distributors">
                <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#93c740]/30 transition-all hover:bg-[#93c740]/10 hover:shadow-lg hover:shadow-[#93c740]/20">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#93c740]/20 p-3 rounded-full">
                      <svg
                        className="w-6 h-6 text-[#93c740]"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16V8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#F7F7F7]">
                        Add Ambassador
                      </h3>
                      <p className="text-sm text-[#BDBDBD]">
                        Register a new ambassador in dashboard
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Assign Units Card - Orange */}
              <Link to="/assign-more-to-an-ambassador">
                <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#f1660d]/30 transition-all hover:bg-[#f1660d]/10 hover:shadow-lg hover:shadow-[#f1660d]/20">
                  <div className="flex items-center space-x-4">
                    <div className="bg-[#f1660d]/20 p-3 rounded-full">
                      <svg
                        className="w-6 h-6 text-[#f1660d]"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18 18L6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-[#F7F7F7]">
                        Manage Product Units
                      </h3>
                      <p className="text-sm text-[#BDBDBD]">
                        Allocate or deduct units for ambassadors
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {/* Partition Line */}
            <div className="border-t border-[#BDBDBD]/20 mb-12"></div>
            {/*  */}
            <h3 className="text-2xl font-semibold text-gray-200 mb-6">
              Distribution Overview
            </h3>
            {/*  */}
            {/* Distribution Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {/* Assigned - Blue */}
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#45c4ed]/30 transition-all hover:bg-[#45c4ed]/10 hover:shadow-lg hover:shadow-[#45c4ed]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#45c4ed]/20 p-3 rounded-full text-2xl">
                    📦
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#BDBDBD]">
                      Total Units Assigned
                    </h4>
                    <div className="text-2xl font-bold text-[#45c4ed]">
                      {totalAssigned}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sampled - Green */}
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#93c740]/30 transition-all hover:bg-[#93c740]/10 hover:shadow-lg hover:shadow-[#93c740]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#93c740]/20 p-3 rounded-full text-2xl">
                    🚚
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#BDBDBD]">
                      Total Units Sampled
                    </h4>
                    <div className="text-2xl font-bold text-[#93c740]">
                      {totalDistributed}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining - Orange */}
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#f1660d]/30 transition-all hover:bg-[#f1660d]/10 hover:shadow-lg hover:shadow-[#f1660d]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#f1660d]/20 p-3 rounded-full text-2xl">
                    ⏳
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#BDBDBD]">
                      Total Units Remaining
                    </h4>
                    <div className="text-2xl font-bold text-[#f1660d]">
                      {totalRemaining}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Partition Line */}
            <div className="border-t border-[#BDBDBD]/20 mb-12"></div>
            {/* Ambassadors Table */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-2xl font-semibold text-[#F7F7F7]">
                  Ambassadors' Summary ({distributors.length})
                </h3>
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center space-x-2 bg-[#93c740]/100 hover:bg-[#f1660d]/100 text-[#2E2E2E] px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 17V11L7 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11L11 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm rounded-xl border border-[#BDBDBD]/20 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#BDBDBD]/20">
                    <thead className="bg-[#93c740]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Phone
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Assigned
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Sampled
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Remaining
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#BDBDBD]/20 bg-[#2E2E2E]/60">
                      {distributors.length > 0 ? (
                        distributors.map((d) => (
                          <tr
                            key={d.id}
                            className="hover:bg-[#2E2E2E]/80 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-[#F7F7F7]">
                              {d.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-[#BDBDBD]">
                              {d.mobile_number}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-[#BDBDBD]">
                              {d.quantity_alloted}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-[#93c740] font-medium">
                              {d.quantity_alloted - d.quantity_remaining}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-[#BDBDBD]">
                              {d.quantity_remaining}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-8 text-center text-[#BDBDBD] italic"
                          >
                            No Ambassadors Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Partition Line */}
            <div className="border-t border-[#BDBDBD]/20 mb-12"></div>
            {/* Recipients Table */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-2xl font-semibold text-[#F7F7F7]">
                  Daily Recipients' Summary ({recipients.length})
                </h3>
              </div>
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm rounded-xl border border-[#BDBDBD]/20 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#BDBDBD]/20">
                    <thead className="bg-[#93c740]">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Date/Time
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Ambassador Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Ambassador Phone
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Recipient Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-[#2E2E2E] uppercase tracking-wider whitespace-nowrap">
                          Recipient Phone
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#BDBDBD]/20 bg-[#2E2E2E]/60">
                      {recipients.length > 0 ? (
                        recipients.map((r, index) => {
                          const [datePart, timePart] =
                            r.date_time_received.split(", ");
                          const [day, month, year] = datePart.split("/");
                          const date = new Date(
                            `${month}/${day}/${year} ${timePart}`
                          );
                          const formattedDateTime =
                            date.toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }) +
                            " at " +
                            date.toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            });

                          return (
                            <tr
                              key={index}
                              className="hover:bg-[#2E2E2E]/80 transition-colors duration-200"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-[#BDBDBD]">
                                {formattedDateTime}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-[#F7F7F7]">
                                {r.ambassador_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-[#BDBDBD]">
                                {r.ambassador_phone}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-[#F7F7F7]">
                                {r.recipient_name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-[#BDBDBD]">
                                {r.recipient_phone}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="px-6 py-8 text-center text-[#BDBDBD] italic"
                          >
                            No Recipients Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Ambassador View */
          <>
            {/* Ambassador Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {/* Assigned - Blue */}
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#45c4ed]/30 transition-all hover:bg-[#45c4ed]/10 hover:shadow-lg hover:shadow-[#45c4ed]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#45c4ed]/20 p-3 rounded-full text-2xl">
                    📦
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#BDBDBD]">
                      Units Assigned
                    </h4>
                    <div className="text-2xl font-bold text-[#45c4ed]">
                      {distributors[0]?.quantity_alloted || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sampled - Green */}
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#93c740]/30 transition-all hover:bg-[#93c740]/10 hover:shadow-lg hover:shadow-[#93c740]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#93c740]/20 p-3 rounded-full text-2xl">
                    🚚
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#BDBDBD]">
                      Units Sampled
                    </h4>
                    <div className="text-2xl font-bold text-[#93c740]">
                      {distributors[0]?.quantity_alloted -
                        distributors[0]?.quantity_remaining || 0}
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining - Orange */}
              <div className="bg-[#2E2E2E]/80 backdrop-blur-sm p-6 rounded-xl border border-[#f1660d]/30 transition-all hover:bg-[#f1660d]/10 hover:shadow-lg hover:shadow-[#f1660d]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#f1660d]/20 p-3 rounded-full text-2xl">
                    ⏳
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#BDBDBD]">
                      Units Remaining
                    </h4>
                    <div className="text-2xl font-bold text-[#f1660d]">
                      {distributors[0]?.quantity_remaining || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partition Line */}
            <div className="border-t border-[#BDBDBD]/20 mb-12"></div>

            {/* Create Recipient Button */}
            <div className="flex justify-center mb-12">
              <Link to="/create-customer" className="w-full sm:w-auto">
                <div className="bg-[#f1660d] hover:bg-[#f1660d]/90 text-white px-8 py-4 rounded-xl shadow-lg transition-all flex items-center space-x-3 justify-center hover:scale-[1.02] active:scale-[0.98] transform hover:shadow-[#f1660d]/20">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="font-medium">Create Recipient</span>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
