"use client";

import React, { createContext, ReactNode } from "react";
import { queryClient } from "../_lib/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

const QueryClient = createContext({});

export function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClient.Provider value={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </QueryClient.Provider>
  );
}
