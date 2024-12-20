import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPub from "./button/BtnSearchPub";
import SelectPub from "./button/SelectPub";
import BtnInputPub from "./button/BtnInputPub";
import PaginationPen from "./PaginationPen";
import InputPubModal from "./modal/InputPubModal";
import InputPubMaha from "./modal/InputPubMaha";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import DetailPubModal from "./modal/DetailPubModal";

const TablePub = () => {
  const [isInputPubModalVisible, setInputPubModalVisible] = useState(false);
  const [isInputPubMahaVisible, setInputPubMahaVisible] = useState(false);
  const navigate = useNavigate();

  const handleOpenInputPubModal = () => {
    setInputPubModalVisible(true);
    setInputPubMahaVisible(false); // Sembunyikan InputPubMaha
  };

  const handleSwitchToMaha = () => {
    setInputPubModalVisible(false); // Sembunyikan InputPubModal
    setInputPubMahaVisible(true); // Tampilkan InputPubMaha
  };

  const handleBackToModalPub = () => {
    setInputPubMahaVisible(false); // Sembunyikan InputPubMaha
    setInputPubModalVisible(true); // Tampilkan InputPubModal
  };

  const handleCloseModals = () => {
    setInputPubModalVisible(false);
    setInputPubMahaVisible(false);
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Mencegah perilaku default link
    navigate("/penelitian"); // Arahkan ke halaman publikasi secara manual
  };

  return (
    <>
      <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="h-full w-full border border-blckprmy rounded-xl p-4">
          <div className="flex flex-col md:flex-row justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">
                Data Publikasi
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
              />
              <SelectPub />
              <div className="flex flex-row md:flex-row gap-3">
                <BtnInputPub onClick={handleOpenInputPubModal} />
                <BtnSearchPub />
              </div>
              {isInputPubModalVisible && (
                <InputPubModal
                  onSwitch={handleSwitchToMaha}
                  onClose={handleCloseModals}
                />
              )}
              {isInputPubMahaVisible && (
                <InputPubMaha
                  onBack={handleBackToModalPub}
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
                    <th>Judul Publikasi</th>
                    <th className="hidden md:table-cell">Tanggal</th>
                    <th className="hidden md:table-cell">Nama Ketua</th>
                    <th className="hidden md:table-cell">Bidang</th>
                    <th className="hidden md:table-cell">Skema</th>
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
                    <td className="hidden md:table-cell">Blue</td>
                    <th className="flex justify-center text-center">
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_10").showModal()
                        }
                      >
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                  <DetailPubModal />
                  <tr>
                    <th className="hidden md:table-cell">2</th>
                    <td>Hart Hagerty</td>
                    <td className="hidden md:table-cell">
                      Desktop Support Technician
                    </td>
                    <td className="hidden md:table-cell">Purple</td>
                    <td className="hidden md:table-cell">Blue</td>
                    <td className="hidden md:table-cell">Blue</td>
                    <th className="flex justify-center text-center">
                      <button>
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
                    <td className="hidden md:table-cell">Blue</td>
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
          <div className="px-6 flex justify-center">
            <PaginationPen />
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePub;
