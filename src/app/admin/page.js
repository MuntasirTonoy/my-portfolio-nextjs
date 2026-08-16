"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiShield, FiMail, FiX } from "react-icons/fi";
import { loginAdmin, forgotPassword } from "@/lib/api";
import { toast } from "react-hot-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Forgot password modal states
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginAdmin({ email, password });
      localStorage.setItem("admin_auth", "true");
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data));
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setForgotLoading(true);
    try {
      const res = await forgotPassword({ email: forgotEmail });
      toast.success(res.message || "Reset link sent to your email!");
      setForgotEmail("");
      setShowForgotModal(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to request password reset.",
      );
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background glows */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#02b677" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "#4f46e5" }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#02b677 1px, transparent 1px), linear-gradient(90deg, #02b677 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div
            className="p-8 pb-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(2,182,119,0.15) 0%, rgba(79,70,229,0.1) 100%)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(2,182,119,0.2)" }}
            >
              <FiShield className="text-3xl" style={{ color: "#02b677" }} />
            </motion.div>
            <h1 className="text-2xl font-extrabold mb-1">Admin Panel</h1>
            <p className="text-base-content/50 text-sm">
              Portfolio Content Manager
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-base-content/70">
                Admin Email
              </label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                  size={16}
                />
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-base-200 border border-base-300 rounded-md text-sm focus:outline-none focus:border-[#02b677] focus:ring-1 focus:ring-[#02b677] transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-base-content/70">
                Admin Password
              </label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                  size={16}
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-10 py-3 bg-base-200 border border-base-300 rounded-md text-sm focus:outline-none focus:border-[#02b677] focus:ring-1 focus:ring-[#02b677] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              <div className="text-right mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(true);
                    setError("");
                  }}
                  className="text-xs text-[#02b677] hover:underline hover:text-[#00955f] transition-all font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-medium bg-red-500/10 px-3 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md font-bold text-sm tracking-wider transition-all duration-300 relative overflow-hidden cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #02b677, #00955f)",
                color: "white",
                boxShadow: "0 4px 20px rgba(2,182,119,0.4)",
              }}
            >
              Access Dashboard
            </button>

            <p className="text-center text-xs text-base-content/30 pt-2">
              🔒 Secure admin access only
            </p>
          </form>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForgotModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-md bg-base-100 border border-base-300 rounded-2xl shadow-2xl p-6 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="absolute top-4 right-4 text-base-content/40 hover:text-base-content/70 transition-colors cursor-pointer"
              >
                <FiX size={20} />
              </button>

              <h2 className="text-xl font-extrabold mb-2">Forgot Password</h2>
              <p className="text-sm text-base-content/50 mb-6">
                Enter your registered admin email. We will send you a password
                reset link.
              </p>

              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-base-content/70 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                      size={16}
                    />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="give origin email to reset password"
                      className="w-full pl-10 pr-4 py-3 bg-base-200 border border-base-300 rounded-md text-sm focus:outline-none focus:border-[#02b677] focus:ring-1 focus:ring-[#02b677] transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-3 rounded-md font-bold text-sm tracking-wider transition-all duration-300 relative overflow-hidden cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #02b677, #00955f)",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(2,182,119,0.3)",
                  }}
                >
                  Send Reset Link
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLogin;
