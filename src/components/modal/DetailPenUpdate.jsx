import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailPenUpdate = ({ penelitianData, onClose }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [participants, setParticipants] = useState([
    { name: "", id: "", id_prodi: "", flag: 1, category: "mahasiswa" }, // Ketua
  ]);
  const [prodi, setProdi] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect jika tidak ada token
      return;
    }

    // Fetch data program studi
    axios
      .get("http://127.0.0.1:8000/api/v1/prodi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setProdi(response.data.data))
      .catch((error) => console.error("Error fetching prodi:", error));

    // Fetch data dosen
    axios
      .get("http://127.0.0.1:8000/api/v1/dosen", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setDosen(response.data.data))
      .catch((error) => console.error("Error fetching dosen:", error));

    // Fetch data mahasiswa
    axios
      .get("http://127.0.0.1:8000/api/v1/mahasiswa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setMahasiswa(response.data.data))
      .catch((error) => console.error("Error fetching mahasiswa:", error));
  }, []);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleAddParticipant = () => {
    if (participants.length < 5) {
      setParticipants([
        ...participants,
        { name: "", id: "", id_prodi: "", flag: 2, category: "mahasiswa" }, // Anggota
      ]);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);

    if (field === "id_prodi") {
      fetchEntitiesByProdi(index, updatedParticipants[index].category, value);
    }
  };

  const fetchEntitiesByProdi = (index, category, idProdi) => {
    const token = localStorage.getItem("token");
    const endpoint =
      category === "mahasiswa"
        ? `http://127.0.0.1:8000/api/v1/mahasiswa?s_table=id_prodi&s=${idProdi}`
        : `http://127.0.0.1:8000/api/v1/dosen?s_table=id_prodi&s=${idProdi}`;

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedParticipants = [...participants];
        updatedParticipants[index].category === "mahasiswa"
          ? setMahasiswa(response.data.data)
          : setDosen(response.data.data);
      })
      .catch((error) =>
        console.error(
          `Error fetching ${
            category === "mahasiswa" ? "mahasiswa" : "dosen"
          } by prodi:`,
          error
        )
      );
  };

  const handleSearchName = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = value;
    setParticipants(updatedParticipants);

    setSearchTerm(value);
    const category = updatedParticipants[index].category;
    const filteredResults =
      category === "mahasiswa"
        ? mahasiswa.filter((m) =>
            m.name.toLowerCase().includes(value.toLowerCase())
          )
        : dosen.filter((d) =>
            d.name.toLowerCase().includes(value.toLowerCase())
          );

    setSearchResults(filteredResults);
  };

  const handleSelectName = (index, entity) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].name = entity.name;
    updatedParticipants[index].id =
      updatedParticipants[index].category === "mahasiswa"
        ? entity.nim
        : entity.nip;
    setParticipants(updatedParticipants);
    setSearchResults([]); // Tutup hasil pencarian setelah memilih
  };

  const handleDeleteParticipant = (index) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);

    // Pastikan peserta pertama tetap memiliki flag 1
    if (updatedParticipants.length > 0) {
      updatedParticipants[0].flag = 1;
      for (let i = 1; i < updatedParticipants.length; i++) {
        updatedParticipants[i].flag = 2;
      }
    }

    setParticipants(updatedParticipants);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      console.log(participants);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/penelitian",
        penelitianData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      for (const participant of participants) {
        const payload = {
          nim_mahasiswa:
            participant.category === "mahasiswa" ? participant.id : null,
          nip_dosen: participant.category === "dosen" ? participant.id : null,
          id_penelitian: response.data.data.id,
          flag: participant.flag,
        };
        const endpoint =
          participant.category === "mahasiswa"
            ? "http://127.0.0.1:8000/api/v1/penelitianMahasiswa"
            : "http://127.0.0.1:8000/api/v1/penelitianDosen";

        await axios.post(endpoint, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      alert("Data berhasil disimpan!");
      onClose();
    } catch (error) {
      console.error("Error saving data:", error.response);
      alert("Gagal menyimpan data.");
    }
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open>
      <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto">
        <h3 className="font-bold text-lg pb-7">Detail Partisipasi</h3>
        <form className="grid grid-cols-1 gap-y-4 gap-x-3 text-sm">
          {participants.map((participant, index) => (
            <div key={index}>
              {participants.map((participant, index) => (
                <div key={index}>
                  <label className="font-semibold">Kategori</label>
                  <select
                    value={participant.category}
                    onChange={(e) =>
                      handleChange(index, "category", e.target.value)
                    }
                    className="select select-bordered w-full bg-whtprmy input-sm"
                  >
                    <option value="mahasiswa">Mahasiswa</option>
                    <option value="dosen">Dosen</option>
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

                  <label className="font-semibold">Nama</label>
                  <input
                    type="text"
                    value={participant.name}
                    onChange={(e) => handleSearchName(index, e.target.value)}
                    onFocus={() => setActiveIndex(index)}
                    className="input input-bordered w-full bg-whtprmy input-sm"
                    placeholder="Cari nama"
                  />

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
                            {participant.category === "mahasiswa"
                              ? entity.nim
                              : entity.nip}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              ))}

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDeleteParticipant(index)}
                  className="btn btn-error btn-xs mt-2"
                >
                  Hapus Anggota
                </button>
              )}

              {isEditable && (
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="btn btn-primary btn-xs mt-2 ml-2"
                >
                  Edit
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

export default DetailPenUpdate;
