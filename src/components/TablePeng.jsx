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
import axios from "axios";
import { HiDotsCircleHorizontal } from "react-icons/hi";

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/pengabdian",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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

  const handleSearch = () => {
    const filtered = pengabdianData.filter((pengabdian) => {
      if (searchCategory === "Judul") {
        return pengabdian.judul
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      } else if (searchCategory === "Nama") {
        const ketuaName =
          pengabdian.dosen.find((d) => d.flag === 1)?.dosen?.name ||
          pengabdian.mahasiswa.find((m) => m.flag === 1)?.mahasiswa?.name ||
          "N/A";
        return ketuaName.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchCategory === "Tahun") {
        return pengabdian.tahun.toString().includes(searchValue);
      }
      return true;
    });
    setFilteredData(filtered);
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
    const ketuaMahasiswa = pengabdian.mahasiswa.find((m) => m.flag === 1)
      ?.mahasiswa?.name;
    return ketuaDosen || ketuaMahasiswa || "N/A";
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
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
              />
            ) : (
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Cari berdasarkan ${searchCategory}`}
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
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
                  <th className="hidden md:table-cell">Tanggal</th>
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
                      <td className="flex justify-center">
                        <button>
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
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
          <PaginationPen />
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
