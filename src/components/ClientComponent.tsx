"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
const ClientComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ClientComponent;
