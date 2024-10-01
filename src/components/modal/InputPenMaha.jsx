import React from "react";

const InputPenMaha = ({ onClose }) => {
  return (
    <>
      <dialog
        id="my_modal_6"
        className="modal modal-bottom sm:modal-middle"
        open
      >
        <div className="modal-box bg-whtprmy text-blckprmy">
          <h3 className="font-bold text-lg pb-7">Input Partisipasi</h3>
          <div>Ketua</div>
          <form className="grid grid-cols-3 gap-y-4 gap-x-3 text-sm">
            <select className="select select-bordered w-36 max-w-xs bg-whtprmy text-blckprmy select-sm text-sm">
              <option disabled selected>
                Jenis
              </option>
              <option>Dosen</option>
              <option>Mahasiswa</option>
            </select>
            <input
              type="text"
              placeholder="Nama"
              className="input input-bordered w-full bg-whtprmy input-sm"
            />
            <div className="flex flex-row gap-2 justify-center items-center">
              <input
                type="text"
                placeholder="NIM/NIP"
                className="input input-bordered w-full bg-whtprmy input-sm"
              />
              <button className="btn btn-xs font-extrabold text-base rounded-full text-whtprmy bg-rdprmy flex border-none text-center">
                +
              </button>
            </div>
          </form>
          <div className="modal-action pt-7">
            <button className="btn btn-sm text-whtprmy bg-rdprmy border-none">
              Simpan Permanen
            </button>
            <button
              className="btn btn-sm text-whtprmy bg-rdprmy border-none"
              onClick={onClose}
            >
              Back
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InputPenMaha;
