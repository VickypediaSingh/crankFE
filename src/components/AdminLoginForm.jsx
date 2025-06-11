// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AdminLoginForm() {
//   // const crankURL = "http://localhost:3000";
//   // const crankURL = "https://crank.zeppsandbox.com/api";
//   //
//   const caURL = "https://ca.crankenergy.in/api";
//   const adminURL = "https://admin.crankenergy.in/api";

//   useEffect(() => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//   }, []);

//   const [adminLoginMode, setAdminLoginMode] = useState("password");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//     setIsLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${adminURL}/auth/admin/send-otp`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ mobile_number: `+91${mobile}` }),
//       });
//       const data = await res.json();
//       if (!res.ok) setError(data.message || "Failed to send OTP");
//       else setOtpSent(true);
//     } catch (err) {
//       setError("Network error while sending OTP");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);
//     try {
//       let res;
//       if (adminLoginMode === "password") {
//         res = await fetch(`${adminURL}/auth/admin/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });
//       } else {
//         res = await fetch(`${adminURL}/auth/admin/verify-otp`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
//         });
//       }
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);
//         navigate("/dashboard");
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       setError("Login failed due to network error");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#2E2E2E] p-0 m-0 font-sans overflow-hidden">
//       {/* Background Logo */}
//       <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
//         <h1
//           className="text-[40vw] sm:text-[30vw] md:text-[25vw] font-black opacity-[0.03] text-[#F7F7F7]"
//           style={{ fontFamily: "'Archivo Black', sans-serif" }}
//         >
//           CRANK
//         </h1>
//       </div>

//       {/* Main Content */}
//       <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 w-full">
//         {/* Login Form Container */}
//         <div className="w-full max-w-md bg-[#2E2E2E]/90 backdrop-blur-sm rounded-lg shadow-xl border border-[#BDBDBD]/10 p-6 sm:p-8">
//           {/* Logo Section */}
//           <div className="mb-6 text-center">
//             <h1
//               className="text-3xl sm:text-4xl font-bold text-[#F7F7F7] tracking-tighter"
//               style={{ fontFamily: "'Archivo Black', sans-serif" }}
//             >
//               CRANK
//             </h1>
//             <p className="text-xs text-[#93c740] mt-1 tracking-widest">
//               #keepgoing
//             </p>
//           </div>

//           {/* Form Header */}
//           <div className="text-center mb-5">
//             <h2
//               className="text-xl sm:text-2xl font-bold text-[#F7F7F7]"
//               style={{ fontFamily: "'Archivo Black', sans-serif" }}
//             >
//               Admin Login
//             </h2>
//             <p className="text-sm text-[#BDBDBD] mt-1">
//               Sign in to your admin account
//             </p>
//           </div>

//           {/* Login Mode Toggle */}
//           <div className="flex rounded-md overflow-hidden border border-[#BDBDBD]/20 mb-6">
//             <button
//               type="button"
//               onClick={() => {
//                 setAdminLoginMode("password");
//                 setError("");
//               }}
//               className={`flex-1 py-3 text-sm font-medium transition ${
//                 adminLoginMode === "password"
//                   ? "bg-[#93c740] text-black"
//                   : "bg-[#2E2E2E] text-[#BDBDBD] hover:bg-[#2E2E2E]/80"
//               }`}
//             >
//               Email & Password
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setAdminLoginMode("otp");
//                 setOtpSent(false);
//                 setError("");
//               }}
//               className={`flex-1 py-3 text-sm font-medium transition ${
//                 adminLoginMode === "otp"
//                   ? "bg-[#93c740] text-black"
//                   : "bg-[#2E2E2E] text-[#BDBDBD] hover:bg-[#2E2E2E]/80"
//               }`}
//             >
//               Mobile OTP
//             </button>
//           </div>

//           <form onSubmit={handleLogin} className="space-y-4">
//             {adminLoginMode === "password" && (
//               <>
//                 <div className="relative">
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     required
//                     placeholder="Email address"
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
//                   />
//                   <label
//                     htmlFor="email"
//                     className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
//                   >
//                     Email address
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     required
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
//                   />
//                   <label
//                     htmlFor="password"
//                     className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
//                   >
//                     Password
//                   </label>
//                 </div>
//               </>
//             )}

//             {adminLoginMode === "otp" && (
//               <>
//                 <div className="relative">
//                   <input
//                     id="mobile"
//                     type="tel"
//                     pattern="[0-9]{10}"
//                     maxLength="10"
//                     required
//                     placeholder="10-digit mobile number"
//                     value={mobile}
//                     onChange={(e) => setMobile(e.target.value)}
//                     className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
//                   />
//                   <label
//                     htmlFor="mobile"
//                     className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
//                   >
//                     10 Digit Mobile Number
//                   </label>
//                 </div>
//                 <div className="relative">
//                   <div className="flex flex-col sm:flex-row gap-2">
//                     <div className="relative flex-1">
//                       <input
//                         id="otp"
//                         type="text"
//                         pattern="[0-9]{6}"
//                         maxLength="6"
//                         required
//                         disabled={!otpSent}
//                         placeholder="6-digit OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className={`peer w-full bg-[#2E2E2E] border ${
//                           !otpSent
//                             ? "border-[#BDBDBD]/10"
//                             : "border-[#BDBDBD]/30"
//                         } rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all`}
//                       />
//                       <label
//                         htmlFor="otp"
//                         className={`absolute left-3 top-2 text-xs ${
//                           !otpSent ? "text-[#BDBDBD]/50" : "text-[#BDBDBD]"
//                         } transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]`}
//                       >
//                         Enter 6-digit OTP
//                       </label>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={handleSendOtp}
//                       disabled={!mobile || mobile.length !== 10 || isLoading}
//                       className={`px-4 py-2 text-sm rounded-md font-medium h-[42px] sm:h-auto ${
//                         !mobile || mobile.length !== 10 || isLoading
//                           ? "bg-[#93c740]/30 text-[#F7F7F7]/70 cursor-not-allowed"
//                           : "bg-[#93c740] hover:bg-[#7cad34] text-black"
//                       } transition-all`}
//                     >
//                       {isLoading ? "Sending..." : "Send OTP"}
//                     </button>
//                   </div>
//                   {otpSent && (
//                     <p className="text-xs text-[#93c740] mt-1 animate-fadeIn">
//                       OTP sent successfully!
//                     </p>
//                   )}
//                 </div>
//               </>
//             )}

//             {error && (
//               <div className="bg-red-800/50 text-[#F7F7F7] px-3 py-2 rounded-md text-sm animate-fadeIn">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isLoading || (adminLoginMode === "otp" && !otpSent)}
//               className={`w-full py-3 rounded-md text-sm font-medium text-black ${
//                 isLoading || (adminLoginMode === "otp" && !otpSent)
//                   ? "bg-[#93c740]/30 cursor-not-allowed"
//                   : "bg-[#93c740] hover:bg-[#7cad34]"
//               } transition-all`}
//             >
//               {isLoading ? "Signing in..." : "Sign In"}
//             </button>
//           </form>
//         </div>
//       </main>

//       {/* Global Styles */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=Montserrat:wght@400;500;600&display=swap");

//         body {
//           font-family: "Montserrat", sans-serif;
//           margin: 0;
//           padding: 0;
//           background-color: #2e2e2e;
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginForm() {
  // const crankURL = "http://localhost:3000";
  // const crankURL = "https://crank.zeppsandbox.com/api";
  //
  const caURL = "https://ca.crankenergy.in/api";
  const adminURL = "https://admin.crankenergy.in/api";

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }, []);

  const [adminLoginMode, setAdminLoginMode] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateMobile = (mobile) => {
    const re = /^[6-9]\d{9}$/;
    return re.test(mobile);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    setMobile(value);

    if (value.length > 0 && !validateMobile(value)) {
      if (value.length < 10) {
        setMobileError("Mobile number must be 10 digits");
      } else if (!/^[6-9]/.test(value)) {
        setMobileError("Mobile number must start with 6, 7, 8 or 9");
      } else {
        setMobileError("Please enter a valid mobile number");
      }
    } else {
      setMobileError("");
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 6) {
      setOtp(value);
      if (value.length === 6) {
        setOtpError("");
      } else if (value.length > 0) {
        setOtpError("OTP must be 6 digits");
      } else {
        setOtpError("");
      }
    }
  };

  const handleSendOtp = async () => {
    if (!validateMobile(mobile)) {
      setMobileError("Please enter a valid mobile number");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${adminURL}/auth/admin/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_number: `+91${mobile}` }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.message || "Failed to send OTP");
      else setOtpSent(true);
    } catch (err) {
      setError("Network error while sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (adminLoginMode === "password") {
      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }
      if (!password) {
        setError("Please enter your password");
        return;
      }
    } else {
      if (!validateMobile(mobile)) {
        setMobileError("Please enter a valid mobile number");
        return;
      }
      if (otp.length !== 6) {
        setOtpError("OTP must be 6 digits");
        return;
      }
    }

    setIsLoading(true);
    try {
      let res;
      if (adminLoginMode === "password") {
        res = await fetch(`${adminURL}/auth/admin/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } else {
        res = await fetch(`${adminURL}/auth/admin/verify-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
        });
      }
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed due to network error");
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
        {/* Login Form Container */}
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
              Admin Login
            </h2>
            <p className="text-sm text-[#BDBDBD] mt-1">
              Sign in to your admin account
            </p>
          </div>

          {/* Login Mode Toggle */}
          <div className="flex rounded-md overflow-hidden border border-[#BDBDBD]/20 mb-6">
            <button
              type="button"
              onClick={() => {
                setAdminLoginMode("password");
                setError("");
                setEmailError("");
              }}
              className={`flex-1 py-3 text-sm font-medium transition ${
                adminLoginMode === "password"
                  ? "bg-[#93c740] text-black"
                  : "bg-[#2E2E2E] text-[#BDBDBD] hover:bg-[#2E2E2E]/80"
              }`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => {
                setAdminLoginMode("otp");
                setOtpSent(false);
                setError("");
                setMobileError("");
                setOtpError("");
              }}
              className={`flex-1 py-3 text-sm font-medium transition ${
                adminLoginMode === "otp"
                  ? "bg-[#93c740] text-black"
                  : "bg-[#2E2E2E] text-[#BDBDBD] hover:bg-[#2E2E2E]/80"
              }`}
            >
              Mobile OTP
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {adminLoginMode === "password" && (
              <>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    required
                    placeholder="Email address"
                    onChange={handleEmailChange}
                    className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
                  >
                    Email address
                  </label>
                  {emailError && (
                    <p className="text-xs text-red-500 mt-1 animate-fadeIn">
                      {emailError}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    required
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
                  >
                    Password
                  </label>
                </div>
              </>
            )}

            {adminLoginMode === "otp" && (
              <>
                <div className="relative">
                  <input
                    id="mobile"
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={handleMobileChange}
                    className="peer w-full bg-[#2E2E2E] border border-[#BDBDBD]/30 rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all"
                  />
                  <label
                    htmlFor="mobile"
                    className="absolute left-3 top-2 text-xs text-[#BDBDBD] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]"
                  >
                    10 Digit Mobile Number
                  </label>
                  {mobileError && (
                    <p className="text-xs text-red-500 mt-1 animate-fadeIn">
                      {mobileError}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <input
                        id="otp"
                        type="text"
                        pattern="[0-9]{6}"
                        maxLength="6"
                        required
                        disabled={!otpSent}
                        placeholder="6-digit OTP"
                        value={otp}
                        onChange={handleOtpChange}
                        className={`peer w-full bg-[#2E2E2E] border ${
                          !otpSent
                            ? "border-[#BDBDBD]/10"
                            : "border-[#BDBDBD]/30"
                        } rounded-md px-3 pt-5 pb-2 text-sm text-[#F7F7F7] placeholder-transparent focus:outline-none focus:ring-1 focus:ring-[#93c740] focus:border-[#93c740] transition-all`}
                      />
                      <label
                        htmlFor="otp"
                        className={`absolute left-3 top-2 text-xs ${
                          !otpSent ? "text-[#BDBDBD]/50" : "text-[#BDBDBD]"
                        } transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#93c740]`}
                      >
                        Enter 6-digit OTP
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!validateMobile(mobile) || isLoading}
                      className={`px-4 py-2 text-sm rounded-md font-medium h-[42px] sm:h-auto ${
                        !validateMobile(mobile) || isLoading
                          ? "bg-[#93c740]/30 text-[#F7F7F7]/70 cursor-not-allowed"
                          : "bg-[#93c740] hover:bg-[#7cad34] text-black"
                      } transition-all`}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </button>
                  </div>
                  {otpError && (
                    <p className="text-xs text-red-500 mt-1 animate-fadeIn">
                      {otpError}
                    </p>
                  )}
                  {otpSent && !otpError && (
                    <p className="text-xs text-[#93c740] mt-1 animate-fadeIn">
                      OTP sent successfully!
                    </p>
                  )}
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-800/50 text-[#F7F7F7] px-3 py-2 rounded-md text-sm animate-fadeIn">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={
                isLoading ||
                (adminLoginMode === "password" &&
                  (!email || !password || emailError)) ||
                (adminLoginMode === "otp" &&
                  (!otpSent || otp.length !== 6 || mobileError))
              }
              className={`w-full py-3 rounded-md text-sm font-medium text-black ${
                isLoading ||
                (adminLoginMode === "password" &&
                  (!email || !password || emailError)) ||
                (adminLoginMode === "otp" &&
                  (!otpSent || otp.length !== 6 || mobileError))
                  ? "bg-[#93c740]/30 cursor-not-allowed"
                  : "bg-[#93c740] hover:bg-[#7cad34]"
              } transition-all`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
