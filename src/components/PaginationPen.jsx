import React from "react";

const PaginationPen = () => {
  return (
    <>
      <div className="join border-none bg-whtprmy text-blckprmy">
        <button className="join-item btn btn-sm border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy text-xs">
          1
        </button>
        <button className="join-item btn btn-sm border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy text-xs">
          2
        </button>
        <button className="join-item btn btn-sm border-none btn-disabled bg-whtprmy text-blckprmy">
          ...
        </button>
        <button className="join-item btn btn-sm border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy text-xs">
          99
        </button>
        <button className="join-item btn btn-sm border-none bg-whtprmy text-blckprmy hover:bg-rdprmy hover:text-whtprmy text-xs">
          100
        </button>
      </div>
    </>
  );
};

export default PaginationPen;
