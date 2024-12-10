import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Pastikan ini sesuai dengan pengaturan navigasi di aplikasi kamu
      return;
    }

    // Ambil data prodi
    axios
      .get("http://127.0.0.1:8000/api/v1/prodi", {
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
      .get("http://127.0.0.1:8000/api/v1/mahasiswa", {
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
    if (participants.length < 5) {
      setParticipants([
        ...participants,
        { name: "", id_prodi: "", id: "", flag: 2 }, // Anggota dengan flag 2
      ]);
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

  const fetchMahasiswaByProdi = (idProdi) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/api/v1/mahasiswa?s_table=id_prodi&s=${idProdi}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMahasiswa(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching mahasiswa by prodi:", error)
      );
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

    // Filter mahasiswa berdasarkan input
    const filteredMahasiswa = mahasiswa.filter((m) =>
      m.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredMahasiswa);
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/prestasi",
        prestasiData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      async function postParticipants(participants, token) {
        for (const participant of participants) {
          const newParticipants = {
            nim_mahasiswa: participant.id,
            id_prestasi: response.data.data.id,
            flag: participant.flag,
          };

          // Kirim setiap partisipan ke API
          await axios.post(
            "http://127.0.0.1:8000/api/v1/prestasiMahasiswa",
            newParticipants,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
        }
        alert("Data berhasil disimpan!");
        navigate(location.href);
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
              <label className="font-semibold">
                Nama {index === 0 ? "Ketua" : "Anggota"}
              </label>
              <input
                type="text"
                value={participant.name}
                onChange={(e) => handleSearchName(index, e.target.value)}
                onFocus={() => setActiveIndex(index)} // Set index aktif ketika input difokuskan
                className="input input-bordered w-full bg-whtprmy input-sm"
                placeholder="Cari mahasiswa"
              />

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
