import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AmbassadorLoginForm() {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }, []);

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
      // const res = await fetch("http://localhost:3000/auth/distributor/send-otp", {
      const res = await fetch("https://crank.zeppsandbox.com/api/auth/distributor/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_number: `+91${mobile}` }),
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
      // const res = await fetch("http://localhost:3000/auth/distributor/verify-otp", {
      const res = await fetch("https://crank.zeppsandbox.com/api/auth/distributor/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile_number: `+91${mobile}`, otp }),
      });
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
    "peer w-full bg-[#1c1c1c] border border-gray-700 rounded-md px-3 pt-5 pb-2 text-sm text-white placeholder-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f1660d] focus:border-[#f1660d] transition duration-200 ease-in-out";

  const labelClass =
    "absolute left-3 top-2 text-xs text-gray-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#f1660d]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] px-4 py-6 sm:py-12 font-mono">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-[#1f1f1f] rounded-xl shadow-2xl p-6 border-l-4 border-[#f1660d] animate-fadeIn">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white tracking-tight animate-slideDown">
            Ambassador Login
          </h2>
          <p className="mt-2 text-base text-gray-400">Sign in with your mobile number</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative">
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
                  disabled={!otpSent}
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`${inputClass} ${!otpSent ? "bg-gray-800" : ""}`}
                />
                <label htmlFor="otp" className={labelClass}>
                  Enter 6-digit OTP
                </label>
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!mobile || mobile.length !== 10 || isLoading}
                className={`px-4 py-2 text-sm rounded-md font-semibold ${
                  !mobile || mobile.length !== 10 || isLoading
                    ? "bg-[#f1660d80] cursor-not-allowed text-white"
                    : "bg-[#f1660d] hover:bg-[#d6590a] text-white"
                } transition duration-200 transform hover:scale-[1.02] h-[42px] sm:h-auto`}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
            {otpSent && (
              <p className="text-sm text-[#f1660d] mt-1 animate-fadeIn">
                OTP sent successfully!
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-800 text-red-200 px-3 py-2 rounded-md text-sm animate-fadeIn">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || !otpSent}
              className={`w-full py-3 rounded-md text-sm font-semibold text-white ${
                isLoading || !otpSent
                  ? "bg-[#f1660d80] cursor-not-allowed"
                  : "bg-[#f1660d] hover:bg-[#d6590a]"
              } transition duration-200 transform hover:scale-[1.01]`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
          .animate-slideDown {
            animation: slideDown 0.4s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

