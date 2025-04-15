import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const InputDosModal = ({ onAddDosen }) => {
  const [prodiOptions, setProdiOptions] = useState([]); // Menyimpan daftar prodi
  const [jabatanOptions, setJabatanOptions] = useState([]); // Menyimpan daftar jabatan
  const [formData, setFormData] = useState({
    nip: "",
    nidn: "",
    name: "",
    pendidikan: "",
    kode_dosen: "",
    gelar_depan: "",
    gelar_belakang: "",
    id_prodi: "",
    status: "",
  });
  const [jabatans, setJabatans] = useState({
    id_jabatan: "",
  });

  // Fetch data Prodi saat komponen dimuat
  useEffect(() => {
    const fetchProdi = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ditemukan! Silakan login ulang.");
          return;
        }
        const response = await axios.get(`${API_URL}/prodi`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdiOptions(response.data.data); // Menyimpan data prodi ke state
      } catch (error) {
        console.error("Error fetching prodi:", error);
        alert("Gagal mengambil data prodi.");
      }
    };

    fetchProdi();
  }, []);

  // Fetch data Jabatan saat komponen dimuat
  useEffect(() => {
    const fetchJabatan = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Token tidak ditemukan! Silakan login ulang.");
          return;
        }
        const response = await axios.get(`${API_URL}/jabatan`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJabatanOptions(response.data.data); // Menyimpan data jabatan ke state
      } catch (error) {
        console.error("Error fetching jabatan:", error);
        alert("Gagal mengambil data jabatan.");
      }
    };

    fetchJabatan();
  }, []);

  // Menutup modal
  const closeModal = () => {
    const modal = document.getElementById("my_modal_20");
    modal.close();
  };

  // Mengirim data dosen baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan! Silakan login ulang.");
        return;
      }

      // Kirim data dosen
      const dosenResponse = await axios.post(`${API_URL}/dosen`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kirim data historyJabatan
      const payload = {
        nip_dosen: formData.nip,
        id_jabatan: jabatans.id_jabatan,
      };
      await axios.post(`${API_URL}/historyJabatan`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Data dosen berhasil ditambahkan.");
      onAddDosen(dosenResponse.data.data); // Memperbarui daftar dosen di parent component
      closeModal();
    } catch (error) {
      toast.error("Gagal menambahkan data dosen.");
    }
  };

  // Menangani perubahan input form dosen
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Menangani perubahan input jabatan
  const handleJabatanChange = (e) => {
    const { name, value } = e.target;
    setJabatans({
      ...jabatans,
      [name]: value,
    });
  };

  return (
    <dialog
      id="my_modal_20"
      className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
    >
      <div className="modal-box bg-whtprmy text-blckprmy">
        <h3 className="font-bold text-lg mb-4">Input Data Dosen</h3>
        <form
          className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm"
          onSubmit={handleSubmit}
        >
          <label className="font-semibold">NIP</label>
          <input
            type="number"
            name="nip"
            value={formData.nip}
            onChange={handleInputChange}
            placeholder="Masukkan NIP"
            className="input input-bordered w-full bg-whtprmy input-sm"
            required
          />

          <label className="font-semibold">NIDN</label>
          <input
            type="number"
            name="nidn"
            value={formData.nidn}
            onChange={handleInputChange}
            placeholder="Masukkan NIDN"
            className="input input-bordered w-full bg-whtprmy input-sm"
            required
          />

          <label className="font-semibold">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Masukkan Nama"
            className="input input-bordered w-full bg-whtprmy input-sm"
            required
          />

          <label className="font-semibold">Pendidikan</label>
          <input
            type="text"
            name="pendidikan"
            value={formData.pendidikan}
            onChange={handleInputChange}
            placeholder="Masukkan Pendidikan"
            className="input input-bordered w-full bg-whtprmy input-sm"
            required
          />

          <label className="font-semibold">Kode Dosen</label>
          <input
            type="text"
            name="kode_dosen"
            value={formData.kode_dosen}
            onChange={handleInputChange}
            placeholder="Masukkan Kode Dosen"
            className="input input-bordered w-full bg-whtprmy input-sm"
            required
          />

          <label className="font-semibold">Gelar Depan</label>
          <input
            type="text"
            name="gelar_depan"
            value={formData.gelar_depan}
            onChange={handleInputChange}
            placeholder="Masukkan Gelar Depan"
            className="input input-bordered w-full bg-whtprmy input-sm"
          />

          <label className="font-semibold">Gelar Belakang</label>
          <input
            type="text"
            name="gelar_belakang"
            value={formData.gelar_belakang}
            onChange={handleInputChange}
            placeholder="Masukkan Gelar Belakang"
            className="input input-bordered w-full bg-whtprmy input-sm"
          />

          <label className="font-semibold">Prodi</label>
          <select
            name="id_prodi"
            value={formData.id_prodi}
            onChange={handleInputChange}
            className="select select-bordered w-full bg-whtprmy text-blckprmy select-sm"
            required
          >
            <option value="" disabled>
              Pilih Prodi
            </option>
            {prodiOptions.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.name}
              </option>
            ))}
          </select>

          <label className="font-semibold">Jabatan</label>
          <select
            name="id_jabatan"
            value={jabatans.id_jabatan}
            onChange={handleJabatanChange}
            className="select select-bordered w-full bg-whtprmy text-blckprmy select-sm"
            required
          >
            <option value="" disabled>
              Pilih Jabatan
            </option>
            {jabatanOptions.map((jabat) => (
              <option key={jabat.id} value={jabat.id}>
                {jabat.jabatan}
              </option>
            ))}
          </select>
          <label className="font-semibold">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="select select-bordered w-full bg-whtprmy text-blckprmy select-sm"
            required
          >
            <option value="" disabled>
              Pilih Status
            </option>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </form>

        <div className="modal-action mt-4 justify-center gap-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn bg-rdprmy text-whtprmy border-none btn-sm px-4"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm bg-rdprmy text-whtprmy border-none px-5"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InputDosModal;
