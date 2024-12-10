import React, { useState, useEffect } from "react";
import axios from "axios";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchDos from "./button/BtnSearchDos";
import PaginationPen from "./PaginationPen";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import BtnInputDos from "./button/BtnInputDos";
import InputDosModal from "./modal/InputDosModal";
import SelectDos from "./button/SelectDos";
import { useNavigate } from "react-router-dom";

const TableDos = () => {
  const [dosenData, setDosenData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("NIP");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch data dosen
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Jika tidak ada token, arahkan ke halaman login
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/dosen", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDosenData(response.data.data); // Simpan data dosen
        setFilteredData(response.data.data); // Awal data yang ditampilkan sama dengan semua data
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/"); // Jika token tidak valid, arahkan ke login
        } else {
          setError("Terjadi kesalahan saat memuat data dosen.");
        }
      }
    };

    fetchData();
  }, [navigate]);

  // Handle pencarian berdasarkan kategori
  const handleSearch = () => {
    const filtered = dosenData.filter((dosen) => {
      if (searchCategory === "NIP") {
        return dosen.nip.toString().includes(searchValue);
      } else if (searchCategory === "Nama") {
        const fullName = `${dosen.gelar_depan || ""} ${dosen.name} ${
          dosen.gelar_belakang || ""
        }`.toLowerCase();
        return fullName.includes(searchValue.toLowerCase());
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

  // Handle penambahan data dosen baru
  const handleAddDosen = (newDosen) => {
    setDosenData((prev) => [newDosen, ...prev]);
    setFilteredData((prev) => [newDosen, ...prev]);
  };

  return (
    <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="h-full w-full border border-blckprmy rounded-xl p-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between pb-3">
          <div className="px-7 py-4">
            <h1 className="text-2xl font-bold text-blckprmy">Data Dosen</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
            {searchCategory === "NIP" ? (
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari berdasarkan NIP"
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
            <SelectDos onChange={handleCategoryChange} />
            <div className="flex flex-row md:flex-row gap-3">
              <BtnSearchDos onClick={handleSearch} />
              <BtnInputDos />
              <InputDosModal onAddDosen={handleAddDosen} />
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
                  <th>NIP</th>
                  <th>Nama</th>
                  <th className="hidden md:table-cell">Prodi</th>
                  <th className="hidden md:table-cell">Pendidikan</th>
                  <th className="hidden md:table-cell"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((dosen, index) => (
                    <tr key={dosen.nip}>
                      <th className="hidden md:table-cell">{index + 1}</th>
                      <td>{dosen.nip}</td>
                      <td>
                        {dosen.gelar_depan} {dosen.name} {dosen.gelar_belakang}
                      </td>
                      <td className="hidden md:table-cell">
                        {dosen.prodi.name}
                      </td>
                      <td className="hidden md:table-cell">
                        {dosen.pendidikan}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={(e) =>
                            handleDetailClick(
                              e,
                              `/dosen/detaildosen/${dosen.nip}`
                            )
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

export default TableDos;
