import React from "react";

const BtnSearchPres = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="btn btn-sm bg-rdprmy text-whtprmy border-none w-16 text-sm"
      >
        Cari
      </button>
    </>
  );
};

export default BtnSearchPres;
