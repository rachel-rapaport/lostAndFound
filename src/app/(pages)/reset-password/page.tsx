"use client"
import { ResetPassword } from "@/app/components/login/ResetPassword";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const email = searchParams.email;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
        <div>
          <ResetPassword email={email}></ResetPassword>
        </div>
    </QueryClientProvider>
  );
};
export default page;
