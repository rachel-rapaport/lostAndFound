"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/Header";

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" dir="rtl" >
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContent>
      <html lang="en">
        <body dir="rtl" className="p-[70px]">
          {/* overflow-y-hidden */}
          <Header />
          {children}
        </body>
      </html>
    </LayoutContent>
  );
}