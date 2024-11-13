import React, { useState } from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPres from "./button/BtnSearchPres";
import SelectPres from "./button/SelectPres";
import BtnInputPres from "./button/BtnInputPres";
import PaginationPen from "./PaginationPen";
import InputPresModal from "./modal/InputPresModal";
import InputPresMaha from "./modal/InputPresMaha";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import DetailPengModel from "./modal/DetailPengModel";

const TablePres = () => {
  const [isInputPengModalVisible, setInputPengModalVisible] = useState(false);
  const [isInputPengMahaVisible, setInputPengMahaVisible] = useState(false);

  const handleOpenInputPengModal = () => {
    setInputPengModalVisible(true);
    setInputPengMahaVisible(false); // Hide InputPenMaha
  };

  const handleSwitchToMaha = () => {
    setInputPengModalVisible(false); // Hide InputPenModal
    setInputPengMahaVisible(true); // Show InputPenMaha
  };

  const handleBackToModalPeng = () => {
    setInputPengMahaVisible(false); // Hide InputPenMaha
    setInputPengModalVisible(true); // Show InputPenModal
  };

  const handleCloseModals = () => {
    setInputPengModalVisible(false);
    setInputPengMahaVisible(false);
  };

  return (
    <>
      <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="w-full border border-blckprmy rounded-xl p-4">
          <div className="flex flex-col md:flex-row justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">
                Data Prestasi
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
              />
              <SelectPres />
              <div className="flex flex-row md:flex-row gap-3">
                <BtnSearchPres />
                <BtnInputPres onClick={handleOpenInputPengModal} />
              </div>

              {isInputPengModalVisible && (
                <InputPresModal
                  onSwitch={handleSwitchToMaha}
                  onClose={handleCloseModals}
                />
              )}
              {isInputPengMahaVisible && (
                <InputPresMaha
                  onBack={handleBackToModalPeng}
                  onClose={handleCloseModals}
                />
              )}
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
              <table className="table table-pin-rows w-full">
                <thead className="bg-whtprmy text-blckprmy">
                  <tr className="bg-whtprmy">
                    <th className="hidden md:table-cell"></th>
                    <th>Judul</th>
                    <th className="hidden md:table-cell">Bidang</th>
                    <th className="hidden md:table-cell">Rentan Waktu</th>
                    <th className="hidden md:table-cell">Nama Ketua</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="hidden md:table-cell">1</th>
                    <td>Cy Ganderton</td>
                    <td className="hidden md:table-cell">
                      Quality Control Specialist
                    </td>
                    <td className="hidden md:table-cell">Blue</td>
                    <td className="hidden md:table-cell">Blue</td>
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_11").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th className="hidden md:table-cell">2</th>
                    <td>Hart Hagerty</td>
                    <td className="hidden md:table-cell">
                      Desktop Support Technician
                    </td>
                    <td className="hidden md:table-cell">Purple</td>
                    <td className="hidden md:table-cell">Blue</td>
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_11").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                  <tr>
                    <th className="hidden md:table-cell">3</th>
                    <td>Brice Swyre</td>
                    <td className="hidden md:table-cell">Tax Accountant</td>
                    <td className="hidden md:table-cell">Red</td>
                    <td className="hidden md:table-cell">Blue</td>
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_11").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                  {/* Additional rows can be added here */}
                </tbody>
              </table>
              <DetailPengModel />
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

export default TablePres;
