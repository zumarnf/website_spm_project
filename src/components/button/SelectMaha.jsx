import React from "react";

const SelectMaha = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-xs"
    >
      <option value="NIM">NIM</option>
      <option value="Nama">Nama</option>
      <option value="Angkatan">Angkatan</option>
      <option value="Id_prodi">Prodi</option>
    </select>
  );
};

export default SelectMaha;
