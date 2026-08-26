import React from "react";
import Image from "next/image";
import EnterPassword from "@/components/startup/EnterPassword";

const Login = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 overflow-hidden rounded-full">
        <Image
          src="/nonoro.svg"
          alt="nonoro"
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>
      <div className="w-full max-w-xs mt-4">
        <label className="flex text-lg mb-4 items-center justify-center font-bold font-mono">
          Noah Peñaranda
        </label>
        <EnterPassword />
      </div>
    </div>
  );
};

export default Login;
