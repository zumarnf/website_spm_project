import React from "react";
import SidebarMen from "../components/layout/SidebarMen";
import TablePres from "../components/TablePres";

const Prestasi = () => {
  return (
    <>
      <div className="flex bg-whtprmy w-screen h-screen">
        <div className="basis-1/4 h-full">
          <SidebarMen />
        </div>
        <div className="basis-3/4 pr-8 pt-2 pb-5 h-full">
          <TablePres />
        </div>
      </div>
    </>
  );
};

export default Prestasi;
