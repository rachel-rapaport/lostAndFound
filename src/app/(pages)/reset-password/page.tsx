"use client"
import { ResetPassword } from "@/app/components/ResetPassword";
import React, { Suspense } from "react";
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
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <div>
          <ResetPassword email={email}></ResetPassword>
        </div>
      {/* </Suspense> */}
    </QueryClientProvider>
  );
};
export default page;
