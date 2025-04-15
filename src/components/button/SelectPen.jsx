import React from "react";

const SelectPen = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-xs"
    >
      <option value="Judul">Judul</option>
      <option value="Tahun">Tahun</option>
      <option value="Nama">Nama</option>
      <option value="Ketua_prodi">Prodi</option>
    </select>
  );
};

export default SelectPen;
