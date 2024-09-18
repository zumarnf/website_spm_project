import React from "react";
import { useNavigate } from "react-router-dom";

const BtnLogin = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <>
      <button
        className="btn bg-rdprmy text-whtprmy border-none px-28"
        onClick={handleLogin}
      >
        Login
      </button>
    </>
  );
};

export default BtnLogin;
