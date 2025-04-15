import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import PaginationPen from "./PaginationPen";
import { useNavigate } from "react-router-dom";
import SelectDetailDosCat from "./button/SelectDetailDosCat";
import SelectDetailDos from "./button/SelectDetailDos";
import BtnSearchDos from "./button/BtnSearchDos";
import BtnUpdateDos from "./button/BtnUpdateDos";
import DetailDosModal from "./modal/DetailDosModal";

const API_URL = import.meta.env.VITE_API_URL;

const DetailDosen = () => {
  const [penelitian, setPenelitian] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [namaDosen, setNamaDosen] = useState("");
  const [detailDosen, setDetailDosen] = useState(null);
  const [riwayatJabatan, setRiwayatJabatan] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [judulKategori, setJudulKategori] = useState("Penelitian");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const nip = location.state?.nip;
      if (!nip) {
        setError("NIP tidak ditemukan.");
        return;
      }

      setLoading(true);
      try {
        const dosenResponse = await axios.get(`${API_URL}/dosen/${nip}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dosenData = dosenResponse.data.data;
        setNamaDosen(dosenData.name);
        setDetailDosen(dosenData);

        const penelitianResponse = await axios.get(
          `${API_URL}/penelitianDosen?s_table=nip_dosen&s=${nip}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const penelitianData = penelitianResponse.data.data;
        const penelitianDetails = await Promise.all(
          penelitianData.map(async (item) => {
            const detailResponse = await axios.get(
              `${API_URL}/penelitian/${item.penelitian.id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return detailResponse.data.data;
          })
        );

        setPenelitian(penelitianDetails);

        const jabatanResponse = await axios.get(
          `${API_URL}/historyJabatan?s_table=nip_dosen&s=${nip}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jabatanData = jabatanResponse.data.data;
        setRiwayatJabatan(jabatanData);
        console.log(jabatanData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state?.nip, token]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    navigate("/dosen");
  };

  const handleJudul = (kategori) => {
    setJudulKategori(kategori);
  };

  return (
    <div className="md:max-h-screen h-full flex flex-col pr-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="w-full border border-blckprmy rounded-xl p-4">
        <div className="flex flex-col md:flex-row justify-between pb-3 pt-4">
          <div className="px-7">
            <h1 className="text-xl font-bold text-blckprmy">{namaDosen}</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center pt-4 md:pt-0">
            <SelectDetailDosCat handleJudul={handleJudul} />
            <BtnUpdateDos handleOpenModal={handleOpenModal} />
            <DetailDosModal
              isOpen={isModalOpen}
              handleCloseModal={handleCloseModal}
              nip={detailDosen?.nip}
            />
          </div>
        </div>
        <div className="bg-whtprmy px-6">
          <div className="text-lg font-semibold text-blckprmy mb-2 px-2">
            {judulKategori}
          </div>
          <div className="overflow-x-auto h-72 text-blckprmy bg-whtprmy px-4">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : judulKategori === "Penelitian" ? (
              penelitian.length > 0 ? (
                <ul className="list-disc list-inside">
                  {penelitian.map((item, index) => (
                    <li key={index}>
                      <span className="font-medium">
                        {item?.judul ?? "Judul Tidak Ditemukan"}
                      </span>{" "}
                      -{" "}
                      <span className="italic font-light">
                        {item?.skema ?? "Skema Tidak Ditemukan"}
                      </span>{" "}
                      ({item?.tahun ?? "Tahun Tidak Ditemukan"})
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center">Tidak ada data penelitian.</div>
              )
            ) : (
              <>
                {detailDosen ? (
                  <div className="text-left">
                    <p>
                      <strong>NIP:</strong> {detailDosen.nip}
                    </p>
                    <p>
                      <strong>Nama:</strong> {detailDosen.name}
                    </p>
                    <p>
                      <strong>Status:</strong> {detailDosen.status}
                    </p>
                    <p>
                      <strong>Pendidikan:</strong> {detailDosen.pendidikan}
                    </p>
                    <p>
                      <strong>Kode Dosen:</strong> {detailDosen.kode_dosen}
                    </p>
                    <p>
                      <strong>Gelar Depan:</strong> {detailDosen.gelar_depan}
                    </p>
                    <p>
                      <strong>Gelar Belakang:</strong>{" "}
                      {detailDosen.gelar_belakang}
                    </p>
                    <p>
                      <strong>Prodi:</strong>{" "}
                      {detailDosen.prodi?.name ?? "Tidak Ada"}
                    </p>
                    <p>
                      <strong>Kode Prodi:</strong>{" "}
                      {detailDosen.prodi?.kode_prodi ?? "Tidak Ada"}
                    </p>
                    <p>
                      <strong>Riwayat Jabatan:</strong>
                    </p>
                    {riwayatJabatan.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {riwayatJabatan.map((jabatan, index) => (
                          <li key={index}>
                            {jabatan.jabatan.jabatan ??
                              "Nama Jabatan Tidak Ditemukan"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Tidak ada</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    Detail dosen tidak ditemukan.
                  </div>
                )}
              </>
            )}
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
      </div>
    </div>
  );
};

export default DetailDosen;
