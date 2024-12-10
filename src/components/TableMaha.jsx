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

const TableMaha = () => {
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("NIM");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch data mahasiswa
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Jika tidak ada token, arahkan ke halaman login
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/mahasiswa",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  // Handle pencarian data mahasiswa
  const handleSearch = () => {
    const filtered = mahasiswaData.filter((mahasiswa) => {
      if (searchCategory === "NIM") {
        return mahasiswa.nim.toString().includes(searchValue.toString());
      } else if (searchCategory === "Nama") {
        return mahasiswa.name.toLowerCase().includes(searchValue.toLowerCase());
      }
      return true;
    });
    setFilteredData(filtered);
  };

  // Handle perubahan kategori pencarian
  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchValue(""); // Reset nilai pencarian saat kategori berubah
  };

  // Handle klik detail
  const handleDetailClick = (e, href) => {
    e.preventDefault();
    navigate(href);
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
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
              />
            ) : (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari berdasarkan Nama"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
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
                {filteredData.length > 0 ? (
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
                          onClick={(e) =>
                            handleDetailClick(e, `/mahasiswa/detailpenelitian`)
                          }
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
          <PaginationPen />
        </div>
      </div>
    </div>
  );
};

export default TableMaha;
