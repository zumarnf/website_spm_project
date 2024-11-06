import React, { useState } from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import PaginationPen from "./PaginationPen";
import { useNavigate } from "react-router-dom";
import DetailDosModal from "./modal/DetailDosModal";
import SelectDetailDosCat from "./button/SelectDetailDosCat";
import SelectDetailDos from "./button/SelectDetailDos";
import BtnSearchDos from "./button/BtnSearchDos";

const DetailDosen = () => {
  const navigate = useNavigate();

  // Inisialisasi state dengan "Penelitian" sebagai default
  const [judulKategori, setJudulKategori] = useState("Penelitian");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const handleLinkClick = (e) => {
    e.preventDefault(); // Mencegah perilaku default link
    navigate("/dosen"); // Arahkan ke halaman mahasiswa secara manual
  };

  const handleJudul = (kategori) => {
    setJudulKategori(kategori); // Update judul berdasarkan kategori yang dipilih
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-h-screen flex flex-col pr-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="w-full border border-blckprmy rounded-xl p-4">
          <div className="flex justify-between pb-3 pt-4">
            <div className="px-7">
              <h1 className="text-2xl font-bold text-blckprmy">Nama Dosen</h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <SelectDetailDosCat handleJudul={handleJudul} />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-44 max-w-xs"
              />
              <SelectDetailDos />
              <BtnSearchDos />
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
                      hai
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex px-10 text-sm pt-2">
            <a
              className="link link-primary"
              href="/dosen"
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

      <DetailDosModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DetailDosen;
