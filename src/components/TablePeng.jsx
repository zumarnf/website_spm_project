import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPeng from "./button/BtnSearchPeng";
import SelectPeng from "./button/SelectPeng";
import BtnInputPeng from "./button/BtnInputPeng";
import PaginationPen from "./PaginationPen";
import InputPengModal from "./modal/InputPengModal";
import InputPengMaha from "./modal/InputPengMaha";
import DetailPengModal from "./modal/DetailPengModel";
import DetailPengUpdate from "./modal/DetailPengUpdate";
import axios from "axios";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { HiPencil } from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_URL;

const TablePeng = () => {
  const [isInputPengModalVisible, setInputPengModalVisible] = useState(false);
  const [isPengMahaModalVisible, setPengMahaModalVisible] = useState(false);
  const [pengabdianData, setPengabdianData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("Judul");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pengabdianInputData, setPengabdianInputData] = useState(null);
  const navigate = useNavigate();
  const [selectedPengabdian, setSelectedPengabdian] = useState(null);
  const [isDetailMahaOpen, setIsDetailMahaOpen] = useState(false);
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
        const response = await axios.get(`${API_URL}/pengabdian`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPengabdianData(response.data.data);
        setFilteredData(response.data.data); // Awal data yang ditampilkan sama dengan semua data
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
        `${API_URL}/pengabdian?per_page=20&page=${page}&${searchParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPengabdianData(response.data.data);
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
        case "Tahun":
          s_table = "";
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
        case "Tahun":
          s_table = "";
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
    setInputPengModalVisible(false);
  };

  const handlePengabdianInputSave = (data) => {
    setPengabdianInputData(data);
    setInputPengModalVisible(false);
    setPengMahaModalVisible(true);
  };

  const handlePengMahaModalToggle = () => {
    setPengMahaModalVisible(!isPengMahaModalVisible);
  };

  const getKetuaName = (pengabdian) => {
    const ketuaDosen = pengabdian.dosen.find((d) => d.flag === 1)?.dosen?.name;
    return ketuaDosen || "N/A";
  };

  return (
    <div className="max-h-screen flex flex-col pr-5 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="w-full border border-blckprmy rounded-xl p-4">
        <div className="flex flex-col md:flex-row justify-between pb-3">
          <div className="px-7 py-4">
            <h1 className="text-2xl font-bold text-blckprmy">
              Data Pengabdian
            </h1>
          </div>
          <div className="flex flex-col md:flex-row gap-3 pr-3 justify-center items-center">
            {searchCategory === "Tahun" ? (
              <input
                type="number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Cari Tahun"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs text-xs"
              />
            ) : searchCategory === "Ketua_prodi" ? (
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
            <SelectPeng onChange={handleCategoryChange} />
            <div className="flex flex-row md:flex-row gap-3">
              <BtnSearchPeng onClick={handleSearch} />
              <BtnInputPeng onClick={() => setInputPengModalVisible(true)} />
            </div>
          </div>
        </div>

        <div className="bg-whtprmy px-6">
          <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
            <table className="table table-pin-rows w-full">
              <thead className="bg-whtprmy text-blckprmy">
                <tr className="bg-whtprmy">
                  <th className="hidden md:table-cell"></th>
                  <th className="text-left">Judul Pengabdian</th>
                  <th className="hidden md:table-cell">Tahun</th>
                  <th className="hidden md:table-cell">Nama Ketua</th>
                  <th className="hidden md:table-cell">Bidang</th>
                  <th className="hidden md:table-cell">Skema</th>
                  <th></th>
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
                  filteredData.map((pengabdian, index) => (
                    <tr key={pengabdian.id}>
                      <th className="hidden md:table-cell">{index + 1}</th>
                      <td className="text-left">{pengabdian.judul}</td>
                      <td className="hidden md:table-cell">
                        {pengabdian.tahun}
                      </td>
                      <td className="hidden md:table-cell">
                        {getKetuaName(pengabdian)}
                      </td>
                      <td className="hidden md:table-cell">
                        {pengabdian.bidang || "N/A"}
                      </td>
                      <td className="hidden md:table-cell">
                        {pengabdian.skema || "N/A"}
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setSelectedPengabdian(pengabdian); // Simpan data pengabdian yang dipilih
                            document.getElementById("my_modal_11").showModal(); // Buka modal
                          }}
                        >
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
                        <DetailPengModal data={selectedPengabdian} />
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setSelectedPengabdian(pengabdian); // Simpan data penelitian yang dipilih
                            document.getElementById("modal_25").showModal(); // Buka modal
                          }}
                        >
                          <HiPencil className="text-rdprmy bg-whtprmy" />
                        </button>
                        <DetailPengUpdate data={selectedPengabdian} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
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

      {isInputPengModalVisible && (
        <InputPengModal
          onSave={handlePengabdianInputSave}
          onClose={handleCloseInputModal}
        />
      )}

      {isPengMahaModalVisible && (
        <InputPengMaha
          pengabdianData={pengabdianInputData}
          onClose={handlePengMahaModalToggle}
        />
      )}
    </div>
  );
};

export default TablePeng;
