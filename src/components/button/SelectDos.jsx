import React from "react";

const SelectDos = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm"
    >
      <option value="NIP">NIP</option>
      <option value="Nama">Nama</option>
    </select>
  );
};

export default SelectDos;
