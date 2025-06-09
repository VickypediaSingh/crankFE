// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AssignMoreUnits() {
//   const [distributors, setDistributors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [finalUnits, setFinalUnits] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState({});

//   useEffect(() => {
//     console.log("Component mounted, fetching distributors...");
//     fetchDistributors();
//   }, []);

//   const fetchDistributors = async () => {
//     console.log("Starting distributor fetch...");
//     try {
//       const token = localStorage.getItem("token");
//       console.log("Using token:", token ? "*****" : "NOT FOUND");

//       const response = await fetch(
//         "http://localhost:3000/admin/distributors-summary",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Fetch response status:", response.status);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Fetched data:", data);

//       setDistributors(data);

//       // Initialize finalUnits with current remaining quantities
//       const initialFinalUnits = {};
//       data.forEach((d) => {
//         initialFinalUnits[d.id] = d.quantity_remaining.toString();
//       });
//       setFinalUnits(initialFinalUnits);
//       console.log("Initialized finalUnits:", initialFinalUnits);
//     } catch (error) {
//       console.error("Error fetching ambassadors:", error);
//       toast.error("Failed to load ambassadors");
//     } finally {
//       setIsLoading(false);
//       console.log("Fetch completed, loading set to false");
//     }
//   };

//   const handleFinalUnitsChange = (id, value) => {
//     console.log(`Changing final units for ${id} to ${value}`);
//     if (value === "" || (Number(value) >= 0 && Number(value) <= 2000)) {
//       setFinalUnits((prev) => ({
//         ...prev,
//         [id]: value,
//       }));
//     }
//   };

//   const adjustFinalUnits = (id, amount) => {
//     console.log(`Adjusting final units for ${id} by ${amount}`);
//     setFinalUnits((prev) => {
//       const currentValue = Number(prev[id]) || 0;
//       const newValue = currentValue + amount;

//       if (newValue >= 0 && newValue <= 2000) {
//         console.log(`New valid value for ${id}: ${newValue}`);
//         return {
//           ...prev,
//           [id]: newValue.toString(),
//         };
//       }
//       console.log(`Value out of range for ${id}: ${newValue}`);
//       return prev;
//     });
//   };

//   const handleAssign = async (distributor) => {
//     const newFinalUnits = Number(finalUnits[distributor.id]) || 0;
//     const sampled =
//       distributor.quantity_alloted - distributor.quantity_remaining;
//     const newAllocated = newFinalUnits + sampled;

//     console.log("Starting assignment with:", {
//       distributorId: distributor.id,
//       currentAllocated: distributor.quantity_alloted,
//       currentRemaining: distributor.quantity_remaining,
//       sampled,
//       newFinalUnits,
//       newAllocated,
//     });

//     if (newFinalUnits === distributor.quantity_remaining) {
//       console.log("No changes detected, skipping update");
//       toast.info("No changes detected");
//       return;
//     }

//     setIsSubmitting((prev) => ({ ...prev, [distributor.id]: true }));
//     console.log("Set submitting state for", distributor.id);

//     try {
//       const token = localStorage.getItem("token");
//       console.log("Making API call with token:", token ? "*****" : "NOT FOUND");

//       const response = await fetch(
//         `http://localhost:3000/admin/assign-units/${distributor.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             new_allocated: newAllocated,
//             new_remaining: newFinalUnits,
//           }),
//         }
//       );

//       console.log("API response status:", response.status);
//       const data = await response.json();
//       console.log("API response data:", data);

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to update units");
//       }

//       // Optimistic UI update
//       setDistributors((prevDistributors) => {
//         const updated = prevDistributors.map((d) =>
//           d.id === distributor.id
//             ? {
//                 ...d,
//                 quantity_alloted: newAllocated,
//                 quantity_remaining: newFinalUnits,
//               }
//             : d
//         );
//         console.log("Updated local state:", updated);
//         return updated;
//       });

//       // Then refresh from server
//       console.log("Refreshing data from server...");
//       await fetchDistributors();

//       toast.success(
//         `Updated ${distributor.name}: Allocated ${newAllocated}, Remaining ${newFinalUnits}`
//       );

//       // Update finalUnits to match
//       setFinalUnits((prev) => ({
//         ...prev,
//         [distributor.id]: newFinalUnits.toString(),
//       }));
//       console.log("Updated finalUnits state");
//     } catch (error) {
//       console.error("Full assignment error:", {
//         message: error.message,
//         stack: error.stack,
//         response: error.response,
//       });
//       toast.error(`Failed to update ${distributor.name}: ${error.message}`);

//       // Revert optimistic update if needed
//       console.log("Reverting optimistic update...");
//       await fetchDistributors();
//     } finally {
//       setIsSubmitting((prev) => ({ ...prev, [distributor.id]: false }));
//       console.log("Reset submitting state for", distributor.id);
//     }
//   };

//   if (isLoading) {
//     console.log("Rendering loading state");
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#121212]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#93c740]"></div>
//       </div>
//     );
//   }

//   console.log("Rendering main component with distributors:", distributors);
//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#121212] text-white animate-fadeIn">
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />

//       <div className="text-center mb-12">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#93c740]">
//           Assign/Product Units
//         </h2>
//         <p className="text-lg text-gray-400 max-w-2xl mx-auto">
//           Allocate or deduct additional sampling units to ambassadors
//         </p>
//       </div>

//       <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-[#2e2e2e]">
//             <thead className="bg-gradient-to-r from-[#93c740]/10 to-[#93c740]/5">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Assigned
//                 </th>
//                 <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Sampled
//                 </th>
//                 <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Remaining
//                 </th>
//                 <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Final Units
//                 </th>
//                 <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-[#1e1e1e] divide-y divide-[#2e2e2e]">
//               {distributors.length > 0 ? (
//                 distributors.map((d) => {
//                   console.log(`Rendering row for ${d.id}:`, d);
//                   return (
//                     <tr
//                       key={d.id}
//                       className="hover:bg-[#2e2e2e] transition-colors duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
//                         {d.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                         {d.mobile_number}
//                       </td>
//                       <td className="px-6 py-4 text-center text-gray-400">
//                         {d.quantity_alloted}
//                       </td>
//                       <td className="px-6 py-4 text-center text-[#93c740] font-medium">
//                         {d.quantity_alloted - d.quantity_remaining}
//                       </td>
//                       <td className="px-6 py-4 text-center text-gray-400">
//                         {d.quantity_remaining}
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <div className="flex items-center justify-center space-x-2">
//                           <button
//                             onClick={() => adjustFinalUnits(d.id, -1)}
//                             disabled={Number(finalUnits[d.id]) <= 0}
//                             className="w-8 h-8 flex items-center justify-center bg-[#2e2e2e] rounded-lg hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             -
//                           </button>
//                           <input
//                             type="number"
//                             min="0"
//                             max="2000"
//                             value={finalUnits[d.id] || ""}
//                             onChange={(e) =>
//                               handleFinalUnitsChange(d.id, e.target.value)
//                             }
//                             className="w-20 px-3 py-2 bg-[#2e2e2e] border border-[#3e3e3e] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#93c740] text-center"
//                           />
//                           <button
//                             onClick={() => adjustFinalUnits(d.id, 1)}
//                             disabled={Number(finalUnits[d.id]) >= 2000}
//                             className="w-8 h-8 flex items-center justify-center bg-[#2e2e2e] rounded-lg hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             +
//                           </button>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-center">
//                         <button
//                           onClick={() => handleAssign(d)}
//                           disabled={
//                             isSubmitting[d.id] ||
//                             Number(finalUnits[d.id]) === d.quantity_remaining
//                           }
//                           className={`px-4 py-2 rounded-lg ${
//                             isSubmitting[d.id]
//                               ? "bg-gray-600 cursor-not-allowed"
//                               : "bg-[#93c740] hover:bg-[#83b730]"
//                           } text-[#121212] font-medium transition-colors`}
//                         >
//                           {isSubmitting[d.id] ? "Updating..." : "Assign"}
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="px-6 py-8 text-center text-gray-500 italic"
//                   >
//                     No Ambassadors Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState, useEffect } from "react";

export default function AssignMoreUnits() {
  // const crankURL = "http://localhost:3000";
  // const crankURL = "https://crank.zeppsandbox.com/api";
  //
  const caURL = "https://ca.crankenergy.in/api";
  const adminURL = "https://admin.crankenergy.in/api";

  const [distributors, setDistributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [finalUnits, setFinalUnits] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${adminURL}/admin/distributors-summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setDistributors(data);

      const initialFinalUnits = {};
      data.forEach((d) => {
        initialFinalUnits[d.id] = d.quantity_remaining.toString();
      });
      setFinalUnits(initialFinalUnits);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to load ambassadors" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalUnitsChange = (id, value) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 2000)) {
      setFinalUnits((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const adjustFinalUnits = (id, amount) => {
    setFinalUnits((prev) => {
      const currentValue = Number(prev[id]) || 0;
      const newValue = currentValue + amount;
      if (newValue >= 0 && newValue <= 2000) {
        return { ...prev, [id]: newValue.toString() };
      }
      return prev;
    });
  };

  const handleAssign = async (distributor) => {
    const newFinalUnits = Number(finalUnits[distributor.id]) || 0;
    const sampled =
      distributor.quantity_alloted - distributor.quantity_remaining;
    const newAllocated = newFinalUnits + sampled;

    if (newFinalUnits === distributor.quantity_remaining) {
      setMessage({ type: "info", text: "No changes detected" });
      return;
    }

    setIsSubmitting((prev) => ({ ...prev, [distributor.id]: true }));
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${adminURL}/admin/assign-units/${distributor.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            new_allocated: newAllocated,
            new_remaining: newFinalUnits,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update units");

      setDistributors((prev) =>
        prev.map((d) =>
          d.id === distributor.id
            ? {
                ...d,
                quantity_alloted: newAllocated,
                quantity_remaining: newFinalUnits,
              }
            : d
        )
      );

      setMessage({
        type: "success",
        text: `Updated ${distributor.name} successfully`,
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: `Failed to update ${distributor.name}`,
      });
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [distributor.id]: false }));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-[#2E2E2E] text-[#F7F7F7] relative">
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
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3 text-[#93c740]"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Manage Product Units
          </h2>
          <p className="text-lg text-[#BDBDBD] max-w-2xl mx-auto">
            Allocate or deduct additional sampling units to ambassadors
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 mx-auto max-w-2xl p-3 rounded-md text-sm ${
              message.type === "success"
                ? "bg-[#93c740]/20 text-[#93c740] border border-[#93c740]/30"
                : message.type === "error"
                ? "bg-red-800/50 text-[#F7F7F7] border border-red-700/30"
                : "bg-[#BDBDBD]/20 text-[#F7F7F7] border border-[#BDBDBD]/30"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-[#2E2E2E]/80 backdrop-blur-md rounded-xl border border-[#BDBDBD]/20 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#BDBDBD]/20">
              <thead className="bg-[#93c740]">
                <tr>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Name
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Phone
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Assigned
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Sampled
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Remaining
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Final Units
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-medium text-[#2E2E2E] uppercase tracking-wider">
                    Action
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
                      <td className="px-6 py-4 text-center text-[#BDBDBD]">
                        {d.quantity_alloted}
                      </td>
                      <td className="px-6 py-4 text-center text-[#93c740] font-medium">
                        {d.quantity_alloted - d.quantity_remaining}
                      </td>
                      <td className="px-6 py-4 text-center text-[#BDBDBD]">
                        {d.quantity_remaining}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={finalUnits[d.id] || ""}
                            onChange={(e) =>
                              handleFinalUnitsChange(d.id, e.target.value)
                            }
                            className="w-20 px-3 py-2 bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-lg text-[#F7F7F7] focus:outline-none focus:ring-1 focus:ring-[#93c740] text-center appearance-none"
                          />
                          <div className="flex flex-col ml-1">
                            <button
                              onClick={() => adjustFinalUnits(d.id, 1)}
                              disabled={Number(finalUnits[d.id]) >= 2000}
                              className="w-6 h-6 flex items-center justify-center bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-t hover:bg-[#93c740]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => adjustFinalUnits(d.id, -1)}
                              disabled={Number(finalUnits[d.id]) <= 0}
                              className="w-6 h-6 flex items-center justify-center bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-b hover:bg-[#93c740]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleAssign(d)}
                          disabled={
                            isSubmitting[d.id] ||
                            Number(finalUnits[d.id]) === d.quantity_remaining
                          }
                          className={`px-4 py-2 rounded-lg ${
                            isSubmitting[d.id]
                              ? "bg-[#93c740]/50 cursor-not-allowed"
                              : "bg-[#93c740] hover:bg-[#7cad34]"
                          } text-[#2E2E2E] font-medium transition-colors`}
                        >
                          {isSubmitting[d.id] ? "Updating..." : "Assign"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
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

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=Montserrat:wght@400;500;600&display=swap");

        body {
          font-family: "Montserrat", sans-serif;
          background-color: #2e2e2e;
        }

        /* Hide number input arrows */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
