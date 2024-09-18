import React from "react";
import logo from "../assets/shield-database.svg"; // Arahkan ke lokasi file SVG

const LogoLogin = () => {
  return (
    <div>
      <img src={logo} alt="Login Logo" className="h-50 w-50" />
    </div>
  );
};

export default LogoLogin;
