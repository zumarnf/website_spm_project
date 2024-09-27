import React from "react";

const PaginationPen = () => {
  return (
    <>
      <div className="join border-none bg-whtprmy text-blckprmy">
        <button className="join-item btn border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy">
          1
        </button>
        <button className="join-item btn border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy">
          2
        </button>
        <button className="join-item btn border-none btn-disabled bg-whtprmy text-blckprmy">
          ...
        </button>
        <button className="join-item btn border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy">
          99
        </button>
        <button className="join-item btn border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy">
          100
        </button>
      </div>
    </>
  );
};

export default PaginationPen;
