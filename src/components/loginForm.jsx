// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginForm() {
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//     }
//   }, []);

//   const [loginType, setLoginType] = useState("admin"); // 'admin' or 'distributor'
//   const [adminLoginMode, setAdminLoginMode] = useState("password"); // 'password' or 'otp'
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//     try {
//       const url =
//         loginType === "admin"
//           ? "https://crank.zeppsandbox.com/api/auth/admin/send-otp"
//           : "https://crank.zeppsandbox.com/api/auth/distributor/send-otp";

//       const res = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mobile_number: `+91${mobile}`,
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         setError(data.message || "Failed to send OTP");
//       } else {
//         alert("OTP sent successfully");
//       }
//     } catch (err) {
//       setError("Network error while sending OTP");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       let res;
//       if (loginType === "admin") {
//         if (adminLoginMode === "password") {
//           res = await fetch("https://crank.zeppsandbox.com/api/auth/admin/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email, password }),
//           });
//         } else {
//           res = await fetch("https://crank.zeppsandbox.com/api/auth/admin/verify-otp", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
//           });
//         }
//       } else {
//         res = await fetch("https://crank.zeppsandbox.com/api/auth/distributor/verify-otp", {
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
//     }
//   };

//   return (
//     <div className="container max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-bold mb-4">Login</h2>

//       <div className="flex justify-center gap-4 mb-4">
//         <button
//           onClick={() => setLoginType("admin")}
//           className={`px-4 py-2 border rounded ${
//             loginType === "admin" ? "bg-blue-600 text-white" : "bg-gray-200"
//           }`}
//         >
//           Admin
//         </button>
//         <button
//           onClick={() => setLoginType("distributor")}
//           className={`px-4 py-2 border rounded ${
//             loginType === "distributor"
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200"
//           }`}
//         >
//           Distributor
//         </button>
//       </div>

//       {loginType === "admin" && (
//         <div className="flex justify-center gap-2 mb-4">
//           <button
//             onClick={() => setAdminLoginMode("password")}
//             className={`px-3 py-1 border rounded text-sm ${
//               adminLoginMode === "password"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100"
//             }`}
//           >
//             Use Password
//           </button>
//           <button
//             onClick={() => setAdminLoginMode("otp")}
//             className={`px-3 py-1 border rounded text-sm ${
//               adminLoginMode === "otp"
//                 ? "bg-blue-500 text-white"
//                 : "bg-gray-100"
//             }`}
//           >
//             Use OTP
//           </button>
//         </div>
//       )}

//       <form onSubmit={handleLogin} className="space-y-4">
//         {loginType === "admin" && adminLoginMode === "password" && (
//           <>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//           </>
//         )}

//         {(loginType === "distributor" ||
//           (loginType === "admin" && adminLoginMode === "otp")) && (
//           <>
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               required
//               className="w-full p-2 border rounded"
//             />
//             <div className="flex justify-between items-center">
//               <input
//                 type="text"
//                 placeholder="OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//                 className="w-full p-2 border rounded mr-2"
//               />
//               <button
//                 type="button"
//                 onClick={handleSendOtp}
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 Send OTP
//               </button>
//             </div>
//           </>
//         )}

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  // const crankURL = "http://localhost:3000";
  const crankURL = "https://crank.zeppsandbox.com/api";
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }, []);

  const [loginType, setLoginType] = useState("admin");
  const [adminLoginMode, setAdminLoginMode] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    setIsLoading(true);
    setError("");
    try {
      const url =
        loginType === "admin"
          ? `${crankURL}/auth/admin/send-otp`
          : // ? "https://crank.zeppsandbox.com/api/auth/admin/send-otp"
            `${crankURL}/auth/distributor/send-otp`;
      // : "https://crank.zeppsandbox.com/api/auth/distributor/send-otp";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_number: `+91${mobile}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send OTP");
      } else {
        setOtpSent(true);
      }
    } catch (err) {
      setError("Network error while sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let res;
      if (loginType === "admin") {
        if (adminLoginMode === "password") {
          res = await fetch(`${crankURL}/auth/admin/login`, {
            // res = await fetch("https://crank.zeppsandbox.com/api/auth/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
        } else {
          res = await fetch(`${crankURL}/auth/admin/verify-otp`, {
            // res = await fetch("https://crank.zeppsandbox.com/api/auth/admin/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
          });
        }
      } else {
        res = await fetch(`${crankURL}/auth/distributor/verify-otp`, {
          // res = await fetch("https://crank.zeppsandbox.com/api/auth/distributor/verify-otp", {
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

  const inputClass =
    "peer w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out";

  const labelClass =
    "absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6 sm:py-12">
      <div
        className={`w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 ${
          loginType === "admin"
            ? "border-l-4 border-indigo-500"
            : "border-l-4 border-green-500"
        }`}
      >
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-gray-500">
            Sign in to your <span className="font-semibold">{loginType}</span>{" "}
            account
          </p>
        </div>

        <div className="mt-4 flex rounded-md overflow-hidden border border-gray-300">
          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium ${
              loginType === "admin"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } transition`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setLoginType("distributor")}
            className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium ${
              loginType === "distributor"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } transition`}
          >
            Ambassador
          </button>
        </div>

        {loginType === "admin" && (
          <div className="mt-4 flex rounded-md overflow-hidden border border-gray-300">
            <button
              type="button"
              onClick={() => setAdminLoginMode("password")}
              className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium ${
                adminLoginMode === "password"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } transition`}
            >
              Email & Password
            </button>
            <button
              type="button"
              onClick={() => {
                setAdminLoginMode("otp");
                setOtpSent(false);
              }}
              className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-medium ${
                adminLoginMode === "otp"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } transition`}
            >
              Mobile OTP
            </button>
          </div>
        )}

        <form
          onSubmit={handleLogin}
          className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 relative"
        >
          {loginType === "admin" && adminLoginMode === "password" && (
            <>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  value={password}
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
              </div>
            </>
          )}

          {(loginType === "distributor" ||
            (loginType === "admin" && adminLoginMode === "otp")) && (
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
                  onChange={(e) => setMobile(e.target.value)}
                  className={inputClass}
                />
                <label htmlFor="mobile" className={labelClass}>
                  10 Digit Mobile Number
                </label>
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
                      disabled={!otpSent && loginType !== "distributor"}
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`${inputClass} ${
                        !otpSent && loginType !== "distributor"
                          ? "bg-gray-100"
                          : ""
                      }`}
                    />
                    <label htmlFor="otp" className={labelClass}>
                      Enter 6-digit OTP
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={!mobile || mobile.length !== 10 || isLoading}
                    className={`px-4 py-2 text-xs sm:text-sm rounded-md ${
                      !mobile || mobile.length !== 10 || isLoading
                        ? "bg-indigo-300 cursor-not-allowed text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    } transition h-[42px] sm:h-auto`}
                  >
                    {isLoading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
                {otpSent && (
                  <p className="text-xs sm:text-sm text-green-600 mt-1">
                    OTP sent successfully!
                  </p>
                )}
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded-md text-xs sm:text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={
                isLoading ||
                (loginType === "admin" && adminLoginMode === "otp" && !otpSent)
              }
              className={`w-full py-2 sm:py-3 rounded-md text-xs sm:text-sm font-medium text-white ${
                isLoading ||
                (loginType === "admin" && adminLoginMode === "otp" && !otpSent)
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } transition`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
