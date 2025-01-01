"use client";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./components/layOut/Header";
import Script from "next/script";

const LayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <body>{children}
        <Script src="https://cdn.enable.co.il/licenses/enable-L355685mrln16cfb-0125-67060/init.js"></Script>
      </body>
    </QueryClientProvider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="rtl">
      <LayoutContent>
        <Header />
        <div className="inner-body">{children}</div>
      </LayoutContent>
    </html>
  );
}