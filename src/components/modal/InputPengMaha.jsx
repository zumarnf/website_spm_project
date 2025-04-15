import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const InputPengMaha = ({ pengabdianData, onClose }) => {
  const [participants, setParticipants] = useState([
    { name: "", id: "", id_prodi: "", flag: 1, category: "dosen" }, // Ketua
  ]);
  const [prodi, setProdi] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Arahkan jika tidak ada token
      return;
    }
    // Fetch data program studi
    axios
      .get(`${API_URL}/prodi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setProdi(response.data.data))
      .catch((error) => console.error("Error fetching prodi:", error));

    // Fetch data dosen
    axios
      .get(`${API_URL}/dosen`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setDosen(response.data.data))
      .catch((error) => console.error("Error fetching dosen:", error));

    // Fetch data mahasiswa
    axios
      .get(`${API_URL}/mahasiswa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setMahasiswa(response.data.data))
      .catch((error) => console.error("Error fetching mahasiswa:", error));
  }, []);

  const handleAddParticipant = () => {
    if (participants.length < 7) {
      const newParticipant = {
        name: "",
        id: "",
        id_prodi: "",
        flag: participants.length + 1, // Flag diteruskan
        category: "dosen", // Default ke mahasiswa untuk input tambahan
      };
      setParticipants([...participants, newParticipant]);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedParticipants = [...participants];

    // Cegah perubahan kategori untuk partisipan pertama
    if (index === 0 && field === "category" && value !== "dosen") {
      alert("Kategori untuk partisipan pertama harus dosen.");
      return;
    }

    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);

    if (field === "id_prodi") {
      // Perbarui entitas sesuai prodi dan kategori yang dipilih
      fetchEntitiesByProdi(index, updatedParticipants[index].category, value);
    }
  };

  const fetchEntitiesByProdi = (index, category, idProdi) => {
    const token = localStorage.getItem("token");
    const endpoint =
      category === "dosen"
        ? `${API_URL}/dosen?s_table=id_prodi&s=${idProdi}`
        : `${API_URL}/mahasiswa?s_table=id_prodi&s=${idProdi}`;

    let allData = [];
    let page = 1;

    const fetchPage = async () => {
      try {
        const response = await axios.get(`${endpoint}&page=${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.data.length > 0) {
          allData = [...allData, ...response.data.data];
          page++;
          fetchPage(); // Recursively fetch the next page
        } else {
          // When no more data is available, set the final data
          const updatedParticipants = [...participants];
          updatedParticipants[index].category === "dosen"
            ? setDosen(allData)
            : setMahasiswa(allData);
        }
      } catch (error) {
        console.error(`Error fetching ${category} by prodi:`, error);
      }
    };

    fetchPage(); // Start the fetch process
  };

  const handleSearchName = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = value;
    setParticipants(updatedParticipants);

    setSearchTerm(value);
    const category = updatedParticipants[index].category;

    // Tampilkan spinner saat pencarian dimulai
    setLoading(true); // Mulai loading

    // Simulasikan pencarian nama
    setTimeout(() => {
      const filteredResults =
        category === "dosen"
          ? dosen.filter((d) =>
              d.name.toLowerCase().includes(value.toLowerCase())
            )
          : mahasiswa.filter((m) =>
              m.name.toLowerCase().includes(value.toLowerCase())
            );

      setSearchResults(filteredResults);
      setLoading(false); // Akhiri loading
    }, 500); // Tambahkan delay untuk simulasi server
  };

  const handleSelectName = (index, entity) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = entity.name;
    updatedParticipants[index].id =
      updatedParticipants[index].category === "dosen" ? entity.nip : entity.nim;
    setParticipants(updatedParticipants);
    setSearchResults([]); // Tutup hasil pencarian setelah memilih
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);

    // Hitung ulang flag setelah penghapusan
    updatedParticipants.forEach((participant, i) => {
      participant.flag = i + 1;
    });

    setParticipants(updatedParticipants);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post(
        `${API_URL}/pengabdian`,
        pengabdianData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      for (const participant of participants) {
        const payload = {
          nip_dosen: participant.category === "dosen" ? participant.id : null,
          nim_mahasiswa:
            participant.category === "mahasiswa" ? participant.id : null,
          id_pengabdian: response.data.data.id,
          flag: participant.flag,
        };
        const endpoint =
          participant.category === "dosen"
            ? `${API_URL}/pengabdianDosen`
            : `${API_URL}/pengabdianMahasiswa`;

        await axios.post(endpoint, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      toast.success("Data berhasil disimpan.");
      onClose();
    } catch (error) {
      toast.error("Gagal menyimpan data.");
    }
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto">
        <h3 className="font-bold text-lg pb-7">Input Partisipasi</h3>
        <form className="grid grid-cols-1 gap-y-4 gap-x-3 text-sm">
          {participants.map((participant, index) => (
            <div key={index}>
              <label className="font-semibold">Kategori</label>
              <select
                value={participant.category}
                onChange={(e) =>
                  handleChange(index, "category", e.target.value)
                }
                className="select select-bordered w-full bg-whtprmy input-sm"
                disabled={index === 0}
              >
                <option value="dosen">Dosen</option>
                {index > 0 && <option value="mahasiswa">Mahasiswa</option>}
              </select>

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
                <label className="flex font-semibold">Nama</label>
                <label classname="flex font-extralight">
                  Jika nama tidak muncul, silahkan hapus lalu ketik lagi!
                </label>
              </div>
              <input
                type="text"
                value={participant.name}
                onChange={(e) => handleSearchName(index, e.target.value)}
                onFocus={() => {
                  setActiveIndex(index);
                  if (index === 0 && participant.category === "dosen") {
                    setSearchResults(dosen); // Tampilkan hanya dosen untuk input pertama
                  }
                }}
                className="input input-bordered w-full bg-whtprmy input-sm"
                placeholder="Cari nama"
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
                    {searchResults.map((entity) => (
                      <li
                        key={entity.id}
                        className="cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => handleSelectName(index, entity)}
                      >
                        {entity.name} -{" "}
                        {participant.category === "dosen"
                          ? entity.nip
                          : entity.nim}
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
            Simpan
          </button>
          <button
            className="btn bg-blckprmy text-whtprmy border-none btn-sm"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InputPengMaha;
