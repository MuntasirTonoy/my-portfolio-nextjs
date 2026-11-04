"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  errorMessage,
  fetchCurrentAdmin,
  fetchPortfolio,
  logoutAdmin,
  updateSection as apiUpdateSection,
} from "@/lib/api";

const AdminContext = createContext(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};

export function AdminProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchCurrentAdmin(), fetchPortfolio()])
      .then(([admin, portfolio]) => {
        if (cancelled) return;
        setUser(admin);
        setPortfolioData(portfolio);
      })
      .catch((error) => {
        if (cancelled) return;
        if (error?.response?.status === 401) router.replace("/admin");
        else toast.error(errorMessage(error, "Failed to load dashboard data."));
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const updateSection = useCallback(async (section, data) => {
    setSaveStatus("saving");
    const toastId = toast.loading("Saving changes...");
    try {
      const updated = await apiUpdateSection(section, data);
      // Portfolio sub-sections come back inside the full document; lists and
      // "about" come back as the saved value itself.
      setPortfolioData((prev) => ({ ...prev, [section]: updated?.[section] ?? updated }));
      setSaveStatus("saved");
      toast.success("Changes saved successfully!", { id: toastId });
    } catch (error) {
      setSaveStatus("error");
      toast.error(errorMessage(error, "Failed to save changes."), { id: toastId });
    } finally {
      setTimeout(() => setSaveStatus(""), 2500);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } finally {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <AdminContext.Provider
      value={{
        user,
        setUser,
        portfolioData,
        loading: !portfolioData,
        updateSection,
        saveStatus,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
