import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPen from "./button/BtnSearchPen";
import SelectPen from "./button/SelectPen";
import BtnInputPen from "./button/BtnInputPen";
import PaginationPen from "./PaginationPen";
import InputPenModal from "./modal/InputPenModal";
import InputPenMaha from "./modal/InputPenMaha";
import DetailPenModal from "./modal/DetailPenModal";
import axios from "axios";
import { HiDotsCircleHorizontal } from "react-icons/hi";

const TablePen = () => {
  const [isInputPenModalVisible, setInputPenModalVisible] = useState(false);
  const [isMahaModalVisible, setMahaModalVisible] = useState(false);
  const [penelitianData, setPenelitianData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("Judul");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [penelitianInputData, setPenelitianInputData] = useState(null); // Untuk menyimpan data input penelitian
  const navigate = useNavigate();
  const [selectedPenelitian, setSelectedPenelitian] = useState(null);
  const [isDetailMahaOpen, setIsDetailMahaOpen] = useState(false);

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
          "http://127.0.0.1:8000/api/v1/penelitian",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPenelitianData(response.data.data);
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
    const filtered = penelitianData.filter((penelitian) => {
      if (searchCategory === "Judul") {
        return penelitian.judul
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      } else if (searchCategory === "Nama") {
        const ketuaName =
          penelitian.dosen.find((d) => d.flag === 1)?.dosen?.name ||
          penelitian.mahasiswa.find((m) => m.flag === 1)?.mahasiswa?.name ||
          "N/A";
        return ketuaName.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchCategory === "Tahun") {
        return penelitian.tahun.toString().includes(searchValue);
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchValue(""); // Reset nilai pencarian ketika kategori berubah
  };

  const handleCloseInputModal = () => {
    setInputPenModalVisible(false);
  };

  const handlePenelitianInputSave = (data) => {
    setPenelitianInputData(data); // Menyimpan data penelitian
    setInputPenModalVisible(false);
    setMahaModalVisible(true); // Menampilkan modal kedua
  };

  const handleMahaModalToggle = () => {
    setMahaModalVisible(!isMahaModalVisible);
  };

  const getKetuaName = (penelitian) => {
    const ketuaDosen = penelitian.dosen.find((d) => d.flag === 1)?.dosen?.name;
    const ketuaMahasiswa = penelitian.mahasiswa.find((m) => m.flag === 1)
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
              Data Penelitian
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
            <SelectPen onChange={handleCategoryChange} />
            <div className="flex flex-row md:flex-row gap-3">
              <BtnSearchPen onClick={handleSearch} />
              <BtnInputPen onClick={() => setInputPenModalVisible(true)} />
            </div>
          </div>
        </div>

        <div className="bg-whtprmy px-6">
          <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
            <table className="table table-pin-rows w-full">
              <thead className="bg-whtprmy text-blckprmy">
                <tr className="bg-whtprmy">
                  <th className="hidden md:table-cell"></th>
                  <th className="text-left">Judul Penelitian</th>
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
                  filteredData.map((penelitian, index) => (
                    <tr key={penelitian.id}>
                      <th className="hidden md:table-cell">{index + 1}</th>
                      <td className="text-left">{penelitian.judul}</td>
                      <td className="hidden md:table-cell">
                        {penelitian.tahun}
                      </td>
                      <td className="hidden md:table-cell">
                        {getKetuaName(penelitian)}
                      </td>
                      <td className="hidden md:table-cell">
                        {penelitian.bidang || "N/A"}
                      </td>
                      <td className="hidden md:table-cell">
                        {penelitian.skema || "N/A"}
                      </td>
                      <td className="flex justify-center">
                        <button
                          onClick={() => {
                            setSelectedPenelitian(penelitian); // Simpan data penelitian yang dipilih
                            document.getElementById("my_modal_9").showModal(); // Buka modal
                          }}
                        >
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
                        <DetailPenModal data={selectedPenelitian} />
                      </td>
                      <td className="flex justify-center">
                        <button>
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
                        <DetailPenModal />
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

      {isInputPenModalVisible && (
        <InputPenModal
          onSave={handlePenelitianInputSave}
          onClose={handleCloseInputModal}
        />
      )}

      {isMahaModalVisible && (
        <InputPenMaha
          penelitianData={penelitianInputData}
          onClose={handleMahaModalToggle}
        />
      )}
    </div>
  );
};

export default TablePen;
