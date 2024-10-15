import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPen from "./button/BtnSearchPen";
import SelectPen from "./button/SelectPen";
import BtnInputPen from "./button/BtnInputPen";
import PaginationPen from "./PaginationPen";
import InputPenModal from "./modal/InputPenModal";
import InputPenMaha from "./modal/InputPenMaha";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import DetailPenModal from "./modal/DetailPenModal";

const TablePen = () => {
  const [isInputPenModalVisible, setInputPenModalVisible] = useState(false);
  const [isInputPenMahaVisible, setInputPenMahaVisible] = useState(false);
  const navigate = useNavigate();

  const handleOpenInputPenModal = () => {
    setInputPenModalVisible(true);
    setInputPenMahaVisible(false); // Sembunyikan InputPenMaha
  };

  const handleSwitchToMaha = () => {
    setInputPenModalVisible(false); // Sembunyikan InputPenModal
    setInputPenMahaVisible(true); // Tampilkan InputPenMaha
  };

  const handleBackToModalPen = () => {
    setInputPenMahaVisible(false); // Sembunyikan InputPenMaha
    setInputPenModalVisible(true); // Tampilkan InputPenModal
  };

  const handleCloseModals = () => {
    setInputPenModalVisible(false);
    setInputPenMahaVisible(false);
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Mencegah perilaku default link
    navigate("/penelitian/publikasi"); // Arahkan ke halaman publikasi secara manual
  };

  return (
    <>
      <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="w-full border border-blckprmy rounded-xl p-4">
          <div className="flex justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">
                Data Penelitian
              </h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <BtnInputPen onClick={handleOpenInputPenModal} />
              {isInputPenModalVisible && (
                <InputPenModal
                  onSwitch={handleSwitchToMaha}
                  onClose={handleCloseModals}
                />
              )}
              {isInputPenMahaVisible && (
                <InputPenMaha
                  onBack={handleBackToModalPen}
                  onClose={handleCloseModals}
                />
              )}
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-44 max-w-xs"
              />
              <SelectPen />
              <BtnSearchPen />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
              <table className="table table-pin-rows">
                <thead className="bg-whtprmy text-blckprmy">
                  <tr className="bg-whtprmy">
                    <th></th>
                    <th>Judul Penelitian</th>
                    <th>Tanggal</th>
                    <th>Nama Ketua</th>
                    <th>Bidang</th>
                    <th>Skema</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_9").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                  <DetailPenModal />
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td>Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <th className="flex justify-center text-center">
                      <button>
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex px-10 text-sm pt-2">
            <a
              className="link link-primary"
              href="/penelitian/publikasi"
              onClick={handleLinkClick}
            >
              Data Publikasi
            </a>
          </div>
          <div className="px-6 flex justify-center">
            <PaginationPen />
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePen;
