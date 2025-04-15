import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const InputMahaModal = () => {
  // State untuk menyimpan input form
  const [formData, setFormData] = useState({
    nim: "",
    name: "",
    angkatan: "",
    id_prodi: "",
  });

  // State untuk menyimpan data prodi
  const [prodiOptions, setProdiOptions] = useState([]);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    const modal = document.getElementById("my_modal_13");
    modal.close();
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk menyimpan data ke database
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman

    const token = localStorage.getItem("token"); // Token untuk otentikasi
    if (!token) {
      alert("Token tidak ditemukan! Silakan login ulang.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/mahasiswa`,
        formData, // Kirim formData sebagai payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Data mahasiswa berhasil disimpan."); // Tampilkan notifikasi sukses
      closeModal(); // Tutup modal setelah data tersimpan
    } catch (error) {
      console.error(error); // Log error ke console
      toast.error("Gagal menyimpan data mahasiswa."); // Tampilkan notifikasi error
    }
  };

  // Fetch data prodi saat komponen dimount
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
        setProdiOptions(response.data.data); // Simpan data prodi ke state
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil data prodi.");
      }
    };

    fetchProdi();
  }, []);

  return (
    <>
      <dialog
        id="my_modal_13"
        className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
      >
        <div className="modal-box bg-whtprmy text-blckprmy">
          <h3 className="font-bold text-lg mb-4">Input Mahasiswa</h3>
          <form
            className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm"
            onSubmit={handleSubmit}
          >
            <label className="font-semibold">NIM</label>
            <input
              type="number"
              name="nim"
              value={formData.nim}
              onChange={handleInputChange}
              placeholder="Masukkan NIM"
              className="input input-bordered w-full bg-whtprmy input-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

            <label className="font-semibold">Angkatan</label>
            <input
              type="number"
              name="angkatan"
              value={formData.angkatan}
              onChange={handleInputChange}
              placeholder="Masukkan Angkatan"
              className="input input-bordered w-full bg-whtprmy input-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              required
            />

            <label className="font-semibold">Prodi</label>
            <select
              name="id_prodi"
              value={formData.id_prodi}
              onChange={handleInputChange}
              className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm"
              required
            >
              <option disabled value="">
                Pilih Prodi
              </option>
              {prodiOptions.map((prodi) => (
                <option key={prodi.id} value={prodi.id}>
                  {prodi.name}
                </option>
              ))}
            </select>

            {/* Tombol Submit */}
            <div className="col-span-2 flex justify-center pt-4 gap-4">
              <button
                type="submit"
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
          </form>
        </div>
      </dialog>
    </>
  );
};

export default InputMahaModal;
