import React from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import PaginationPen from "./PaginationPen";
import SelectDos from "./button/SelectDos";
import BtnSearchDos from "./button/BtnSearchDos";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import BtnInputDos from "./button/BtnInputDos";
import InputDosModal from "./modal/InputDosModal";
import { useNavigate } from "react-router-dom";

const TableDos = () => {
  const navigate = useNavigate();

  // Handle navigation when button is clicked
  const handleClick = (e, href) => {
    e.preventDefault();
    navigate(href); // Navigate to the target route
  };

  return (
    <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="h-full w-full border border-blckprmy rounded-xl p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between pb-3">
          <div className="px-7 py-4">
            <h1 className="text-2xl font-bold text-blckprmy">Data Dosen</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
            />
            <SelectDos />
            <div className="flex flex-row md:flex-row gap-3">
              <BtnSearchDos />
              <BtnInputDos />
              <InputDosModal />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-whtprmy px-6">
          <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
            <table className="table table-pin-rows w-full">
              <thead className="bg-whtprmy text-blckprmy">
                <tr className="bg-whtprmy">
                  <th className="hidden md:table-cell"></th>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th className="hidden md:table-cell">Angkatan</th>
                  <th className="hidden md:table-cell">Prodi</th>
                  <th className="hidden md:table-cell"></th>
                </tr>
              </thead>
              <tbody>
                {/* Data row 1 */}
                <tr>
                  <th className="hidden md:table-cell">1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td className="hidden md:table-cell">2020</td>
                  <td className="hidden md:table-cell">Informatika</td>
                  <td className="text-center">
                    <button
                      onClick={(e) => handleClick(e, "/dosen/detaildosen")}
                    >
                      <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                    </button>
                  </td>
                </tr>

                {/* Data row 2 */}
                <tr>
                  <th className="hidden md:table-cell">2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td className="hidden md:table-cell">2021</td>
                  <td className="hidden md:table-cell">Sistem Informasi</td>
                  <td className="text-center">
                    <button
                      onClick={(e) => handleClick(e, "/dosen/detaildosen")}
                    >
                      <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-6 flex justify-center pt-5">
          <PaginationPen />
        </div>
      </div>
    </div>
  );
};

export default TableDos;
