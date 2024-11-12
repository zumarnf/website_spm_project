import React from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchMaha from "./button/BtnSearchMaha";
import PaginationPen from "./PaginationPen";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import BtnInputMaha from "./button/BtnInputMaha";
import InputMahaModal from "./modal/InputMahaModal";
import SelectMaha from "./button/SelectMaha";
import { useNavigate } from "react-router-dom";

const TableMaha = () => {
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
            <h1 className="text-2xl font-bold text-blckprmy">Data Mahasiswa</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
            />
            <SelectMaha />
            <div className="flex flex-row md:flex-row gap-3">
              <BtnSearchMaha />
              <BtnInputMaha />
              <InputMahaModal />
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
                  <td>123456789</td>
                  <td>Cy Ganderton</td>
                  <td className="hidden md:table-cell">2020</td>
                  <td className="hidden md:table-cell">Informatika</td>
                  <td className="text-center">
                    <button
                      onClick={(e) =>
                        handleClick(e, "/mahasiswa/detailpenelitian")
                      }
                    >
                      <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                    </button>
                  </td>
                </tr>

                {/* Data row 2 */}
                <tr>
                  <th className="hidden md:table-cell">2</th>
                  <td>987654321</td>
                  <td>Hart Hagerty</td>
                  <td className="hidden md:table-cell">2021</td>
                  <td className="hidden md:table-cell">Sistem Informasi</td>
                  <td className="text-center">
                    <button
                      onClick={(e) =>
                        handleClick(e, "/mahasiswa/detailpenelitian")
                      }
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

export default TableMaha;
