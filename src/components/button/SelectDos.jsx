import React from "react";

const SelectDos = () => {
  return (
    <>
      <select className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm">
        <option disabled selected>
          Cari
        </option>
        <option>NIM</option>
        <option>Nama</option>
      </select>
    </>
  );
};

export default SelectDos;
