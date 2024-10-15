import React from "react";

const BtnInputMaha = () => {
  return (
    <button
      className="btn btn-sm bg-rdprmy text-whtprmy border-none w-20"
      onClick={() => document.getElementById("my_modal_13").showModal()}
    >
      Input
    </button>
  );
};

export default BtnInputMaha;
