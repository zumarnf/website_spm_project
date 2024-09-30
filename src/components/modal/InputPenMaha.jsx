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
          <h3 className="font-bold text-lg">Konfirmasi Data Penelitian</h3>
          <p className="py-4">
            Data penelitian berhasil diinput. Lanjutkan dengan menyimpan atau
            batalkan jika ada perubahan.
          </p>
          <div className="modal-action">
            <button className="btn btn-sm bg-grnprmy text-whtprmy border-none">
              Simpan Permanen
            </button>
            <button className="btn btn-sm" onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default InputPenMaha;
