import React, { useState } from "react";
import InputPubMaha from "./InputPubMaha";

const InputPubModal = ({ onClose }) => {
  const [isModalPubVisible, setModalPubVisible] = useState(true);
  const [isModalMahaVisible, setModalMahaVisible] = useState(false);

  // Fungsi untuk switch dari InputPenModal ke InputPenMaha
  const handleSubmit = () => {
    setModalPubVisible(false); // Menyembunyikan modal pertama
    setModalMahaVisible(true); // Menampilkan modal kedua
  };

  // Fungsi untuk kembali dari InputPenMaha ke InputPenModal
  const handleBackToModalPub = () => {
    setModalMahaVisible(false); // Menyembunyikan modal kedua
    setModalPubVisible(true); // Menampilkan modal pertama
  };

  // Fungsi untuk menutup modal InputPenModal
  const handleCloseModal = () => {
    setModalPubVisible(false); // Menyembunyikan modal
    onClose(); // Memanggil fungsi onClose yang diteruskan dari komponen luar
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      {isModalPubVisible && (
        <dialog
          id="my_modal_11"
          className="modal modal-bottom sm:modal-middle w-full"
          open
        >
          <div className="modal-box bg-whtprmy text-blckprmy max-h-[95vh] overflow-y-auto">
            <div className="font-bold text-lg sticky top-0 left-0 z-10 w-full bg-whtprmy p-4">
              Input Publikasi
            </div>

            <form className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm pt-5">
              <label className="font-semibold">Judul Penelitian</label>
              <input
                type="text"
                placeholder="Masukkan judul penelitian"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />
              <label className="font-semibold">Nama Jurnal</label>
              <input
                type="text"
                placeholder="Masukkan nama jurnal"
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

            <div className="modal-action mt-4 justify-center gap-3 sticky bottom-0 left-0 z-10 w-full bg-whtprmy p-4 shadow-md">
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
      {isModalMahaVisible && <InputPubMaha onClose={handleBackToModalPub} />}
    </>
  );
};

export default InputPubModal;
