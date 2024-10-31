import React from "react";

const InputDosModal = () => {
  const closeModal = () => {
    const modal = document.getElementById("my_modal_20");
    modal.close();
  };

  return (
    <>
      <dialog
        id="my_modal_20"
        className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
      >
        <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto">
          <h3 className="font-bold text-lg mb-6 sticky top-0 left-0 z-10 shadow-md bg-whtprmy px-3 py-3">
            Input Penelitian
          </h3>
          <form className="grid grid-cols-2 gap-y-3 gap-x-3 text-sm px-3">
            <label className="font-semibold">NIP</label>
            <input
              type="number"
              placeholder="Masukkan NIP"
              className="input input-bordered w-full bg-whtprmy input-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <label className="font-semibold">NIDN</label>
            <input
              type="number"
              placeholder="Masukkan NIDN"
              className="input input-bordered w-full bg-whtprmy input-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <label className="font-semibold">Nama</label>
            <input
              type="text"
              placeholder="Masukkan Nama"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />
            <label className="font-semibold">Jabatan</label>
            <input
              type="text"
              placeholder="Masukkan Jabatan"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />
            <label className="font-semibold">Pendidikan</label>
            <input
              type="text"
              placeholder="Masukkan Pendidikan"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />
            <label className="font-semibold">Kode Dosen</label>
            <input
              type="text"
              placeholder="Masukkan Kode Dosen"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />
            <label className="font-semibold">Gelar Depan</label>
            <input
              type="text"
              placeholder="Masukkan Gelar Depan"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />
            <label className="font-semibold">Gelar Belakang</label>
            <input
              type="text"
              placeholder="Masukkan Gelar Belakang"
              className="input input-bordered w-full bg-whtprmy input-sm"
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
          <div className="modal-action mt-4 justify-center gap-3 sticky bottom-0 left-0 z-10 w-full bg-whtprmy p-4 shadow-md">
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

export default InputDosModal;
