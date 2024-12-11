import { ResetPassword } from "@/app/components/ResetPassword";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
   <div><ResetPassword></ResetPassword></div>
   </Suspense>
  );
};
export default page;
