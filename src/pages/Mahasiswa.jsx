import React from "react";
import SidebarMen from "../components/layout/SidebarMen";
import TableMaha from "../components/TableMaha";

const Pengabdian = () => {
  return (
    <>
      <div className="flex bg-whtprmy w-screen h-screen">
        <div className="basis-1/4 h-full">
          <SidebarMen />
        </div>
        <div className="basis-3/4 pr-8 pt-2 pb-5 h-full">
          <TableMaha />
        </div>
      </div>
    </>
  );
};

export default Pengabdian;
