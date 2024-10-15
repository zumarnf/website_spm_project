import React, { useState } from "react";

const InputMahaModal = () => {
  // Fungsi untuk menutup modal
  const closeModal = () => {
    const modal = document.getElementById("my_modal_13");
    modal.close();
  };

  return (
    <>
      <dialog
        id="my_modal_13"
        className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
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
              type="button"
              onClick={closeModal}
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
    </>
  );
};

export default InputMahaModal;
