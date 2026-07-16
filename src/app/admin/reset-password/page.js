"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FiLock, FiEye, FiEyeOff, FiShield } from "react-icons/fi";
import { resetPassword } from "@/lib/api";
import { toast } from "react-hot-toast";

const ResetForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (!token || !id) {
      toast.error("Invalid reset link. Please request a new link.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ id, token, password });
      toast.success("Password reset successfully! Redirecting...");
      setTimeout(() => {
        router.push("/admin");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed. The link might have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleReset} className="p-8 space-y-5">
      {!token || !id ? (
        <div className="text-center text-red-500 py-4 font-medium">
          ⚠️ Invalid or missing parameters. Please request a new password reset link.
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="mt-4 block w-full py-2 bg-base-200 border border-base-300 rounded-md text-sm text-base-content hover:bg-base-300 transition-all font-semibold cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content/70">
              New Password
            </label>
            <div className="relative">
              <FiLock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                size={16}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-base-content/70">
              Confirm New Password
            </label>
            <div className="relative">
              <FiLock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
                size={16}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-10 py-3 bg-base-200 border border-base-300 rounded-md text-sm focus:outline-none focus:border-[#02b677] focus:ring-1 focus:ring-[#02b677] transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content/70 transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>

          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-xs font-semibold ml-1">
              ❌ Passwords do not match.
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password || password !== confirmPassword}
            className="w-full py-3 rounded-md font-bold text-sm tracking-wider transition-all duration-300 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: (loading || !password || password !== confirmPassword)
                ? "rgba(2,182,119,0.5)"
                : "linear-gradient(135deg, #02b677, #00955f)",
              color: "white",
              boxShadow: (loading || !password || password !== confirmPassword) ? "none" : "0 4px 20px rgba(2,182,119,0.4)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </>
      )}
    </form>
  );
};

const AdminResetPassword = () => {
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
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div
            className="p-8 pb-6 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(2,182,119,0.15) 0%, rgba(79,70,229,0.1) 100%)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(2,182,119,0.2)" }}
            >
              <FiShield className="text-3xl" style={{ color: "#02b677" }} />
            </div>
            <h1 className="text-2xl font-extrabold mb-1">Reset Password</h1>
            <p className="text-base-content/50 text-sm">
              Enter your new admin credentials below
            </p>
          </div>

          {/* Form wrapped in Suspense */}
          <Suspense fallback={
            <div className="p-8 text-center">
              <span className="loading loading-spinner text-spotify"></span>
              <p className="text-xs text-base-content/50 mt-2">Loading Form...</p>
            </div>
          }>
            <ResetForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminResetPassword;
