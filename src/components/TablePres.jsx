import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPres from "./button/BtnSearchPres";
import SelectPres from "./button/SelectPres";
import BtnInputPres from "./button/BtnInputPres";
import PaginationPen from "./PaginationPen";
import InputPresModal from "./modal/InputPresModal";
import InputPresMaha from "./modal/InputPresMaha";
import DetailPresModal from "./modal/DetailPresModal";
import DetailPresUpdate from "./modal/DetailPresUpdate";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { HiPencil } from "react-icons/hi";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const TablePres = () => {
  const [isInputPresModalVisible, setInputPresModalVisible] = useState(false);
  const [isPresMahaModalVisible, setPresMahaModalVisible] = useState(false);
  const [prestasiData, setPrestasiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("NIM");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prestasiInputData, setPrestasiInputData] = useState(null);
  const navigate = useNavigate();
  const [selectedPrestasi, setSelectedPrestasi] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman
  const [totalData, setTotalData] = useState(0); // Total data

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/prestasi`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrestasiData(response.data.data);
        setFilteredData(response.data.data);
        console.log(response.data.data); // Awal data yang ditampilkan sama dengan semua data
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          setError("Terjadi kesalahan saat memuat data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchData = async (page = 1, searchParams = "") => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${API_URL}/prestasi?per_page=20&page=${page}&${searchParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPrestasiData(response.data.data);
      setFilteredData(response.data.data);
      setCurrentPage(response.data.meta.current_page); // Menyimpan halaman saat ini
      setTotalPages(response.data.meta.last_page); // Menyimpan total halaman
      setTotalData(response.data.meta.total); // Menyimpan total data
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      } else {
        setError("Terjadi kesalahan saat memuat data.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);

      // Tentukan s_table berdasarkan kategori pencarian
      let s_table;
      switch (searchCategory) {
        case "Judul":
          s_table = "";
          break;
        case "Nama":
          s_table = "ketua_name";
          break;
        case "Ketua_prodi":
          s_table = "ketua_prodi";
          break;
        default:
          s_table = "";
      }

      // Bangun parameter pencarian
      let searchParams = `s_table=${s_table}&s=${searchValue}&s_like=true`;

      // Panggil API dengan halaman baru dan parameter pencarian
      fetchData(newPage, searchParams);
    }
  };

  // Fungsi pencarian
  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    setCurrentPage(1); // Reset halaman saat pencarian

    try {
      setLoading(true);
      let s_table;
      switch (searchCategory) {
        case "Judul":
          s_table = "";
          break;
        case "Nama":
          s_table = "ketua_name";
          break;
        case "Ketua_prodi":
          s_table = "ketua_prodi";
          break;
        default:
          s_table = "";
      }

      let searchParams = `s_table=${s_table}&s=${searchValue}&s_like=true`;

      // Kirim request ke server dengan parameter pencarian
      fetchData(1, searchParams); // Reset halaman pertama saat pencarian
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/");
      } else {
        setError("Terjadi kesalahan saat mencari data.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchValue("");
  };

  const handleCloseInputModal = () => {
    setInputPresModalVisible(false);
  };

  const handlePrestasiInputSave = (data) => {
    setPrestasiInputData(data);
    setInputPresModalVisible(false);
    setPresMahaModalVisible(true);
  };

  const handlePresMahaModalToggle = () => {
    setPresMahaModalVisible(!isPresMahaModalVisible);
  };

  const getKetuaNim = (prestasi) => {
    // Cari mahasiswa yang memiliki flag === 1 (ketua)
    const ketuaMahasiswa = prestasi.mahasiswa.find((m) => m.flag === 1);
    return ketuaMahasiswa ? ketuaMahasiswa.nim_mahasiswa : "N/A";
  };
  const getKetuaName = (prestasi) => {
    // Cari mahasiswa yang memiliki flag === 1 (ketua)
    const ketuaMahasiswaNama = prestasi.mahasiswa.find((m) => m.flag === 1);
    return ketuaMahasiswaNama ? ketuaMahasiswaNama.mahasiswa.name : "N/A";
  };

  return (
    <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="w-full border border-blckprmy rounded-xl p-4">
        <div className="flex flex-col md:flex-row justify-between pb-3">
          <div className="px-7 py-4">
            <h1 className="text-2xl font-bold text-blckprmy">Data Prestasi</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
            {searchCategory === "Ketua_prodi" || searchCategory === "Nama" ? (
              <select
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="select select-bordered border-blckprmy bg-whtprmy select-sm w-full max-w-xs text-xs"
              >
                <option value="">pilih</option>
                <option value="1">Teknologi Informasi</option>
                <option value="2">Sistem Informasi</option>
                <option value="3">Informatika</option>
                <option value="4">Rekayasa Perangkat Lunak</option>
                <option value="5">Digital Bisnis</option>
                <option value="6">Sains Data</option>
                <option value="7">Teknik Komputer</option>
                <option value="8">Teknik Logistik</option>
                <option value="9">Teknik Telekomunikasi</option>
                <option value="10">Teknik Industri</option>
                <option value="11">Teknik Elektro</option>
                <option value="12">Eksternal</option>
              </select>
            ) : (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Cari berdasarkan ${searchCategory}`}
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs text-xs"
              />
            )}
            <SelectPres onChange={handleCategoryChange} />
            <div className="flex flex-row gap-3">
              <BtnSearchPres onClick={handleSearch} />
              <BtnInputPres onClick={() => setInputPresModalVisible(true)} />
            </div>
          </div>
        </div>

        <div className="bg-whtprmy px-6">
          <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
            <table className="table table-pin-rows w-full flex">
              <thead className="bg-whtprmy text-blckprmy">
                <tr className="bg-whtprmy">
                  <th className="hidden md:table-cell"></th>
                  <th className="hidden md:table-cell">NIM</th>
                  <th className="text-left">Nama Ketua</th>
                  <th className="text-left">Nama Lomba</th>
                  <th className="hidden md:table-cell">Juara</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="6" className="text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((prestasi, index) => (
                    <tr key={prestasi.id}>
                      <td className="hidden md:table-cell">{index + 1}</td>
                      <td className="hidden md:table-cell">
                        {getKetuaNim(prestasi)}
                      </td>
                      <td className="text-left">{getKetuaName(prestasi)}</td>
                      <td className="text-left">{prestasi.nama_lomba}</td>
                      <td className="hidden md:table-cell">{prestasi.juara}</td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setSelectedPrestasi(prestasi);
                            document.getElementById("my_modal_16").showModal();
                          }}
                        >
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
                        <DetailPresModal data={selectedPrestasi} />
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setSelectedPrestasi(prestasi); // Simpan data penelitian yang dipilih
                            document.getElementById("modal_30").showModal(); // Buka modal
                          }}
                        >
                          <HiPencil className="text-rdprmy bg-whtprmy" />
                        </button>
                        <DetailPresUpdate data={selectedPrestasi} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-6 flex justify-center pt-5">
          <PaginationPen
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isInputPresModalVisible && (
        <InputPresModal
          onSave={handlePrestasiInputSave}
          onClose={handleCloseInputModal}
        />
      )}

      {isPresMahaModalVisible && (
        <InputPresMaha
          prestasiData={prestasiInputData}
          onClose={handlePresMahaModalToggle}
        />
      )}
    </div>
  );
};

export default TablePres;
