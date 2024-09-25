import React from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";

const TablePen = () => {
  return (
    <>
      <div className="h-full flex flex-col pr-5 pb-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="h-full w-full border border-blckprmy rounded-xl p-4">
          <div className="px-7 py-4">
            <h1 className="text-2xl font-bold pb-7 text-blckprmy">Dashboard</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePen;
