import React from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import PaginationPen from "./PaginationPen";
import SelectDos from "./button/SelectDos";
import BtnSearchDos from "./button/BtnSearchDos";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import BtnInputDos from "./button/BtnInputDos";
import InputMahaModal from "./modal/InputMahaModal";
import { useNavigate } from "react-router-dom";
import InputDosModal from "./modal/InputDosModal";

const TableDos = () => {
  const navigate = useNavigate();

  // Handle navigation when button is clicked
  const handleClick = (e, href) => {
    e.preventDefault();
    navigate(href); // Navigate to the target route
  };

  return (
    <>
      <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="h-full w-full border border-blckprmy rounded-xl p-4">
          <div className="flex justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">Data Dosen</h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <BtnInputDos />
              <InputDosModal />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-44 max-w-xs"
              />
              <SelectDos />
              <BtnSearchDos />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
              <table className="table table-pin-rows">
                <thead className="bg-whtprmy text-blckprmy">
                  <tr className="bg-whtprmy">
                    <th></th>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Angkatan</th>
                    <th>Prodi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist akdbaskdakdaskdaskjdakda</td>
                    <td>Blue</td>
                    <td>Blue</td>
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

                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                    <td>Blue</td>
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
          <div className="px-6 flex justify-center pt-5">
            <PaginationPen />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableDos;
