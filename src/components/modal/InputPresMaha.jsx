import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const InputPresMaha = ({ prestasiData, onClose }) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([
    { name: "", id_prodi: "", id: "", flag: 1, prestasiId: "" }, // Ketua dengan flag 1
  ]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [prodi, setProdi] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Menyimpan istilah pencarian
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Pastikan ini sesuai dengan pengaturan navigasi di aplikasi kamu
      return;
    }

    // Ambil data prodi
    axios
      .get(`${API_URL}/prodi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProdi(response.data.data);
      })
      .catch((error) => console.error("Error fetching prodi:", error));

    // Ambil data mahasiswa
    axios
      .get(`${API_URL}/mahasiswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMahasiswa(response.data.data);
      })
      .catch((error) => console.error("Error fetching mahasiswa:", error));
  }, []);

  const handleAddParticipant = () => {
    if (participants.length < 7) {
      const newParticipant = {
        name: "",
        id: "",
        id_prodi: "",
        flag: participants.length + 1, // Flag diteruskan
      };
      setParticipants([...participants, newParticipant]);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedParticipants = [...participants];

    // Jika field yang berubah adalah id_prodi, reset mahasiswa yang sudah ada sebelumnya
    if (field === "id_prodi") {
      updatedParticipants[index].mahasiswa = []; // Reset mahasiswa sebelumnya

      // Ambil mahasiswa berdasarkan id_prodi yang baru
      fetchMahasiswaByProdi(value, index);
    }

    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  const fetchMahasiswaByProdi = async (idProdi) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is not available.");
      return;
    }

    const endpoint = `${API_URL}/mahasiswa?s_table=id_prodi&s=${idProdi}`;

    let allData = [];
    let page = 1;

    try {
      while (true) {
        const response = await axios.get(`${endpoint}&page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data.data;

        if (data.length === 0) {
          break; // Exit loop when no more data is available
        }

        allData = [...allData, ...data];
        page++;
      }

      // Set the final data to state
      setMahasiswa(allData);
    } catch (error) {
      console.error("Error fetching mahasiswa by prodi:", error);
    }
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  const handleSearchName = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = value;
    setParticipants(updatedParticipants);

    // Update search term untuk pencarian dinamis
    setSearchTerm(value);
    setLoading(true); // Mulai loading

    // Filter mahasiswa berdasarkan input
    setTimeout(() => {
      const filteredMahasiswa = mahasiswa.filter((m) =>
        m.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredMahasiswa);
      setLoading(false);
    }, 500);
  };

  const handleSelectName = (index, mahasiswaItem) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      name: mahasiswaItem.name,
      id: mahasiswaItem.nim,
    };
    setParticipants(updatedParticipants);
    setSearchResults([]); // Tutup hasil pencarian setelah memilih
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/prestasi`, prestasiData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      async function postParticipants(participants, token) {
        for (const participant of participants) {
          const newParticipants = {
            nim_mahasiswa: participant.id,
            id_prestasi: response.data.data.id,
            flag: participant.flag,
          };

          // Kirim setiap partisipan ke API
          await axios.post(`${API_URL}/prestasiMahasiswa`, newParticipants, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        }
        toast.success("Data prestasi berhasil disimpan.");

        onClose();
      }

      await postParticipants(participants, token);
      console.log("Data prestasi berhasil disimpan");
    } catch (error) {
      alert("Gagal menyimpan data.");
      console.error("Error saving data:", error);
    }
  };

  return (
    <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto">
        <h3 className="font-bold text-lg pb-7">Input Partisipasi</h3>
        <form className="grid grid-cols-1 gap-y-4 gap-x-3 text-sm">
          {participants.map((participant, index) => (
            <div key={index}>
              <label className="font-semibold">Prodi</label>
              <select
                value={participant.id_prodi}
                onChange={(e) =>
                  handleChange(index, "id_prodi", e.target.value)
                }
                className="select select-bordered w-full bg-whtprmy input-sm"
              >
                <option value="">-- Pilih Prodi --</option>
                {prodi.map((prodiItem) => (
                  <option key={prodiItem.id} value={prodiItem.id}>
                    {prodiItem.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-col py-2">
                <label className="font-semibold">
                  Nama {index === 0 ? "Ketua" : "Anggota"}
                </label>
                <label classname="flex font-extralight">
                  Jika nama tidak muncul, silahkan hapus lalu ketik lagi!
                </label>
              </div>
              <input
                type="text"
                value={participant.name}
                onChange={(e) => handleSearchName(index, e.target.value)}
                onFocus={() => setActiveIndex(index)} // Set index aktif ketika input difokuskan
                className="input input-bordered w-full bg-whtprmy input-sm"
                placeholder="Cari mahasiswa"
              />
              {loading && activeIndex === index && (
                <div className="flex justify-center my-2">
                  <span className="loading loading-spinner loading-sm"></span>
                </div>
              )}

              {searchTerm &&
                searchResults.length > 0 &&
                activeIndex === index && (
                  <ul className="mt-2 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md">
                    {searchResults.map((mahasiswaItem) => (
                      <li
                        key={mahasiswaItem.nim} // Gunakan nim sebagai key untuk menghindari masalah render
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleSelectName(index, mahasiswaItem)}
                      >
                        {mahasiswaItem.name} - {mahasiswaItem.nim}
                      </li>
                    ))}
                  </ul>
                )}

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDeleteParticipant(index)}
                  className="btn btn-error btn-xs mt-2"
                >
                  Hapus Anggota
                </button>
              )}
            </div>
          ))}
        </form>
        <div className="modal-action mt-4 justify-center gap-3">
          <button
            className="btn bg-rdprmy text-whtprmy border-none btn-sm"
            onClick={handleAddParticipant}
          >
            Add Anggota
          </button>
          <button
            className="btn bg-rdprmy text-whtprmy border-none btn-sm"
            onClick={handleSave}
          >
            Simpan Permanen
          </button>
          <button
            className="btn btn-sm bg-rdprmy text-whtprmy border-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InputPresMaha;
