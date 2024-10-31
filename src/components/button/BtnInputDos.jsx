import React from "react";

const BtnInputDos = () => {
  return (
    <button
      className="btn btn-sm bg-rdprmy text-whtprmy border-none w-20"
      onClick={() => document.getElementById("my_modal_20").showModal()}
    >
      Input
    </button>
  );
};

export default BtnInputDos;
