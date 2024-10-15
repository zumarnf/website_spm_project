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
          <div className="flex justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">
                Data Publikasi
              </h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <BtnInputPub onClick={handleOpenInputPubModal} />
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
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-44 max-w-xs"
              />
              <SelectPub />
              <BtnSearchPub />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
              <table className="table table-pin-rows">
                <thead className="bg-whtprmy text-blckprmy">
                  <tr className="bg-whtprmy">
                    <th></th>
                    <th>Judul Publikasi</th>
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
                      <button>
                        <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                      </button>
                    </th>
                  </tr>
                  <DetailPubModal />
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
              href="/penelitian"
              onClick={handleLinkClick}
            >
              Data Penelitian
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

export default TablePub;
