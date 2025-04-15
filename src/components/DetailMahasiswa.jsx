import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchMaha from "./button/BtnSearchMaha";
import PaginationPen from "./PaginationPen";
import { useNavigate } from "react-router-dom";
import SelectDetailMahaCat from "./button/SelectDetailMahaCat";
import SelectDetailMahaSearch from "./button/SelectDetailMahaSearch";

const API_URL = import.meta.env.VITE_API_URL;

const DetailMahasiswa = () => {
  const [penelitian, setPenelitian] = useState([]);
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [namaMahasiswa, setNamaMahasiswa] = useState(""); // State untuk nama mahasiswa
  const location = useLocation();
  const navigate = useNavigate();

  const [judulKategori, setJudulKategori] = useState("Penelitian");
  const token = localStorage.getItem("token");

  const fetchData = async (kategori) => {
    const nim = location.state?.nim;
    if (!nim) {
      setError("NIM tidak ditemukan.");
      return;
    }

    setLoading(true);
    try {
      // Ambil data mahasiswa berdasarkan NIM
      const mahasiswaResponse = await axios.get(`${API_URL}/mahasiswa/${nim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNamaMahasiswa(mahasiswaResponse.data.data.name);

      const endpoint =
        kategori === "Penelitian"
          ? `${API_URL}/penelitianMahasiswa?s_table=nim_mahasiswa&s=${nim}`
          : `${API_URL}/prestasiMahasiswa?s_table=nim_mahasiswa&s=${nim}`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      const details = await Promise.all(
        data.map(async (item) => {
          const detailEndpoint =
            kategori === "Penelitian"
              ? `${API_URL}/penelitian/${item.penelitian.id}`
              : `${API_URL}/prestasi/${item.prestasi.id}`;
          const detailResponse = await axios.get(detailEndpoint, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return detailResponse.data.data;
        })
      );

      if (kategori === "Penelitian") {
        setPenelitian(details);
      } else {
        setPrestasi(details);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(`Gagal memuat data ${kategori.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(judulKategori);
  }, [judulKategori]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    navigate("/mahasiswa");
  };

  const handleJudul = (kategori) => {
    setJudulKategori(kategori);
  };

  const renderContent = () => {
    const data = judulKategori === "Penelitian" ? penelitian : prestasi;

    if (loading) {
      return <div className="text-center">Loading...</div>;
    }
    if (error) {
      return <div className="text-center text-red-500">{error}</div>;
    }
    if (data.length > 0) {
      return (
        <ul className="list-disc list-inside">
          {data.map((item, index) => (
            <li key={index}>
              {judulKategori === "Penelitian" ? (
                <>
                  <span className="font-bold">
                    {item?.judul ?? "Judul Tidak Ditemukan"}
                  </span>{" "}
                  -{" "}
                  <span className="italic">
                    {item?.skema ?? "Skema Tidak Ditemukan"}
                  </span>{" "}
                  ({item?.tahun ?? "Tahun Tidak Ditemukan"})
                </>
              ) : (
                <>
                  <span className="font-bold">
                    {item?.nama_lomba ?? "Nama Lomba Tidak Ditemukan"}
                  </span>{" "}
                  -{" "}
                  <span className="italic">
                    {item?.juara ?? "Juara Tidak Ditemukan"}
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="text-center">
        Tidak ada data {judulKategori.toLowerCase()}.
      </div>
    );
  };

  return (
    <>
      <div className="md:max-h-screen h-full flex flex-col pr-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="w-full border border-blckprmy rounded-xl p-4">
          <div className="flex flex-col md:flex-row justify-between pb-3 pt-4">
            <div className="px-7">
              <h1 className="text-xl font-bold text-blckprmy">
                {namaMahasiswa || "Nama Mahasiswa"}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center pt-4 md:pt-0">
              <SelectDetailMahaCat handleJudul={handleJudul} />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="text-lg font-bold text-blckprmy mb-2 px-2">
              {judulKategori}
            </div>
            <div className="overflow-x-auto h-72 text-blckprmy bg-whtprmy px-4">
              {renderContent()}
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
        </div>
      </div>
    </>
  );
};

export default DetailMahasiswa;
