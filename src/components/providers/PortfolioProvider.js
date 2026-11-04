"use client";

import { createContext, useContext } from "react";

// Public site data, fetched on the server and handed down once per request,
// so pages render with real content (good for SEO and first paint).
const PortfolioContext = createContext(null);

export function PortfolioProvider({ data, children }) {
  return <PortfolioContext.Provider value={data}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const data = useContext(PortfolioContext);
  if (!data) throw new Error("usePortfolio must be used within PortfolioProvider");
  return data;
}
