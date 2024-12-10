import React from "react";

const SelectPres = ({ onChange }) => {
  return (
    <>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm"
      >
        <option value="Tahun">NIM</option>
        <option value="Nama">Nama</option>
        <option value="Judul">Judul</option>
      </select>
    </>
  );
};

export default SelectPres;
