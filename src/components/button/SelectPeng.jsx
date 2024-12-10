import React from "react";

const SelectPeng = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm"
    >
      <option value="Judul">Judul</option>
      <option value="Nama">Nama</option>
      <option value="Tahun">Tahun</option>
    </select>
  );
};

export default SelectPeng;
