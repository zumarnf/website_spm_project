import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const DetailPenModal = ({ data }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Ambil role dari localStorage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const closeModal = () => {
    const modal = document.getElementById("my_modal_9");
    modal.close();
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      if (!data?.id) {
        alert("Data penelitian tidak ditemukan.");
        return;
      }

      console.log("Data yang akan dihapus:", data);

      // Pastikan token tersedia di semua permintaan
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // 1. Hapus relasi `penelitianMahasiswa` jika ada
      if (data?.mahasiswa?.length > 0) {
        for (const mahasiswa of data.mahasiswa) {
          console.log(
            `Menghapus relasi penelitianMahasiswa ID: ${mahasiswa.id}`
          );
          await axios.delete(
            `${API_URL}/penelitianMahasiswa/${mahasiswa.id}`,
            config
          );
        }
        console.log("Semua relasi penelitianMahasiswa berhasil dihapus.");
      }
      console.log("Cek aja.");

      // 2. Hapus relasi `penelitianDosen` jika ada
      if (data?.dosen?.length > 0) {
        for (const dosen of data.dosen) {
          console.log(`Menghapus relasi penelitianDosen ID: ${dosen.id}`);
          await axios.delete(`${API_URL}/penelitianDosen/${dosen.id}`, config);
        }
        console.log("Semua relasi penelitianDosen berhasil dihapus.");
      }
      console.log("Cek aja.");

      // 3. Hapus data induk `penelitian`
      console.log(`Menghapus data penelitian dengan ID: ${data.id}`);
      const response = await axios.delete(
        `${API_URL}/penelitian/${data.id}`,
        config
      );

      if (response.status === 200) {
        toast.success("Data penelitian berhasil dihapus.");
        closeModal(); // Tutup modal jika berhasil
        // Tambahkan logika untuk refresh data jika diperlukan
      } else {
        console.error("Respon server:", response);
        toast.error(`Gagal menghapus data: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);

      // Tangani error berdasarkan pesan dari backend
      if (error.response?.status === 500) {
        alert(
          "Gagal menghapus data karena ada relasi yang belum dihapus. Coba lagi setelah relasi dihapus."
        );
      } else {
        alert(
          `Terjadi kesalahan: ${error.response?.data?.message || error.message}`
        );
      }
    }
  };

  const participants = [
    ...(data?.dosen || []).map((d) => ({
      id: d.dosen.nip,
      name: `${d.dosen.gelar_depan} ${d.dosen.name}, ${d.dosen.gelar_belakang}`,
      category: "dosen",
    })),
    ...(data?.mahasiswa || []).map((m) => ({
      id: m.mahasiswa.nim,
      name: m.mahasiswa.name,
      category: "mahasiswa",
    })),
  ];

  return (
    <>
      <dialog id="my_modal_9" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto sm:w-full sm:max-w-3xl">
          <h3 className="font-bold text-lg mb-4 sticky top-0 left-0 z-10 bg-whtprmy shadow-md p-2 text-center">
            Detail Penelitian
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Kolom Detail Penelitian */}
            <div>
              <form className="grid grid-cols-1 gap-y-3 text-sm">
                <label className="font-semibold">Judul Penelitian</label>
                <input
                  type="text"
                  defaultValue={data?.judul || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Tahun</label>
                <input
                  type="number"
                  defaultValue={data?.tahun || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Nomor SK</label>
                <input
                  type="text"
                  defaultValue={data?.no_sk || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Nomor Kontrak</label>
                <input
                  type="text"
                  defaultValue={data?.no_kontrak || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Skema</label>
                <input
                  type="text"
                  defaultValue={data?.skema || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Bidang</label>
                <input
                  type="text"
                  defaultValue={data?.bidang || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Dana</label>
                <input
                  type="number"
                  defaultValue={data?.dana || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />

                <label className="font-semibold">Sumber Dana</label>
                <input
                  type="text"
                  defaultValue={data?.sumber_dana || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />
                <label className="font-semibold">Laporan Akhir</label>
                <input
                  type="text"
                  defaultValue={data?.laporan_akhir || ""}
                  readOnly
                  className="input input-bordered w-full bg-whtprmy input-sm"
                />
              </form>
            </div>

            {/* Kolom Detail Partisipan */}
            <div>
              <h4 className="font-semibold mb-3">Partisipan</h4>
              {participants.length > 0 ? (
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
                      <span className="text-gray-500">{participant.id}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Tidak ada partisipan</p>
              )}
            </div>
          </div>

          <div className="modal-action mt-4 justify-center gap-3 sticky bottom-0 left-0 z-10 bg-whtprmy shadow-md p-2">
            {role === "admin" ? (
              <>
                <button
                  className="btn bg-rdprmy text-whtprmy border-none btn-sm px-4"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm bg-rdprmy text-whtprmy border-none px-5"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            ) : (
              <button
                className="btn btn-sm bg-rdprmy text-whtprmy border-none px-5"
                onClick={closeModal}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailPenModal;
