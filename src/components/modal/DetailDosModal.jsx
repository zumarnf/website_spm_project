import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL; // Ambil URL dari .env

const DetailDosModal = ({ isOpen, handleCloseModal, nip }) => {
  const [jabatanList, setJabatanList] = useState([]);
  const [selectedJabatan, setSelectedJabatan] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [detailDosen, setDetailDosen] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (isOpen) {
      const fetchJabatan = async () => {
        try {
          const response = await axios.get(`${API_URL}/jabatan`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJabatanList(response.data.data);
        } catch (err) {
          console.error("Error fetching jabatan:", err);
          setError("Gagal memuat data jabatan.");
        }
      };

      const fetchDosen = async () => {
        try {
          const response = await axios.get(`${API_URL}/dosen/${nip}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDetailDosen(response.data);
        } catch (err) {
          console.error("Error fetching dosen:", err);
          setError("Gagal memuat data dosen.");
        }
      };

      fetchJabatan();
      fetchDosen();
    }
  }, [isOpen, nip, token]);

  const handleSave = async () => {
    if (!selectedJabatan && !selectedStatus) {
      setError("Pilih jabatan atau status terlebih dahulu.");
      return;
    }

    try {
      // Update jabatan jika dipilih
      if (selectedJabatan) {
        console.log("Mengupdate jabatan dengan data:", {
          nip_dosen: nip,
          id_jabatan: selectedJabatan,
        });

        await axios.post(
          `${API_URL}/historyJabatan`,
          { nip_dosen: nip, id_jabatan: selectedJabatan },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Jabatan berhasil diperbarui.");
      }

      // Update status jika dipilih
      if (selectedStatus) {
        console.log("Mengupdate status dengan data:", {
          nip: detailDosen.data.nip,
          name: detailDosen.data.name,
          nidn: detailDosen.data.nidn,
          id_prodi: detailDosen.data.id_prodi,
          status: selectedStatus,
        });

        await axios.put(
          `${API_URL}/dosen/${nip}`,
          {
            nip: detailDosen?.data?.nip,
            name: detailDosen?.data?.name,
            nidn: detailDosen?.data?.nidn,
            id_prodi: detailDosen?.data?.id_prodi,
            status: selectedStatus,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Status berhasil diperbarui.");
      }

      handleCloseModal();
    } catch (err) {
      console.error("Error saat menyimpan:", err.response?.data || err);
      toast.error("Gagal menyimpan data.");
      console.log("detailDosen:", detailDosen);
    }
  };

  return isOpen ? (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleCloseModal}
      ></div>
      <dialog open className="modal modal-bottom sm:modal-middle z-50">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Dosen</h3>
          <div className="py-4">
            <label className="block mb-2">Pilih Jabatan (Opsional):</label>
            {error && <p className="text-red-500">{error}</p>}
            <select
              className="select select-bordered w-full"
              value={selectedJabatan}
              onChange={(e) => setSelectedJabatan(e.target.value)}
            >
              <option value="" disabled>
                -- Pilih Jabatan --
              </option>
              {jabatanList.map((jabatan) => (
                <option key={jabatan.id} value={jabatan.id}>
                  {jabatan.jabatan}
                </option>
              ))}
            </select>

            <label className="block mt-4 mb-2">Pilih Status (Opsional):</label>
            <select
              className="select select-bordered w-full"
              value={selectedStatus}
              onChange={(e) => {
                console.log("Status yang dipilih:", e.target.value);
                setSelectedStatus(e.target.value);
              }}
            >
              <option value="" disabled>
                -- Pilih Status --
              </option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak aktif">Tidak Aktif</option>
            </select>
          </div>
          <div className="modal-action">
            <button className="btn bg-rdprmy text-whtprmy" onClick={handleSave}>
              Simpan
            </button>
            <button
              className="btn bg-rdprmy text-whtprmy"
              onClick={handleCloseModal}
            >
              Batal
            </button>
          </div>
        </div>
      </dialog>
    </>
  ) : null;
};

export default DetailDosModal;
