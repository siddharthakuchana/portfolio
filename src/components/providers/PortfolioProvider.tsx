"use client";

import { createContext, useContext, ReactNode } from "react";

const PortfolioContext = createContext<any>(null);

export function PortfolioProvider({ data, children }: { data: any, children: ReactNode }) {
  return (
    <PortfolioContext.Provider value={data}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolioData must be used within a PortfolioProvider");
  }
  return context;
}
