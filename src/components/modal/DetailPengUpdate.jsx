import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const DetailPengUpdate = ({ data }) => {
  const [role, setRole] = useState(null);
  const [formData, setFormData] = useState({});
  const [participants, setParticipants] = useState([]);
  const [prodiOptions, setProdiOptions] = useState([]);
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    id: "",
    id_prodi: "",
    category: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 900);

  const fetchPage = async (
    endpoint,
    config,
    currentPage = 1,
    accumulatedData = [],
    perPage = 20
  ) => {
    try {
      const urlWithPage = `${endpoint}?per_page=${perPage}&page=${currentPage}`;
      const response = await axios.get(urlWithPage, config);

      const newData = response.data?.data || [];
      const meta = response.data?.meta;

      if (!meta || !Array.isArray(newData)) {
        console.error("Unexpected API response format:", response.data);
        throw new Error("Invalid API response format.");
      }

      const allData = [...accumulatedData, ...newData];

      if (meta.current_page < meta.last_page) {
        return fetchPage(endpoint, config, currentPage + 1, allData, perPage);
      } else {
        return allData;
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (data) {
      setFormData({
        judul: data.judul || "",
        tahun: data.tahun || "",
        no_sk: data.no_sk || "",
        no_kontrak: data.no_kontrak || "",
        skema: data.skema || "",
        bidang: data.bidang || "",
        dana: data.dana || "",
        sumber_dana: data.sumber_dana || "",
        laporan_akhir: data.laporan_akhir || "",
      });

      setParticipants([
        ...(data.dosen || []).map((d) => ({
          id: d.id,
          name: `${d.dosen.gelar_depan} ${d.dosen.name}, ${d.dosen.gelar_belakang}`,
          category: "dosen",
        })),
        ...(data.mahasiswa || []).map((m) => ({
          id: m.id,
          name: m.mahasiswa.name,
          category: "mahasiswa",
        })),
      ]);
    }
  }, [data]);

  useEffect(() => {
    const fetchProdiOptions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan. Silakan login kembali.");
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const url = `${API_URL}/prodi`;
        const allProdi = await fetchPage(url, config, 1, [], 20);
        setProdiOptions(allProdi);
      } catch (error) {
        console.error("Failed to fetch program studi data:", error);
      }
    };

    fetchProdiOptions();
  }, []);

  const searchParticipants = async (term) => {
    if (!newParticipant.id_prodi || !newParticipant.category || !term) return;

    console.log("Searching with term:", term);
    console.log("Category:", newParticipant.category);
    console.log("Prodi ID:", newParticipant.id_prodi);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please login again.");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const endpoint =
      newParticipant.category === "mahasiswa"
        ? `${API_URL}/mahasiswa?s_table=id_prodi&s=${newParticipant.id_prodi}`
        : `${API_URL}/dosen?s_table=id_prodi&s=${newParticipant.id_prodi}`;

    try {
      const allResults = await fetchPage(endpoint, config);
      const filteredResults = allResults.filter((result) =>
        result.name.toLowerCase().includes(term.toLowerCase())
      );

      console.log("Filtered Results:", filteredResults);
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Failed to search participants:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchParticipants(debouncedSearchTerm);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, newParticipant.id_prodi, newParticipant.category]);

  const handleSearchName = (value) => {
    setSearchTerm(value);
    setActiveIndex(-1);
    setNewParticipant((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" && activeIndex < searchResults.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (e.key === "ArrowUp" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      handleSelectParticipant(searchResults[activeIndex]);
    }
  };

  const handleSelectParticipant = (participant) => {
    console.log("Participant received:", participant);

    if (!participant || !participant.name) {
      console.error("Invalid participant selected:", participant);
      alert("Invalid participant selected. Please try again.");
      return;
    }

    setNewParticipant((prev) => ({
      ...prev,
      name: participant.name,
      id:
        newParticipant.category === "mahasiswa"
          ? participant.nim
          : participant.nip,
    }));

    setSearchResults([]);
  };

  const handleAddParticipant = async () => {
    const { name, id_prodi, category, id } = newParticipant;

    if (!name || !id_prodi || !category || !id) {
      alert("All participant details must be filled.");
      return;
    }

    if (category !== "mahasiswa" && category !== "dosen") {
      alert("Invalid category selected.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token not found. Please login again.");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const endpoint =
        category === "mahasiswa"
          ? `${API_URL}/pengabdianMahasiswa`
          : `${API_URL}/pengabdianDosen`;

      const currentParticipantsResponse = await axios.get(
        `${endpoint}?id_pengabdian=${data.id}`,
        config
      );

      const currentParticipants = currentParticipantsResponse.data?.data || [];
      const currentMaxFlag =
        currentParticipants.length > 0
          ? Math.max(...currentParticipants.map((p) => p.flag || 0))
          : 0;

      const newFlag = currentMaxFlag + 1;

      const newParticipantData = {
        id_pengabdian: data.id,
        nim_mahasiswa: category === "mahasiswa" ? id : null,
        nip_dosen: category === "dosen" ? id : null,
        flag: newFlag,
      };

      await axios.post(endpoint, newParticipantData, config);

      setParticipants((prev) => [...prev, { id, name, category }]);

      setNewParticipant({ name: "", id: "", id_prodi: "", category: "" });
      toast.success(`Participants added successfully.`);
    } catch (error) {
      console.error("Failed to add participant:", error);
      toast.error("error");
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`${API_URL}/pengabdian/${data.id}`, formData, config);

      toast.success("Successfully updated pengabdian data.");
      handleCloseModal();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast.error("Error updating pengabdian data.");
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("modal_25");
    modal.close();
  };

  const handleRemoveParticipant = async (idToRemove, category) => {
    try {
      setParticipants((prev) => prev.filter((p) => p.id !== idToRemove));

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let endpoint = "";
      if (category === "mahasiswa") {
        endpoint = `${API_URL}/pengabdianMahasiswa/${idToRemove}`;
      } else if (category === "dosen") {
        endpoint = `${API_URL}/pengabdianDosen/${idToRemove}`;
      } else {
        alert("Kategori tidak valid.");
        return;
      }

      const response = await axios.delete(endpoint, config);

      if (response.status === 200) {
        toast.success(
          `Berhasil menghapus partisipan : ${response.data.message}.`
        );
      } else {
        toast.error(`Gagal menghapus partisipan: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      toast.error(
        `Terjadi kesalahan saat menghapus partisipan: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <dialog id="modal_25" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto sm:w-full sm:max-w-3xl">
        <h3 className="font-bold text-lg mb-4 sticky top-0 left-0 z-10 bg-whtprmy shadow-md p-2 text-center">
          Update Pengabdian
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <form className="grid grid-cols-1 gap-y-3 text-sm">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                  <label className="font-semibold">
                    {key.replace(/_/g, " ").toUpperCase()}
                  </label>
                  <input
                    type={key === "dana" || key === "tahun" ? "number" : "text"}
                    name={key}
                    value={value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [key]: e.target.value,
                      })
                    }
                    className="input input-bordered w-full bg-whtprmy input-sm"
                  />
                </div>
              ))}
            </form>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Partisipan</h4>
            <ul className="text-sm">
              {participants.map((participant, index) => (
                <li
                  key={index}
                  className="border-b border-gray-300 py-3 flex justify-between items-center"
                >
                  <span>
                    {participant.name} -{" "}
                    {participant.category === "mahasiswa"
                      ? "Mahasiswa"
                      : "Dosen"}
                  </span>
                  <button
                    className="btn btn-sm bg-rdprmy text-whtprmy border-none"
                    onClick={() =>
                      handleRemoveParticipant(
                        participant.id,
                        participant.category
                      )
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h5 className="font-semibold">Tambah Partisipan</h5>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-2">
                  <select
                    value={newParticipant.category}
                    onChange={(e) =>
                      setNewParticipant({
                        ...newParticipant,
                        category: e.target.value,
                      })
                    }
                    className="select select-bordered bg-whtprmy select-sm text-xs"
                  >
                    <option value="">Category</option>
                    <option value="mahasiswa">Mahasiswa</option>
                    <option value="dosen">Dosen</option>
                  </select>
                  <select
                    value={newParticipant.id_prodi}
                    onChange={(e) =>
                      setNewParticipant({
                        ...newParticipant,
                        id_prodi: e.target.value,
                      })
                    }
                    className="select select-bordered bg-whtprmy select-sm w-full text-xs"
                  >
                    <option value="">Select Prodi</option>
                    {prodiOptions.map((id_prodi) => (
                      <option key={id_prodi.id} value={id_prodi.id}>
                        {id_prodi.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newParticipant.name}
                    onChange={(e) => handleSearchName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="input input-bordered w-full bg-whtprmy input-sm"
                  />
                  {loading && (
                    <div className="flex justify-center">
                      <span className="loading loading-spinner"></span>
                    </div>
                  )}
                  {searchTerm && searchResults.length > 0 && (
                    <ul className="bg-whtprmy border rounded-lg mt-2">
                      {searchResults.map((participant, index) => (
                        <li
                          key={participant.id}
                          onClick={() => handleSelectParticipant(participant)}
                          className={`cursor-pointer p-2 hover:bg-gray-200 ${
                            activeIndex === index ? "bg-gray-300" : "bg-whtprmy"
                          }`}
                        >
                          {participant.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="btn btn-sm bg-rdprmy text-whtprmy mt-2"
                  onClick={handleAddParticipant}
                >
                  Add Partisipan
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-action mt-4 justify-center gap-3 sticky bottom-0 left-0 z-10 bg-whtprmy shadow-md p-2">
          <button
            className="btn bg-rdprmy text-whtprmy border-none btn-sm px-4"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className="btn btn-sm bg-rdprmy text-whtprmy border-none px-5"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DetailPengUpdate;
