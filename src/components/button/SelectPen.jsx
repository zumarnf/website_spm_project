import React from "react";

const SelectPen = () => {
  return (
    <>
      <div>
        <select className="select select-bordered w-36 bg-whtprmy text-blckprmy">
          <option disabled selected>
            Cari
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
    </>
  );
};

export default SelectPen;
