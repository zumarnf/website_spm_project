import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import SelectPres from "./button/SelectPres";
import BtnSearchPres from "./button/BtnSearchPres";
import BtnInputPres from "./button/BtnInputPres";
import PaginationPen from "./PaginationPen";
import InputPresModal from "./modal/InputPresModal";
import InputPresMaha from "./modal/InputPresMaha";
import { HiDotsCircleHorizontal } from "react-icons/hi";

const TablePres = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchCategory, setSearchCategory] = useState("NIM");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isMahaModalOpen, setIsMahaModalOpen] = useState(false);
  const [prestasiInputData, setPrestasiInputData] = useState(null); // Tambahkan state untuk menyimpan data input
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
        const [prestasiRes, prestasiMahasiswaRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/v1/prestasi", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            "http://127.0.0.1:8000/api/v1/prestasiMahasiswa?s_table=flag&s=1",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        const prestasi = prestasiRes.data.data;
        const prestasiMahasiswa = prestasiMahasiswaRes.data.data;

        const mergedData = prestasiMahasiswa.map((item) => {
          const relatedPrestasi = prestasi.find(
            (p) => p.id === item.id_prestasi
          );
          return {
            id: item.id,
            nim: item.mahasiswa.nim,
            nama: item.mahasiswa.name,
            namaLomba: relatedPrestasi?.nama_lomba || "Tidak Ditemukan",
            juara: relatedPrestasi?.juara || "Tidak Ditemukan",
          };
        });

        setData(mergedData);
        setFilteredData(mergedData);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          setError("Terjadi kesalahan saat memuat data prestasi.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      if (searchCategory === "NIM") {
        return item.nim.toString().includes(searchValue.toString());
      } else if (searchCategory === "Nama") {
        return item.nama.toLowerCase().includes(searchValue.toLowerCase());
      } else if (searchCategory === "Judul") {
        return item.namaLomba.toLowerCase().includes(searchValue.toLowerCase());
      }
      return true;
    });
    setFilteredData(filtered);
  };

  const handleCategoryChange = (category) => {
    setSearchCategory(category);
    setSearchValue("");
  };

  // Fungsi untuk menutup modal input pertama dan membuka modal kedua
  const handlePrestasiInputSave = (data) => {
    setPrestasiInputData(data); // Menyimpan data prestasi
    setIsInputModalOpen(false);
    setIsMahaModalOpen(true); // Menampilkan modal kedua
  };

  const handleInputModalToggle = () => {
    setIsInputModalOpen(!isInputModalOpen);
  };

  const handleMahaModalToggle = () => {
    setIsMahaModalOpen(!isMahaModalOpen);
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
            <input
              type={searchCategory === "NIM" ? "number" : "text"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={`Cari berdasarkan ${searchCategory}`}
              className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
            />
            <SelectPres onChange={handleCategoryChange} />
            <div className="flex flex-row gap-3">
              <BtnSearchPres onClick={handleSearch} />
              <BtnInputPres onClick={handleInputModalToggle} />
            </div>
          </div>
        </div>

        <div className="bg-whtprmy px-6">
          <div className="overflow-x-auto h-80 text-blckprmy bg-whtprmy">
            <table className="table table-pin-rows w-full">
              <thead className="bg-whtprmy text-blckprmy">
                <tr className="bg-whtprmy">
                  <th></th>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>Nama Lomba</th>
                  <th>Juara</th>
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
                  filteredData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.nim}</td>
                      <td>{item.nama}</td>
                      <td>{item.namaLomba}</td>
                      <td>{item.juara}</td>
                      <td className="flex justify-center text-center items-center">
                        <button>
                          <HiDotsCircleHorizontal className="text-rdprmy bg-whtprmy" />
                        </button>
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
          <PaginationPen />
        </div>
      </div>

      {isInputModalOpen && (
        <InputPresModal
          onSave={handlePrestasiInputSave} // Mengirim fungsi untuk menyimpan data
          onClose={handleInputModalToggle}
        />
      )}

      {isMahaModalOpen && (
        <InputPresMaha
          prestasiData={prestasiInputData} // Mengirim data prestasi ke modal kedua
          onClose={handleMahaModalToggle}
        />
      )}
    </div>
  );
};

export default TablePres;
