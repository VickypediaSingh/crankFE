// import React, { useState } from "react";

// export default function UploadDistributors() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [unitsAssigned, setUnitsAssigned] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const distributorData = {
//       email,
//       name,
//       phone_number: phone,
//       units_assigned: Number(unitsAssigned),
//     };

//     try {
//       const res = await fetch(
//         "https://crank.zeppsandbox.com/api/admin/create-distributor",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(distributorData),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Distributor created successfully");
//         setEmail("");
//         setName("");
//         setPhone("");
//         setUnitsAssigned("");
//       } else {
//         setMessage(data.message || "Failed to create distributor");
//       }
//     } catch (err) {
//       setMessage("Network error");
//     }
//   };

//   return (
//     <div className="container max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Add Distributor</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         {/* <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         /> */}
//         <input
//           type="text"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Number of Units Assigned"
//           value={unitsAssigned}
//           onChange={(e) => setUnitsAssigned(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Submit
//         </button>
//       </form>
//       {message && (
//         <p className="mt-4 text-center text-sm text-blue-700">{message}</p>
//       )}
//     </div>
//   );
// }






// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





// import React, { useState } from "react";

// export default function UploadDistributors() {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [unitsAssigned, setUnitsAssigned] = useState("");
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setMessage("");

//     const distributorData = {
//       email,
//       name,
//       phone_number: phone,
//       units_assigned: Number(unitsAssigned),
//     };

//     try {
//       const res = await fetch(
//         "http://localhost:3000/admin/create-distributor",
//         // "https://crank.zeppsandbox.com/api/admin/create-distributor",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(distributorData),
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Ambassador created successfully!");
//         setEmail("");
//         setName("");
//         setPhone("");
//         setUnitsAssigned("");
//       } else {
//         setMessage(data.message || "Failed to create ambassador");
//       }
//     } catch (err) {
//       setMessage("Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Add New Ambassador
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />

//             <input
//               type="tel"
//               placeholder="10 Digit Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />

//             <input
//               type="number"
//               placeholder="Units Assigned"
//               min="1"
//               value={unitsAssigned}
//               onChange={(e) => setUnitsAssigned(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             />

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                 isLoading ? "opacity-70 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </>
//               ) : "Create Ambassador"}
//             </button>
//           </form>

//           {message && (
//             <div className={`mt-4 p-3 rounded-md ${message.includes("successfully") ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
//               <p className="text-sm text-center">{message}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++









import React, { useState } from "react";

export default function UploadDistributors() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unitsAssigned, setUnitsAssigned] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const distributorData = {
      email,
      name,
      phone_number: phone,
      units_assigned: Number(unitsAssigned),
    };

    try {
      const res = await fetch(
        // "http://localhost:3000/admin/create-distributor",
        "https://crank.zeppsandbox.com/api/admin/create-distributor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(distributorData),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("Ambassador created successfully!");
        setEmail("");
        setName("");
        setPhone("");
        setUnitsAssigned("");
      } else {
        setMessage(data.message || "Failed to create ambassador");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#93c740]">
          Add New Ambassador
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1e1e1e] border border-[#2e2e2e] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-[#93c740]/10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
            />

            <input
              type="tel"
              placeholder="10 Digit Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
            />

            <input
              type="number"
              placeholder="Units Assigned"
              min="1"
              value={unitsAssigned}
              onChange={(e) => setUnitsAssigned(e.target.value)}
              required
              className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#93c740] to-[#7cb518] hover:from-[#93c740]/90 hover:to-[#7cb518]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93c740] transition-all duration-300 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : "Create Ambassador"}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              message.includes("successfully") 
                ? "bg-[#93c740]/20 text-[#93c740]" 
                : "bg-red-500/20 text-red-400"
            }`}>
              <p className="text-center">{message}</p>
            </div>
          )}
        </div>
      </div>

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