import LoginForm from "@/app/components/login/Login";
import React from "react";

const page = () => {
  return (
    <div className=" flex justify-center items-center">
      <div className=" rounded-lg shadow-lg w-full max-w-lg">
        <LoginForm />
      </div>
   </div>
  );
};
export default page;
