import React, { useState } from "react";
import DetailContainerPen from "../components/DetailContainerPen";
import SidebarMen from "../components/layout/SidebarMen";
import { HiArrowRight, HiX } from "react-icons/hi";

const DetailMahasiswaPen = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="relative flex w-screen h-screen bg-whtprmy overflow-hidden">
        <button className="p-4 md:hidden text-blckprmy" onClick={toggleSidebar}>
          <HiArrowRight size={24} />
        </button>
        <div
          className={`fixed top-0 left-0 h-full w-3/4 md:w-1/4 bg-whtprmy transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 z-20`}
        >
          <div className="flex justify-end p-4 md:hidden">
            <button onClick={toggleSidebar}>
              <HiX size={24} className="text-blckprmy" />
            </button>
          </div>
          <SidebarMen />
        </div>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <div
          className="flex-1 pr-8 pt-2 pb-5 h-full"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <DetailContainerPen />
        </div>
      </div>
    </>
  );
};

export default DetailMahasiswaPen;
