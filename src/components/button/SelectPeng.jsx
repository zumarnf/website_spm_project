import React from "react";

const SelectPeng = () => {
  return (
    <>
      <select className="select select-bordered w-36 max-w-xs bg-whtprmy text-blckprmy select-sm text-sm">
        <option disabled selected>
          Cari
        </option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
    </>
  );
};

export default SelectPeng;
