import React, { useState, useEffect } from "react";
import axios from "axios";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchMaha from "./button/BtnSearchMaha";
import PaginationPen from "./PaginationPen";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import BtnInputMaha from "./button/BtnInputMaha";
import InputMahaModal from "./modal/InputMahaModal";
import SelectMaha from "./button/SelectMaha";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const TableMaha = () => {
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("NIM");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [totalPages, setTotalPages] = useState(1); // Total halaman
  const [totalData, setTotalData] = useState(0); // Total data

  // Fetch data mahasiswa
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Jika tidak ada token, arahkan ke halaman login
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/mahasiswa`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMahasiswaData(response.data.data);
        setFilteredData(response.data.data); // Awal data yang ditampilkan sama dengan semua data
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/"); // Jika token tidak valid, arahkan ke login
        } else {
          setError("Terjadi kesalahan saat memuat data mahasiswa.");
        }
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
        `${API_URL}/mahasiswa?per_page=20&page=${page}&${searchParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMahasiswaData(response.data.data);
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
        case "Nama":
          s_table = "name";
          break;
        case "NIM":
          s_table = "nim";
          break;
        case "Angkatan":
          s_table = "angkatan";
          break;
        case "Id_prodi":
          s_table = "id_prodi";
          break;
        default:
          s_table = "nim";
      }

      // Bangun parameter pencarian
      let searchParams = `s_table=${s_table}&s=${searchValue}`;
      if (s_table !== "id_prodi") {
        searchParams += "&s_like=true"; // Tambahkan s_like hanya jika bukan id_prodi
      }

      // Panggil API dengan halaman baru dan parameter pencarian
      fetchData(newPage, searchParams);
    }
  };

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
        case "Nama":
          s_table = "name";
          break;
        case "NIM":
          s_table = "nim";
          break;
        case "Angkatan":
          s_table = "angkatan";
          break;
        case "Id_prodi":
          s_table = "id_prodi";
          break;
        default:
          s_table = "nim";
      }

      let searchParams = `s_table=${s_table}&s=${searchValue}`;
      if (s_table !== "id_prodi") {
        searchParams += "&s_like=true"; // Tambahkan s_like hanya jika bukan id_prodi
      }

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
  // Handle perubahan kategori pencarian
  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchValue(""); // Reset nilai pencarian saat kategori berubah
  };

  // Handle klik detail
  const handleDetailClick = (e, mahasiswa) => {
    e.preventDefault();
    navigate(`/mahasiswa/detailpenelitian`, { state: { nim: mahasiswa.nim } });
    console.log("Navigating with NIM:", mahasiswa.nim);
  };

  return (
    <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="h-full w-full border border-blckprmy rounded-xl p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between pb-3">
          <div className="px-7 py-4">
            <h1 className="text-2xl font-bold text-blckprmy">Data Mahasiswa</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
            {searchCategory === "NIM" ? (
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari berdasarkan NIM"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs text-xs"
              />
            ) : searchCategory === "Angkatan" ? (
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari berdasarkan Angkatan"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs text-xs"
              />
            ) : searchCategory === "Id_prodi" ? (
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
                placeholder="Cari berdasarkan Nama"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs text-xs"
              />
            )}
            <SelectMaha onChange={handleCategoryChange} />
            <div className="flex flex-row md:flex-row gap-3">
              <BtnSearchMaha onClick={handleSearch} />
              <BtnInputMaha />
              <InputMahaModal />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-whtprmy px-6">
          <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
            <table className="table table-pin-rows w-full">
              <thead className="bg-whtprmy text-blckprmy">
                <tr className="bg-whtprmy">
                  <th className="hidden md:table-cell"></th>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th className="hidden md:table-cell">Angkatan</th>
                  <th className="hidden md:table-cell">Prodi</th>
                  <th className="hidden md:table-cell"></th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="7" className="text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
                  filteredData.map((mahasiswa, index) => (
                    <tr key={mahasiswa.nim}>
                      <th className="hidden md:table-cell">{index + 1}</th>
                      <td>{mahasiswa.nim}</td>
                      <td>{mahasiswa.name}</td>
                      <td className="hidden md:table-cell">
                        {mahasiswa.angkatan}
                      </td>
                      <td className="hidden md:table-cell">
                        {mahasiswa.prodi.name}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={(e) => handleDetailClick(e, mahasiswa)}
                        >
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      {error || "Data tidak ditemukan."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-6 flex justify-center pt-5">
          <PaginationPen
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableMaha;
