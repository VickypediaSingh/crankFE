// // src/components/CreateCustomer.js
// import React, { useState } from "react";

// export default function CreateCustomer() {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpVerified, setOtpVerified] = useState(false);

//   const sendOtp = async () => {
//     const res = await fetch("https://crank.zeppsandbox.com/api/customer/send-otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ mobile_number: `+91${mobile}` }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("OTP sent to " + mobile);
//       setOtpSent(true);
//     } else {
//       alert(data.message || "Failed to send OTP");
//     }
//   };

//   const verifyOtp = async () => {
//     const res = await fetch("https://crank.zeppsandbox.com/api/customer/verify-otp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("OTP verified successfully");
//       setOtpVerified(true);
//     } else {
//       alert(data.message || "Invalid OTP");
//     }
//   };

//   const createCustomer = async (e) => {
//     e.preventDefault();

//     if (!otpVerified) {
//       return alert("Please verify OTP before creating customer.");
//     }

//     const res = await fetch("https://crank.zeppsandbox.com/api/customer/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ name, mobile_number: `+91${mobile}` }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Customer created successfully");
//       setName("");
//       setMobile("");
//       setOtp("");
//       setOtpSent(false);
//       setOtpVerified(false);
//     } else {
//       alert(data.message || "Failed to create customer");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
//       <h2 className="text-2xl font-semibold mb-6 text-center">
//         Create Recipient
//       </h2>
//       <form onSubmit={createCustomer} className="space-y-4">
//         <input
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Recipient Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Mobile Number"
//           value={mobile}
//           onChange={(e) => {
//             setMobile(e.target.value);
//             setOtpSent(false);
//             setOtpVerified(false);
//             setOtp("");
//           }}
//           required
//         />

//         {!otpSent && (
//           <button
//             type="button"
//             onClick={sendOtp}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Send OTP
//           </button>
//         )}

//         {otpSent && !otpVerified && (
//           <>
//             <input
//               className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={verifyOtp}
//               className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//             >
//               Verify OTP
//             </button>
//           </>
//         )}

//         <button
//           type="submit"
//           disabled={!otpVerified}
//           className={`w-full py-2 rounded text-white ${
//             otpVerified
//               ? "bg-purple-600 hover:bg-purple-700"
//               : "bg-gray-400 cursor-not-allowed"
//           }`}
//         >
//           Create Customer
//         </button>
//       </form>
//     </div>
//   );
// }





// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++







import React, { useState } from "react";

export default function CreateCustomer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    create: false
  });

  const sendOtp = async () => {
    setIsLoading({...isLoading, sendOtp: true});
    try {
      const res = await fetch("https://crank.zeppsandbox.com/api/customer/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ mobile_number: `+91${mobile}` }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("OTP sent to " + mobile);
        setOtpSent(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } finally {
      setIsLoading({...isLoading, sendOtp: false});
    }
  };

  const verifyOtp = async () => {
    setIsLoading({...isLoading, verifyOtp: true});
    try {
      const res = await fetch("https://crank.zeppsandbox.com/api/customer/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("OTP verified successfully");
        setOtpVerified(true);
      } else {
        alert(data.message || "Invalid OTP");
      }
    } finally {
      setIsLoading({...isLoading, verifyOtp: false});
    }
  };

  const createCustomer = async (e) => {
    e.preventDefault();
    setIsLoading({...isLoading, create: true});

    if (!otpVerified) {
      alert("Please verify OTP before creating customer.");
      setIsLoading({...isLoading, create: false});
      return;
    }

    try {
      const res = await fetch("https://crank.zeppsandbox.com/api/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, mobile_number: `+91${mobile}` }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Recipient created successfully");
        setName("");
        setMobile("");
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        alert(data.message || "Failed to create customer");
      }
    } finally {
      setIsLoading({...isLoading, create: false});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create Recipient
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Add a new recipient to your account
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={createCustomer}>
            <div>
              <input
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Recipient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="10 Digit Mobile Number"
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  setOtpSent(false);
                  setOtpVerified(false);
                  setOtp("");
                }}
                required
              />
            </div>

            {!otpSent ? (
              <div>
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={isLoading.sendOtp || mobile.length < 10}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isLoading.sendOtp || mobile.length < 10 ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading.sendOtp ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : "Send OTP"}
                </button>
              </div>
            ) : !otpVerified ? (
              <>
                <div>
                  <input
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={isLoading.verifyOtp || otp.length < 4}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isLoading.verifyOtp || otp.length < 4 ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading.verifyOtp ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : "Verify OTP"}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3 bg-green-50 text-green-800 text-sm rounded-md">
                OTP verified successfully
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={!otpVerified || isLoading.create}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  otpVerified
                    ? "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                    : "bg-gray-400 cursor-not-allowed focus:ring-gray-500"
                }`}
              >
                {isLoading.create ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : "Create Recipient"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}