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
//     <div className="min-h-screen bg-[#121212] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-[#93c740]">
//           Add New Ambassador
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-[#1e1e1e] border border-[#2e2e2e] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-[#93c740]/10">
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
//             />

//             <input
//               type="tel"
//               placeholder="10 Digit Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
//             />

//             <input
//               type="number"
//               placeholder="Units Assigned"
//               min="1"
//               value={unitsAssigned}
//               onChange={(e) => setUnitsAssigned(e.target.value)}
//               required
//               className="appearance-none block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#93c740] focus:border-[#93c740] text-white sm:text-sm"
//             />

//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#93c740] to-[#7cb518] hover:from-[#93c740]/90 hover:to-[#7cb518]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#93c740] transition-all duration-300 ${
//                 isLoading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
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
//             <div className={`mt-4 p-3 rounded-md text-sm ${
//               message.includes("successfully")
//                 ? "bg-[#93c740]/20 text-[#93c740]"
//                 : "bg-red-500/20 text-red-400"
//             }`}>
//               <p className="text-center">{message}</p>
//             </div>
//           )}
//         </div>
//       </div>

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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState } from "react";

export default function UploadDistributors() {
  // const crankURL = "http://localhost:3000";
  const crankURL = "https://crank.zeppsandbox.com/api";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unitsAssigned, setUnitsAssigned] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Validate units assigned is a positive number
    const units = Number(unitsAssigned);
    if (isNaN(units)) {
      setMessage({ type: "error", text: "Units assigned must be a number" });
      setIsLoading(false);
      return;
    }

    if (units <= 0) {
      setMessage({
        type: "error",
        text: "Units assigned must be greater than 0",
      });
      setIsLoading(false);
      return;
    }

    const distributorData = {
      email,
      name,
      phone_number: phone,
      units_assigned: units,
    };

    try {
      const res = await fetch(`${crankURL}/admin/create-distributor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(distributorData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({
          type: "success",
          text: "Ambassador created successfully!",
        });
        setEmail("");
        setName("");
        setPhone("");
        setUnitsAssigned("");
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to create ambassador",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2E2E2E] p-0 m-0 font-sans overflow-hidden">
      {/* Background Logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="text-[40vw] sm:text-[30vw] md:text-[25vw] font-black opacity-[0.03] text-[#F7F7F7]"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          CRANK
        </h1>
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 w-full">
        {/* Form Container */}
        <div className="w-full max-w-md bg-[#2E2E2E]/90 backdrop-blur-sm rounded-lg shadow-xl border border-[#BDBDBD]/10 p-6 sm:p-8">
          {/* Logo Section */}
          <div className="mb-6 text-center">
            <h1
              className="text-3xl sm:text-4xl font-bold text-[#F7F7F7] tracking-tighter"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              CRANK
            </h1>
            <p className="text-xs text-[#93c740] mt-1 tracking-widest">
              #keepgoing
            </p>
          </div>

          {/* Form Header */}
          <div className="text-center mb-5">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#F7F7F7]"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              Add New Ambassador
            </h2>
            <p className="text-sm text-[#BDBDBD] mt-1">
              Enter ambassador details
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative">
              <input
                id="name"
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
              >
                Name
              </label>
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
              >
                Email
              </label>
            </div>

            {/* Phone Input */}
            <div className="relative">
              <input
                id="phone"
                type="tel"
                required
                placeholder="10 Digit Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
              />
              <label
                htmlFor="phone"
                className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
              >
                10 Digit Phone Number
              </label>
            </div>

            {/* Units Assigned Input */}
            <div className="relative">
              <input
                id="units"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                required
                placeholder="Units Assigned"
                value={unitsAssigned}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setUnitsAssigned(value);
                }}
                className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all appearance-none"
              />
              <label
                htmlFor="units"
                className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
              >
                Units Assigned
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-md text-sm font-medium text-black ${
                isLoading
                  ? "bg-[#93c740]/50 cursor-not-allowed"
                  : "bg-[#93c740] hover:bg-[#7cad34]"
              } transition-all`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Create Ambassador"
              )}
            </button>
          </form>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                message.type === "success"
                  ? "bg-[#93c740]/20 text-[#93c740]"
                  : "bg-red-800/50 text-[#F7F7F7]"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </main>

      {/* Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=Montserrat:wght@400;500;600&display=swap");

        body {
          font-family: "Montserrat", sans-serif;
          margin: 0;
          padding: 0;
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
