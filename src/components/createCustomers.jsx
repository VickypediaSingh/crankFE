// import React, { useState } from "react";

// export default function CreateCustomer() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const [isLoading, setIsLoading] = useState({
//     sendOtp: false,
//     verifyOtp: false,
//   });

//   const sendOtp = async () => {
//     setIsLoading({ ...isLoading, sendOtp: true });
//     setMessage({ type: "", text: "" });

//     try {
//       const res = await fetch("http://localhost:3000/customer/send-otp", {
//       // const res = await fetch("https://crank.zeppsandbox.com/api/customer/send-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ mobile_number: `+91${mobile}` }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setOtpSent(true);
//         setMessage({ type: "success", text: `OTP sent to +91${mobile}` });
//       } else {
//         setMessage({ type: "error", text: data.message || "Failed to send OTP" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: "Network error while sending OTP" });
//     } finally {
//       setIsLoading({ ...isLoading, sendOtp: false });
//     }
//   };

//   const verifyOtpAndCreate = async () => {
//     setIsLoading({ ...isLoading, verifyOtp: true });
//     setMessage({ type: "", text: "" });

//     try {
//       const verifyRes = await fetch("http://localhost:3000/customer/verify-otp", {
//       // const verifyRes = await fetch("https://crank.zeppsandbox.com/api/customer/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
//       });

//       const verifyData = await verifyRes.json();
//       if (!verifyRes.ok) {
//         setMessage({ type: "error", text: verifyData.message || "Invalid OTP" });
//         return;
//       }

//       // OTP verified
//       setOtpVerified(true);
//       setMessage({ type: "success", text: "OTP verified. Creating recipient..." });

//       // Now auto-create recipient
//       const createRes = await fetch("http://localhost:3000/customer/create", {
//       // const createRes = await fetch("https://crank.zeppsandbox.com/api/customer/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ name, mobile_number: `+91${mobile}` }),
//       });

//       const createData = await createRes.json();
//       if (createRes.ok) {
//         setMessage({ type: "success", text: "Recipient created successfully. System is ready to add another recipeint." });
//         setName("");
//         setMobile("");
//         setOtp("");
//         setOtpSent(false);
//         setOtpVerified(false);
//       } else {
//         setMessage({ type: "error", text: createData.message || "Failed to create recipient" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: "Network error during OTP verification or creation" });
//     } finally {
//       setIsLoading({ ...isLoading, verifyOtp: false });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#121212] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fadeIn">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-[#f1660d]">
//             Create Recipient
//           </h2>
//           <p className="mt-2 text-sm text-gray-400">
//             Add a new recipient to your account
//           </p>
//         </div>

//         <div className="mt-8 bg-[#1e1e1e] border border-[#2e2e2e] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-all duration-300 hover:shadow-[#f1660d]/10">
//           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//             {message.text && (
//               <div
//                 className={`p-3 rounded-md text-sm ${
//                   message.type === "success"
//                     ? "bg-[#93c740]/20 text-[#93c740]"
//                     : "bg-red-500/20 text-red-400"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             <div>
//               <input
//                 className="block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm focus:ring-[#f1660d] focus:border-[#f1660d] text-white placeholder-gray-400 sm:text-sm"
//                 placeholder="Recipient Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <input
//                 className="block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm focus:ring-[#f1660d] focus:border-[#f1660d] text-white placeholder-gray-400 sm:text-sm"
//                 placeholder="10 Digit Mobile Number"
//                 type="tel"
//                 value={mobile}
//                 onChange={(e) => {
//                   setMobile(e.target.value);
//                   setOtpSent(false);
//                   setOtpVerified(false);
//                   setOtp("");
//                   setMessage({ type: "", text: "" });
//                 }}
//                 required
//               />
//             </div>

//             {!otpSent ? (
//               <div>
//                 <button
//                   type="button"
//                   onClick={sendOtp}
//                   disabled={isLoading.sendOtp || mobile.length < 10}
//                   className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#f1660d] to-[#e05a00] hover:from-[#f1660d]/90 hover:to-[#e05a00]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#f1660d] transition-all duration-300 ${
//                     isLoading.sendOtp || mobile.length < 10 ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
//                   }`}
//                 >
//                   {isLoading.sendOtp ? (
//                     <>
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Sending...
//                     </>
//                   ) : (
//                     "Send OTP"
//                   )}
//                 </button>
//               </div>
//             ) : !otpVerified ? (
//               <>
//                 <div>
//                   <input
//                     className="block w-full px-3 py-3 bg-[#2e2e2e] border border-[#3e3e3e] rounded-md shadow-sm focus:ring-[#f1660d] focus:border-[#f1660d] text-white placeholder-gray-400 sm:text-sm"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <button
//                     type="button"
//                     onClick={verifyOtpAndCreate}
//                     disabled={isLoading.verifyOtp || otp.length < 4}
//                     className={`w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#93c740] to-[#7cb518] hover:from-[#93c740]/90 hover:to-[#7cb518]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#93c740] transition-all duration-300 ${
//                       isLoading.verifyOtp || otp.length < 4 ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"
//                     }`}
//                   >
//                     {isLoading.verifyOtp ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Verifying...
//                       </>
//                     ) : (
//                       "Verify OTP & Create"
//                     )}
//                   </button>
//                 </div>
//               </>
//             ) : null}
//           </form>
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState } from "react";

export default function CreateCustomer() {
  // const crankURL = "http://localhost:3000";
  // const crankURL = "https://crank.zeppsandbox.com/api";
  //
  const caURL = "https://ca.crankenergy.in";
  const adminURL = "https://admin.crankenergy.in";
  //
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [isLoading, setIsLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
  });

  const sendOtp = async () => {
    setIsLoading({ ...isLoading, sendOtp: true });
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch(`${caURL}/customer/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ mobile_number: `+91${mobile}` }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMessage({ type: "success", text: `OTP sent to +91${mobile}` });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to send OTP",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error while sending OTP" });
    } finally {
      setIsLoading({ ...isLoading, sendOtp: false });
    }
  };

  const verifyOtpAndCreate = async () => {
    setIsLoading({ ...isLoading, verifyOtp: true });
    setMessage({ type: "", text: "" });

    try {
      const verifyRes = await fetch(`${caURL}/customer/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        setMessage({
          type: "error",
          text: verifyData.message || "Invalid OTP",
        });
        return;
      }

      setOtpVerified(true);
      setMessage({
        type: "success",
        text: "OTP verified. Creating recipient...",
      });

      const createRes = await fetch(`${caURL}/customer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, mobile_number: `+91${mobile}` }),
      });

      const createData = await createRes.json();
      if (createRes.ok) {
        setMessage({
          type: "success",
          text: "Recipient created successfully. System is ready to add another recipient.",
        });
        setName("");
        setMobile("");
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        setMessage({
          type: "error",
          text: createData.message || "Failed to create recipient",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error during OTP verification or creation",
      });
    } finally {
      setIsLoading({ ...isLoading, verifyOtp: false });
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
            <p className="text-xs text-[#f1660d] mt-1 tracking-widest">
              #keepgoing
            </p>
          </div>

          {/* Form Header */}
          <div className="text-center mb-5">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#F7F7F7]"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              Create Recipient
            </h2>
            <p className="text-sm text-[#BDBDBD] mt-1">
              Add a new recipient to your account
            </p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mb-4 p-3 rounded-md text-sm ${
                message.type === "success"
                  ? "bg-[#93c740]/20 text-[#93c740]"
                  : "bg-red-800/50 text-[#F7F7F7]"
              }`}
            >
              {message.text}
            </div>
          )}

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name Input */}
            <div className="relative">
              <input
                id="name"
                type="text"
                required
                placeholder="Recipient name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#f1660d] focus:border-[#f1660d] transition-all"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f1660d]"
              >
                Recipient Name
              </label>
            </div>

            {/* Mobile Input */}
            <div className="relative">
              <input
                id="mobile"
                type="tel"
                pattern="[0-9]{10}"
                maxLength="10"
                required
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                  setMessage({ type: "", text: "" });
                }}
                className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#f1660d] focus:border-[#f1660d] transition-all"
              />
              <label
                htmlFor="mobile"
                className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f1660d]"
              >
                10 Digit Mobile Number
              </label>
            </div>

            {/* OTP Section */}
            {!otpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                disabled={isLoading.sendOtp || mobile.length < 10}
                className={`w-full py-3 rounded-md text-sm font-medium text-[#F7F7F7] ${
                  isLoading.sendOtp || mobile.length < 10
                    ? "bg-[#f1660d]/30 cursor-not-allowed"
                    : "bg-[#f1660d] hover:bg-[#d6590a]"
                } transition-all`}
              >
                {isLoading.sendOtp ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </button>
            ) : !otpVerified ? (
              <>
                <div className="relative">
                  <input
                    id="otp"
                    type="text"
                    pattern="[0-9]{6}"
                    maxLength="6"
                    required
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#f1660d] focus:border-[#f1660d] transition-all"
                  />
                  <label
                    htmlFor="otp"
                    className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f1660d]"
                  >
                    Enter 6-digit OTP
                  </label>
                </div>
                <button
                  type="button"
                  onClick={verifyOtpAndCreate}
                  disabled={isLoading.verifyOtp || otp.length < 4}
                  className={`w-full py-3 rounded-md text-sm font-medium text-[#F7F7F7] ${
                    isLoading.verifyOtp || otp.length < 4
                      ? "bg-[#93c740]/30 cursor-not-allowed"
                      : "bg-[#93c740] hover:bg-[#7cb518]"
                  } transition-all`}
                >
                  {isLoading.verifyOtp ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Verifying...
                    </span>
                  ) : (
                    "Verify OTP & Create"
                  )}
                </button>
              </>
            ) : null}
          </form>
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
      `}</style>
    </div>
  );
}
