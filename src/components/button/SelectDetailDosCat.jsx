import React from "react";

const SelectDetailDosCat = ({ handleJudul }) => {
  const handleChange = (e) => {
    handleJudul(e.target.value); // Kirim nilai kategori yang dipilih ke DetailContainer
  };
  return (
    <>
      <select
        className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm"
        onChange={handleChange}
        defaultValue="Penelitian"
      >
        <option disabled>Kategori</option>
        <option value="Penelitian">Penelitian</option>
        <option value="Detail">Detail</option>
      </select>
    </>
  );
};

export default SelectDetailDosCat;
