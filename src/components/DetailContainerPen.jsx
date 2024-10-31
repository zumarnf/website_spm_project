import React, { useState } from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchMaha from "./button/BtnSearchMaha";
import PaginationPen from "./PaginationPen";
import { useNavigate } from "react-router-dom";
import SelectDetailMahaCat from "./button/SelectDetailMahaCat";
import SelectDetailMahaSearch from "./button/SelectDetailMahaSearch";
import DetailMahaModal from "./modal/DetailMahaModal"; // Import modal

const DetailContainer = () => {
  const navigate = useNavigate();

  // Inisialisasi state dengan "Penelitian" sebagai default
  const [judulKategori, setJudulKategori] = useState("Penelitian");
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal

  const handleLinkClick = (e) => {
    e.preventDefault(); // Mencegah perilaku default link
    navigate("/mahasiswa"); // Arahkan ke halaman mahasiswa secara manual
  };

  const handleJudul = (kategori) => {
    setJudulKategori(kategori); // Update judul berdasarkan kategori yang dipilih
  };

  const openModal = () => {
    setIsModalOpen(true); // Membuka modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Menutup modal
  };

  return (
    <>
      <div className="max-h-screen flex flex-col pr-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="w-full border border-blckprmy rounded-xl p-4">
          <div className="flex justify-between pb-3 pt-4">
            <div className="px-7">
              <h1 className="text-2xl font-bold text-blckprmy">
                Nama Mahasiswa
              </h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <SelectDetailMahaCat handleJudul={handleJudul} />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-44 max-w-xs"
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
                    {/* Menambahkan onClick hanya pada span untuk membatasi area klik */}
                    <span
                      className="underline cursor-pointer"
                      onClick={openModal} // Membuka modal saat teks diklik
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

      {/* Render modal dan mengirimkan state */}
      <DetailMahaModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DetailContainer;
