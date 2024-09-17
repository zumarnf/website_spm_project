import React from "react";
import BtnLogin from "../components/BtnLogin";
import FormLogin from "../components/FormLogin";

const LoginPage = () => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="basis-1/2 bg-rdprmy flex justify-center items-center">
        Hai
      </div>
      <div className="basis-1/2 bg-whtprmy flex justify-center items-center">
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage;
