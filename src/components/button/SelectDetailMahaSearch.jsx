import React from "react";

const SelectDetailMahaSearch = () => {
  return (
    <>
      <select className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm">
        <option disabled selected>
          Cari
        </option>
        <option>Judul</option>
        <option>Nomor</option>
        <option>Tahun</option>
      </select>
    </>
  );
};

export default SelectDetailMahaSearch;
