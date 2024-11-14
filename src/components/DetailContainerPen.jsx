import React, { useState } from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchMaha from "./button/BtnSearchMaha";
import PaginationPen from "./PaginationPen";
import { useNavigate } from "react-router-dom";
import SelectDetailMahaCat from "./button/SelectDetailMahaCat";
import SelectDetailMahaSearch from "./button/SelectDetailMahaSearch";
import DetailMahaModal from "./modal/DetailMahaModal";

const DetailContainer = () => {
  const navigate = useNavigate();

  // Initialize state with "Penelitian" as default
  const [judulKategori, setJudulKategori] = useState("Penelitian");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/mahasiswa"); // Navigate to mahasiswa page
  };

  const handleJudul = (kategori) => {
    setJudulKategori(kategori); // Update title based on selected category
  };

  const openModal = () => {
    setIsModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };

  return (
    <>
      <div className="md:max-h-screen h-full flex flex-col pr-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="w-full border border-blckprmy rounded-xl p-4">
          <div className="flex flex-col md:flex-row justify-between pb-3 pt-4">
            <div className="px-7">
              <h1 className="text-2xl font-bold text-blckprmy">
                Nama Mahasiswa
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center pt-4 md:pt-0">
              {" "}
              {/* Added mt-4 for mobile spacing */}
              <SelectDetailMahaCat handleJudul={handleJudul} />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
              />
              <SelectDetailMahaSearch />
              <BtnSearchMaha />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="text-lg font-bold text-blckprmy mb-2 px-2">
              {judulKategori}
            </div>
            <div className="overflow-x-auto h-72 text-blckprmy bg-whtprmy px-4">
              <ul className="list-disc list-inside">
                {[...Array(3)].map((_, index) => (
                  <li key={index}>
                    <span
                      className="underline cursor-pointer"
                      onClick={openModal}
                    >
                      Item {index + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex px-10 text-sm pt-2">
            <a
              className="link link-primary"
              href="/mahasiswa"
              onClick={handleLinkClick}
            >
              Kembali
            </a>
          </div>
          <div className="px-6 flex justify-center">
            <PaginationPen />
          </div>
        </div>
      </div>

      <DetailMahaModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DetailContainer;
