import React from "react";

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
            <label className="font-semibold">NIM</label>
            <input
              type="number"
              placeholder="Masukkan NIM"
              className="input input-bordered w-full bg-whtprmy input-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <label className="font-semibold">Nama</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />

            <label className="font-semibold">Angkatan</label>
            <input
              type="number"
              placeholder="Masukkan Angkatan"
              className="input input-bordered w-full bg-whtprmy input-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <label className="font-semibold">Prodi</label>
            <select className="select select-bordered w-full max-w-xs bg-whtprmy text-blckprmy select-sm text-sm">
              <option disabled selected>
                Pilih Prodi
              </option>
              <option>NIM</option>
              <option>Nama</option>
              <option>NIM</option>
              <option>Nama</option>
              <option>NIM</option>
            </select>
          </form>
          <div className="modal-action pt-12 justify-center gap-3">
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
