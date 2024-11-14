import React from "react";

const DetailPenModal = () => {
  const closeModal = () => {
    const modal = document.getElementById("my_modal_9");
    modal.close();
  };
  return (
    <>
      <dialog id="my_modal_9" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-whtprmy text-blckprmy overflow-y-auto">
          <h3 className="font-bold text-lg mb-4 sticky top-0 left-0 z-10 bg-whtprmy shadow-md p-2">
            Input Penelitian
          </h3>
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
          <div className="modal-action mt-4 justify-center gap-3 sticky bottom-0 left-0 z-10 bg-whtprmy shadow-md p-2">
            <button className="btn bg-rdprmy text-whtprmy border-none btn-sm px-4">
              Submit
            </button>
            <button
              className="btn btn-sm bg-rdprmy text-whtprmy border-none px-5"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailPenModal;
