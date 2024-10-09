import React, { useState } from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPeng from "./button/BtnSearchPeng";
import SelectPeng from "./button/SelectPeng";
import BtnInputPeng from "./button/BtnInputPeng";
import PaginationPen from "./PaginationPen";
import InputPengModal from "./modal/InputPengModal";
import InputPengMaha from "./modal/InputPengMaha";

const TablePeng = () => {
  const [isInputPengModalVisible, setInputPengModalVisible] = useState(false);
  const [isInputPengMahaVisible, setInputPengMahaVisible] = useState(false);

  const handleOpenInputPengModal = () => {
    setInputPengModalVisible(true);
    setInputPengMahaVisible(false); // Sembunyikan InputPenMaha
  };

  const handleSwitchToMaha = () => {
    setInputPengModalVisible(false); // Sembunyikan InputPenModal
    setInputPengMahaVisible(true); // Tampilkan InputPenMaha
  };

  const handleBackToModalPeng = () => {
    setInputPengMahaVisible(false); // Sembunyikan InputPenMaha
    setInputPengModalVisible(true); // Tampilkan InputPenModal
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
        <div className="h-full w-full border border-blckprmy rounded-xl p-4">
          <div className="flex justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">
                Data Pengabdian
              </h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <BtnInputPeng onClick={handleOpenInputPengModal} />
              {isInputPengModalVisible && (
                <InputPengModal
                  onSwitch={handleSwitchToMaha}
                  onClose={handleCloseModals}
                />
              )}
              {isInputPengMahaVisible && (
                <InputPengMaha
                  onBack={handleBackToModalPeng}
                  onClose={handleCloseModals}
                />
              )}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-44 max-w-xs"
              />
              <SelectPeng />
              <BtnSearchPeng />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="overflow-x-auto max-h-80 text-blckprmy bg-whtprmy">
              <table className="table table-pin-rows">
                <thead className="bg-whtprmy text-blckprmy">
                  <tr className="bg-whtprmy">
                    <th></th>
                    <th>Judul</th>
                    <th>Bidang</th>
                    <th>Rentan Waktu</th>
                    <th>Nama Ketua</th>
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
                    <td>Blue</td>
                  </tr>

                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>

                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
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

export default TablePeng;
