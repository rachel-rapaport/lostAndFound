import { ResetPassword } from "@/app/components/ResetPassword";
import React, { Suspense } from "react";

const page = ({ searchParams }: { searchParams: { [key: string]: string }}) => {
  const email = searchParams.email;

  return (
    <Suspense fallback={<div>Loading...</div>}>
   <div><ResetPassword email={email}></ResetPassword></div>
   </Suspense>
  );
};
export default page;
