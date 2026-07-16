"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  fetchPortfolio,
  updateSection as apiUpdateSection,
} from "@/lib/api";
import toast from "react-hot-toast";

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context)
    throw new Error("usePortfolio must be used within PortfolioProvider");
  return context;
};

// Alias for admin pages
export const useAdmin = usePortfolio;

export const AdminProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("");

  const loadData = async () => {
    try {
      const data = await fetchPortfolio();
      setPortfolioData(data);
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateSection = async (section, data) => {
    setSaveStatus("saving");
    const toastId = toast.loading("Saving changes...");
    try {
      const updated = await apiUpdateSection(section, data);

      // Refresh local state
      setPortfolioData((prev) => ({
        ...prev,
        [section]: updated[section] || updated, // Handle different return shapes
      }));

      setSaveStatus("saved");
      toast.success("Changes saved successfully!", { id: toastId });
    } catch (error) {
      console.error("Save failed:", error);
      setSaveStatus("error");
      toast.error("Failed to save changes. Please try again.", { id: toastId });
    } finally {
      setTimeout(() => setSaveStatus(""), 2500);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioData,
        updateSection,
        saveStatus,
        loading,
        refreshData: loadData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContext;
