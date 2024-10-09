import React from "react";

const BtnInputPub = ({ onClick }) => {
  return (
    <button
      className="btn btn-sm bg-rdprmy text-whtprmy border-none w-20"
      onClick={onClick}
    >
      Input
    </button>
  );
};

export default BtnInputPub;
