//  import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [customers, setCustomers] = useState([]);
//   const [distributors, setDistributors] = useState([]);
//   const [role, setRole] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const userRole = localStorage.getItem("role");
//     setRole(userRole);

//     const token = localStorage.getItem("token");

//     const fetchData = async () => {
//       try {
//         if (userRole === "admin") {
//           const fetchCustomers = async () => {
//             const response = await fetch("http://localhost:3000/admin/list", {
//             // const response = await fetch("https://crank.zeppsandbox.com/api/admin/list", {
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
//               // "https://crank.zeppsandbox.com/api/admin/distributors-summary",

//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             const data = await response.json();
//             setDistributors(data);
//           };

//           await Promise.all([fetchCustomers(), fetchDistributors()]);
//         } else if (userRole === "distributor") {
//           const response = await fetch(
//             "http://localhost:3000/admin/distributor-summary",
//             // "https://crank.zeppsandbox.com/api/admin/distributor-summary",
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
//       // a.download = "master-distributior.csv";
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
//       // a.download = "distributors.csv";
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
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen transition-opacity duration-300">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 transition-all duration-300">
//           {role === "admin" ? "Admin Dashboard" : "Ambassador Dashboard"}
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-300">
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
//               className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer flex items-center space-x-4 group relative overflow-hidden hover:-translate-y-1"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-200 transition-colors z-10">
//                 <svg
//                   className="w-6 h-6 text-purple-600"
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
//                 <h3 className="font-medium text-gray-800">Master CSV</h3>
//                 <p className="text-sm text-gray-500">
//                   Download ambassador-recipient list
//                 </p>
//               </div>
//             </div>

//             <Link
//               to="/upload-distributors"
//               className="group"
//             >
//               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all flex items-center space-x-4 relative overflow-hidden hover:-translate-y-1">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors z-10">
//                   <svg
//                     className="w-6 h-6 text-blue-600"
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
//                   <h3 className="font-medium text-gray-800">Add Ambassador</h3>
//                   <p className="text-sm text-gray-500">Upload a new ambassador</p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ) : (
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
//             <Link
//               to="/create-customer"
//               className="w-full sm:w-auto"
//             >
//               <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all flex items-center space-x-3 justify-center hover:scale-[1.02] active:scale-[0.98]">
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
//                   icon="💰"
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
//             <h3 className="text-2xl font-semibold text-gray-800 mb-6">
//               Distribution Overview
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               <StatCard
//                 title="Total Units Assigned"
//                 value={totalAssigned}
//                 color="blue"
//                 icon="📊"
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
//                 icon="📦"
//               />
//             </div>
//           </div>

//           {/* Distributor Table */}
//           <div className="mb-10 transition-all duration-300">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <h3 className="text-2xl font-semibold text-gray-800">
//                 Ambassadors Summary
//               </h3>
//               <button
//                 onClick={handleDownloadCSV}
//                 className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-sm hover:scale-[1.03] active:scale-[0.98]"
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

//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                         Name
//                       </th>
//                       <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
//                         Phone
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
//                         Assigned
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
//                         Remaining
//                       </th>
//                       <th className="px-6 py-4 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
//                         Distributed
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {distributors.length > 0 ? (
//                       distributors.map((d) => (
//                         <tr
//                           key={d.id}
//                           className="hover:bg-gray-50 transition-colors"
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="font-medium text-gray-900">
//                               {d.name}
//                             </div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                             {d.mobile_number}
//                           </td>
//                           <td className="px-6 py-4 text-center text-gray-500">
//                             {d.quantity_alloted}
//                           </td>
//                           <td className="px-6 py-4 text-center text-gray-500">
//                             {d.quantity_remaining}
//                           </td>
//                           <td className="px-6 py-4 text-center font-medium text-green-600">
//                             {d.quantity_alloted - d.quantity_remaining}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td
//                           colSpan="5"
//                           className="px-6 py-8 text-center text-gray-500 italic"
//                         >
//                           No ambassadors found
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
//     </div>
//   );
// }

// function StatCard({ title, value, color, icon }) {
//   const colorClasses = {
//     blue: {
//       bg: "from-blue-50 to-indigo-50",
//       text: "text-blue-600",
//       iconBg: "bg-blue-100"
//     },
//     green: {
//       bg: "from-green-50 to-teal-50",
//       text: "text-green-600",
//       iconBg: "bg-green-100"
//     },
//     yellow: {
//       bg: "from-yellow-50 to-amber-50",
//       text: "text-yellow-600",
//       iconBg: "bg-yellow-100"
//     },
//   };

//   return (
//     <div className={`bg-gradient-to-br ${colorClasses[color].bg} p-6 rounded-xl shadow-sm border border-gray-200 flex items-center space-x-4 relative overflow-hidden hover:scale-[1.03] transition-transform duration-300`}>
//       <div className={`p-3 rounded-full ${colorClasses[color].iconBg}`}>
//         <span className="text-xl">{icon}</span>
//       </div>
//       <div>
//         <h4 className="text-sm font-medium text-gray-600">{title}</h4>
//         <div className={`text-2xl font-bold ${colorClasses[color].text}`}>{value}</div>
//       </div>
//       <div className="absolute -right-4 -bottom-4 opacity-10">
//         <span className="text-6xl">{icon}</span>
//       </div>
//     </div>
//   );
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [distributors, setDistributors] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    const token = localStorage.getItem("token");

    // const fetchData = async () => {
    //   try {
    //     if (userRole === "admin") {
    //       const fetchRecipients = async () => {
    //         const response = await fetch(
    //           "http://localhost:3000/admin/get-daily-recipients",
    //           // "https://crank.zeppsandbox.com/api/admin/get-daily-recipients",
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );
    //         const data = await response.json();
    //         setRecipients(data);
    //       };
    //       //
    //       const fetchCustomers = async () => {
    //         const response = await fetch("http://localhost:3000/admin/list", {
    //           // const response = await fetch("https://crank.zeppsandbox.com/api/admin/list", {
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //           },
    //         });
    //         const data = await response.json();
    //         setCustomers(data);
    //       };
    //       //
    //       const fetchDistributors = async () => {
    //         const response = await fetch(
    //           "http://localhost:3000/admin/distributors-summary",
    //           // "https://crank.zeppsandbox.com/api/admin/distributors-summary",
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );
    //         const data = await response.json();
    //         setDistributors(data);
    //       };

    //       await Promise.all([
    //         fetchCustomers(),
    //         fetchDistributors(),
    //         fetchRecipients(),
    //       ]);
    //     } else if (userRole === "distributor") {
    //       const response = await fetch(
    //         "http://localhost:3000/admin/distributor-summary",
    //         // "https://crank.zeppsandbox.com/api/admin/distributor-summary",
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       const data = await response.json();
    //       setDistributors([data]);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const roleFromStorage = localStorage.getItem("role");
      setRole(roleFromStorage);

      try {
        if (roleFromStorage === "admin") {
          const fetchRecipients = async () => {
            const response = await fetch(
              "http://localhost:3000/admin/get-daily-recipients",
              {
                method: "POST", // ✅ This is required!
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            // console.log("Recipients data:", data); // Add this to debug
            setRecipients(data);
          };

          const fetchCustomers = async () => {
            const response = await fetch("http://localhost:3000/admin/list", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            const data = await response.json();
            setCustomers(data);
          };

          const fetchDistributors = async () => {
            const response = await fetch(
              "http://localhost:3000/admin/distributors-summary",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = await response.json();
            setDistributors(data);
          };

          await Promise.all([
            fetchCustomers(),
            fetchDistributors(),
            fetchRecipients(),
          ]);
        } else if (roleFromStorage === "distributor") {
          const response = await fetch(
            "http://localhost:3000/admin/distributor-summary",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setDistributors([data]);
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
      const response = await fetch(
        "http://localhost:3000/admin/download-recipients",
        // "https://crank.zeppsandbox.com/api/admin/download-recipients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      const response = await fetch(
        "http://localhost:3000/admin/download-distributors",
        // "https://crank.zeppsandbox.com/api/admin/download-distributors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
      <div className="flex justify-center items-center min-h-screen bg-[#121212]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#93c740]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#121212] text-white animate-fadeIn">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2
          className={`text-3xl sm:text-4xl font-bold mb-3 transition-all duration-300 ${
            role === "admin" ? "text-[#93c740]" : "text-[#f1660d]"
          }`}
        >
          {role === "admin" ? "Admin Dashboard" : "Ambassador Dashboard"}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto transition-all duration-300">
          {role === "admin"
            ? "Manage ambassadors and view analytics"
            : "Track your distribution progress"}
        </p>
      </div>

      {/* Action Cards Section */}
      <div className="mb-12 transition-all duration-300">
        {role === "admin" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div
              onClick={handleDownloadMasterCSV}
              className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#93c740] transition-all cursor-pointer flex items-center space-x-4 group relative overflow-hidden hover:shadow-lg hover:shadow-[#93c740]/10 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-[#93c740]/20 p-3 rounded-full group-hover:bg-[#93c740]/30 transition-colors z-10">
                <svg
                  className="w-6 h-6 text-[#93c740]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
              </div>
              <div className="z-10">
                <h3 className="font-medium text-gray-200">Master CSV</h3>
                <p className="text-sm text-gray-400">
                  Download ambassador-recipient list
                </p>
              </div>
            </div>

            <Link to="/upload-distributors" className="group">
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#93c740] transition-all flex items-center space-x-4 relative overflow-hidden hover:shadow-lg hover:shadow-[#93c740]/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-[#93c740]/20 p-3 rounded-full group-hover:bg-[#93c740]/30 transition-colors z-10">
                  <svg
                    className="w-6 h-6 text-[#93c740]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <div className="z-10">
                  <h3 className="font-medium text-gray-200">Add Ambassador</h3>
                  <p className="text-sm text-gray-400">
                    Upload a new ambassador
                  </p>
                </div>
              </div>
            </Link>
            {/*  */}
            <Link to="/assign-more-to-an-ambassador" className="group">
              <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e] hover:border-[#93c740] transition-all flex items-center space-x-4 relative overflow-hidden hover:shadow-lg hover:shadow-[#93c740]/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="bg-[#93c740]/20 p-3 rounded-full group-hover:bg-[#93c740]/30 transition-colors z-10">
                  <svg
                    className="w-6 h-6 text-[#93c740]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </div>
                <div className="z-10">
                  <h3 className="font-medium text-gray-200">
                    Assign More Units
                  </h3>
                  <p className="text-sm text-gray-400">
                    Allocate more units to an existing ambassador
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <Link to="/create-customer" className="w-full sm:w-auto">
              <div className="bg-gradient-to-r from-[#f1660d] to-[#e05a00] hover:from-[#f1660d]/90 hover:to-[#e05a00]/90 text-white px-8 py-4 rounded-xl shadow-lg transition-all flex items-center space-x-3 justify-center hover:scale-[1.02] active:scale-[0.98] transform hover:shadow-[#f1660d]/20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span className="font-medium">Create Recipient</span>
              </div>
            </Link>

            {distributors.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
                <StatCard
                  title="Units Assigned"
                  value={distributors[0].quantity_alloted}
                  color="blue"
                  icon="📦"
                />
                <StatCard
                  title="Units Sampled"
                  value={
                    distributors[0].quantity_alloted -
                    distributors[0].quantity_remaining
                  }
                  color="green"
                  icon="🚚"
                />
                <StatCard
                  title="Units Remaining"
                  value={distributors[0].quantity_remaining}
                  color="yellow"
                  icon="⏳"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin View Summary */}
      {role === "admin" && (
        <>
          <div className="mb-10 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-200 mb-6">
              Distribution Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* <StatCard
                title="Total Ambassadors"
                value={distributors.length}
                color="purple"
                icon="👥"
              /> */}
              <StatCard
                title="Total Units Assigned"
                value={totalAssigned}
                color="blue"
                icon="📦"
              />
              <StatCard
                title="Total Units Sampled"
                value={totalDistributed}
                color="green"
                icon="🚚"
              />
              <StatCard
                title="Total Units Remaining"
                value={totalRemaining}
                color="yellow"
                icon="⏳"
              />
            </div>
          </div>

          {/* Ambassador Table */}
          <div className="mb-10 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-2xl font-semibold text-gray-200">
                Ambassadors' Summary ({distributors.length})
              </h3>
              <button
                onClick={handleDownloadCSV}
                className="flex items-center space-x-2 bg-[#1e1e1e] border border-[#2e2e2e] text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-[#2e2e2e] hover:text-white transition-colors shadow-sm hover:scale-[1.03] active:scale-[0.98] hover:border-[#93c740]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  ></path>
                </svg>
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#93c740]/10">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#2e2e2e]">
                  <thead className="bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Assigned
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Sampled
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Remaining
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#1e1e1e] divide-y divide-[#2e2e2e]">
                    {distributors.length > 0 ? (
                      distributors.map((d) => (
                        <tr
                          key={d.id}
                          className="hover:bg-[#2e2e2e] transition-colors duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-white">
                              {d.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                            {d.mobile_number}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-400">
                            {d.quantity_alloted}
                          </td>
                          <td className="px-6 py-4 text-center font-medium text-[#93c740]">
                            {d.quantity_alloted - d.quantity_remaining}
                          </td>
                          <td className="px-6 py-4 text-center text-gray-400">
                            {d.quantity_remaining}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-8 text-center text-gray-500 italic"
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
          {/* Recipient Table */}
          <div className="mb-10 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-2xl font-semibold text-gray-200">
                Daily Recipients' Summary ({recipients.length})
              </h3>
            </div>
            <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#93c740]/10">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#2e2e2e]">
                  <thead className="bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Date/Time
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Ambassador Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Ambassador Phone
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Recipient Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Recipient Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#1e1e1e] divide-y divide-[#2e2e2e]">
                    {recipients.length > 0 ? (
                      recipients.map((r, index) => {
                        // Parse and format the date
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
                            className="hover:bg-[#2e2e2e] transition-colors duration-200"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                              {formattedDateTime}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">
                              {r.ambassador_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                              {r.ambassador_phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-white">
                              {r.recipient_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                              {r.recipient_phone}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-8 text-center text-gray-500 italic"
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
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({ title, value, color, icon }) {
  const colorMap = {
    purple: {
      bg: "bg-[#1e1e1e]",
      border: "border-[#2e2e2e] hover:border-purple-500",
      text: "text-purple-400",
      iconBg: "bg-purple-500/20",
      hover: "hover:shadow-purple-500/10",
    },
    blue: {
      bg: "bg-[#1e1e1e]",
      border: "border-[#2e2e2e] hover:border-blue-500",
      text: "text-blue-400",
      iconBg: "bg-blue-500/20",
      hover: "hover:shadow-blue-500/10",
    },
    green: {
      bg: "bg-[#1e1e1e]",
      border: "border-[#2e2e2e] hover:border-[#93c740]",
      text: "text-[#93c740]",
      iconBg: "bg-[#93c740]/20",
      hover: "hover:shadow-[#93c740]/10",
    },
    yellow: {
      bg: "bg-[#1e1e1e]",
      border: "border-[#2e2e2e] hover:border-yellow-500",
      text: "text-yellow-400",
      iconBg: "bg-yellow-500/20",
      hover: "hover:shadow-yellow-500/10",
    },
  };

  return (
    <div
      className={`p-6 rounded-xl border ${colorMap[color].border} ${colorMap[color].bg} transition-all duration-300 hover:-translate-y-1 ${colorMap[color].hover} hover:shadow-lg`}
    >
      <div className="flex items-center space-x-4">
        <div
          className={`p-3 rounded-full ${colorMap[color].iconBg} transition-colors duration-300`}
        >
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-400">{title}</h4>
          <div className={`text-2xl font-bold ${colorMap[color].text}`}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
