import React from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPeng from "./button/BtnSearchPeng";
import SelectPeng from "./button/SelectPeng";
import PaginationPen from "./PaginationPen";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import DetailPengModel from "./modal/DetailPengModel";
import BtnInputMaha from "./button/BtnInputMaha";
import InputMahaModal from "./modal/InputMahaModal";
import DetailMahaModal from "./modal/DetailMahaModal";

const TableMaha = () => {
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
              <BtnInputMaha />
              <InputMahaModal />
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
            <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
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
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_12").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>

                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_12").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
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
              <DetailMahaModal />
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

export default TableMaha;
