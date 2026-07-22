"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Loading from "@/app/loading";

type LoadingContextType = {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const ctx = useContext(LoadingContext);

  if (!ctx) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return ctx;
}

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}

      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loading />
        </div>
      )}
    </LoadingContext.Provider>
  );
}
