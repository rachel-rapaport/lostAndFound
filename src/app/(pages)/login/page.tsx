import LoginForm from "@/app/components/Login";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className=" rounded-lg shadow-lg w-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
};
export default page;
