// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AssignMoreUnits() {
//   const [distributors, setDistributors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [allocations, setAllocations] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState({});

//   useEffect(() => {
//     const fetchDistributors = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "http://localhost:3000/admin/distributors-summary",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const data = await response.json();
//         setDistributors(data);

//         // Initialize allocations with remaining quantities
//         const initialAllocations = {};
//         data.forEach((d) => {
//           initialAllocations[d.id] = d.quantity_remaining.toString();
//         });
//         setAllocations(initialAllocations);
//       } catch (error) {
//         console.error("Error fetching ambassadors:", error);
//         toast.error("Failed to load ambassadors");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDistributors();
//   }, []);

//   const handleAllocationChange = (id, value) => {
//     // Allow empty string, negative numbers, and positive numbers up to 2000
//     if (
//       value === "" ||
//       (Number.isInteger(Number(value)) && Math.abs(Number(value)) <= 2000)
//     ) {
//       setAllocations((prev) => ({
//         ...prev,
//         [id]: value,
//       }));
//     }
//   };

//   const handleAllocate = async (distributor) => {
//     const additionalUnits = parseInt(allocations[distributor.id], 10);

//     if (isNaN(additionalUnits)) {
//       toast.error("Please enter a valid number");
//       return;
//     }

//     if (additionalUnits === 0) {
//       toast.error("Please enter a value different from 0");
//       return;
//     }

//     // Optional: Add maximum limit check
//     if (Math.abs(additionalUnits) > 2000) {
//       toast.error("Cannot assign/deduct more than 2000 units at once");
//       return;
//     }

//     setIsSubmitting((prev) => ({ ...prev, [distributor.id]: true }));

//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `http://localhost:3000/admin/assign-units/${distributor.id}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             additional_units: additionalUnits,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to assign units");
//       }

//       // Update local state to reflect changes
//       setDistributors((prev) =>
//         prev.map((d) =>
//           d.id === distributor.id
//             ? {
//                 ...d,
//                 quantity_alloted: d.quantity_alloted + additionalUnits,
//                 quantity_remaining: d.quantity_remaining + additionalUnits,
//               }
//             : d
//         )
//       );

//       toast.success(
//         `${additionalUnits >= 0 ? "Assigned" : "Deducted"} ${Math.abs(
//           additionalUnits
//         )} units to ${distributor.name}`
//       );

//       // Reset the input for this distributor to the new remaining value
//       setAllocations((prev) => ({
//         ...prev,
//         [distributor.id]: (
//           distributor.quantity_remaining + additionalUnits
//         ).toString(),
//       }));
//     } catch (error) {
//       console.error("Assignment error:", error);
//       toast.error(`Failed to assign units: ${error.message}`);
//     } finally {
//       setIsSubmitting((prev) => ({ ...prev, [distributor.id]: false }));
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
//           Assign/Deduct Units
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
//                 distributors.map((d) => (
//                   <tr
//                     key={d.id}
//                     className="hover:bg-[#2e2e2e] transition-colors duration-200"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
//                       {d.name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-400">
//                       {d.mobile_number}
//                     </td>
//                     <td className="px-6 py-4 text-center text-gray-400">
//                       {d.quantity_alloted}
//                     </td>
//                     <td className="px-6 py-4 text-center text-[#93c740] font-medium">
//                       {d.quantity_alloted - d.quantity_remaining}
//                     </td>
//                     <td className="px-6 py-4 text-center text-gray-400">
//                       {d.quantity_remaining}
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <input
//                         type="number"
//                         min="0"
//                         max="2000"
//                         value={allocations[d.id] || ""}
//                         onChange={(e) =>
//                           handleAllocationChange(d.id, e.target.value)
//                         }
//                         placeholder={d.quantity_remaining.toString()}
//                         className="w-24 px-3 py-2 bg-[#2e2e2e] border border-[#3e3e3e] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#93c740] text-center"
//                       />
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <button
//                         onClick={() => handleAllocate(d)}
//                         disabled={
//                           isSubmitting[d.id] ||
//                           !allocations[d.id] ||
//                           parseInt(allocations[d.id]) <= 0
//                         }
//                         className={`px-4 py-2 rounded-lg ${
//                           isSubmitting[d.id]
//                             ? "bg-gray-600 cursor-not-allowed"
//                             : "bg-[#93c740] hover:bg-[#83b730]"
//                         } text-[#121212] font-medium transition-colors`}
//                       >
//                         {isSubmitting[d.id] ? "Assigning..." : "Assign"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))
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

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssignMoreUnits() {
  const [distributors, setDistributors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [finalUnits, setFinalUnits] = useState({});
  const [isSubmitting, setIsSubmitting] = useState({});

  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      const token = localStorage.getItem("token");
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

      // Initialize finalUnits with current remaining quantities
      const initialFinalUnits = {};
      data.forEach((d) => {
        initialFinalUnits[d.id] = d.quantity_remaining.toString();
      });
      setFinalUnits(initialFinalUnits);
    } catch (error) {
      console.error("Error fetching ambassadors:", error);
      toast.error("Failed to load ambassadors");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalUnitsChange = (id, value) => {
    // Allow empty string or numbers between 0-2000
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

      // Ensure value stays between 0-2000
      if (newValue >= 0 && newValue <= 2000) {
        return {
          ...prev,
          [id]: newValue.toString(),
        };
      }
      return prev;
    });
  };

  const handleAssign = async (distributor) => {
    const newFinalUnits = Number(finalUnits[distributor.id]) || 0;
    const sampled =
      distributor.quantity_alloted - distributor.quantity_remaining;
    const newAllocated = newFinalUnits + sampled;

    console.log("Sending update request:", {
      distributorId: distributor.id,
      newAllocated,
      newFinalUnits,
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/admin/assign-units/${distributor.id}`,
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

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to update units");
      }

      // ... rest of your success handling
    } catch (error) {
      console.error("Full error details:", {
        message: error.message,
        response: error.response,
        stack: error.stack,
      });
      toast.error(`Failed to update ${distributor.name}: ${error.message}`);
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#93c740]">
          Assign/Product Units
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Allocate or deduct additional sampling units to ambassadors
        </p>
      </div>

      <div className="bg-[#1e1e1e] rounded-xl border border-[#2e2e2e] overflow-hidden">
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
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Final Units
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Action
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
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {d.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {d.mobile_number}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">
                      {d.quantity_alloted}
                    </td>
                    <td className="px-6 py-4 text-center text-[#93c740] font-medium">
                      {d.quantity_alloted - d.quantity_remaining}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">
                      {d.quantity_remaining}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => adjustFinalUnits(d.id, -1)}
                          disabled={Number(finalUnits[d.id]) <= 0}
                          className="w-8 h-8 flex items-center justify-center bg-[#2e2e2e] rounded-lg hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="0"
                          max="2000"
                          value={finalUnits[d.id] || ""}
                          onChange={(e) =>
                            handleFinalUnitsChange(d.id, e.target.value)
                          }
                          className="w-20 px-3 py-2 bg-[#2e2e2e] border border-[#3e3e3e] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#93c740] text-center"
                        />
                        <button
                          onClick={() => adjustFinalUnits(d.id, 1)}
                          disabled={Number(finalUnits[d.id]) >= 2000}
                          className="w-8 h-8 flex items-center justify-center bg-[#2e2e2e] rounded-lg hover:bg-[#3e3e3e] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
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
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#93c740] hover:bg-[#83b730]"
                        } text-[#121212] font-medium transition-colors`}
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
  );
}
