import React, { useState } from "react";
import InputPengMaha from "./InputPengMaha";

const InputPengModal = ({ onClose }) => {
  const [isModalPengVisible, setModalPengVisible] = useState(true);
  const [isModalMahaVisible, setModalMahaVisible] = useState(false);

  // Fungsi untuk switch dari InputPenModal ke InputPenMaha
  const handleSubmit = () => {
    setModalPengVisible(false); // Menyembunyikan modal pertama
    setModalMahaVisible(true); // Menampilkan modal kedua
  };

  // Fungsi untuk kembali dari InputPenMaha ke InputPenModal
  const handleBackToModalPeng = () => {
    setModalMahaVisible(false); // Menyembunyikan modal kedua
    setModalPengVisible(true); // Menampilkan modal pertama
  };

  // Fungsi untuk menutup modal InputPenModal
  const handleCloseModal = () => {
    setModalPengVisible(false); // Menyembunyikan modal
    onClose(); // Memanggil fungsi onClose yang diteruskan dari komponen luar
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      {isModalPengVisible && (
        <dialog
          id="my_modal_6"
          className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
          open
        >
          <div className="modal-box bg-whtprmy text-blckprmy">
            <h3 className="font-bold text-lg mb-4">Input Penelitian</h3>
            <form className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <label className="font-semibold">Judul Penelitian</label>
              <input
                type="text"
                placeholder="Masukkan judul penelitian"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Tanggal</label>
              <input
                type="date"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Nomor SK</label>
              <input
                type="text"
                placeholder="Masukkan nomor SK"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Nomor Kontrak</label>
              <input
                type="text"
                placeholder="Masukkan nomor kontrak"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Skema</label>
              <input
                type="text"
                placeholder="Masukkan skema"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Bidang</label>
              <input
                type="text"
                placeholder="Masukkan bidang"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Dana</label>
              <input
                type="number"
                placeholder="Masukkan dana"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">Sumber Dana</label>
              <input
                type="text"
                placeholder="Masukkan sumber dana"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />

              <label className="font-semibold">File</label>
              <input
                type="text"
                placeholder="Masukkan nama file"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />
            </form>
            <div className="modal-action mt-4 justify-center gap-3">
              <button
                className="btn bg-rdprmy text-whtprmy border-none btn-sm px-4"
                onClick={handleSubmit}
              >
                Submit
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
      )}
      {isModalMahaVisible && <InputPengMaha onClose={handleBackToModalPeng} />}
    </>
  );
};

export default InputPengModal;
