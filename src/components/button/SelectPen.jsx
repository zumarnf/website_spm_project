import React from "react";

const SelectPen = () => {
  return (
    <>
      <select className="select select-bordered w-36 max-w-xs bg-whtprmy text-blckprmy select-sm text-sm">
        <option disabled selected>
          Cari
        </option>
        <option>NIM</option>
        <option>Nama</option>
        <option>Judul</option>
      </select>
    </>
  );
};

export default SelectPen;
