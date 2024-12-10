import React, { useState } from "react";
import InputPenMaha from "./InputPenMaha";

const InputPenModal = ({ onClose }) => {
  const [isModalPenVisible, setModalPenVisible] = useState(true);
  const [isModalMahaVisible, setModalMahaVisible] = useState(false);
  const [penelitianData, setPenelitianData] = useState({
    no_sk: "",
    no_kontrak: "",
    judul: "",
    skema: "",
    tahun: "",
    bidang: "",
    dana: "",
    sumber_dana: "",
    laporan_akhir: "",
  });

  const handleSubmit = () => {
    console.log(penelitianData);
    if (
      penelitianData.no_sk !== "" &&
      penelitianData.no_kontrak !== "" &&
      penelitianData.judul !== "" &&
      penelitianData.skema !== "" &&
      penelitianData.tahun !== "" &&
      penelitianData.bidang !== "" &&
      penelitianData.dana !== "" &&
      penelitianData.sumber_dana !== "" &&
      penelitianData.laporan_akhir !== ""
    ) {
      setModalPenVisible(false);
      setModalMahaVisible(true);
    } else {
      alert("Lengkapi data penelitian");
    }
  };

  const handleBackToModalPen = () => {
    setModalMahaVisible(false);
    setModalPenVisible(true);
  };

  const handleCloseModal = () => {
    setModalPenVisible(false);
    setModalMahaVisible(false);
    if (onClose) {
      onClose();
    }
  };
  const closeAllModals = () => {
    setModalPenVisible(false);
    setModalMahaVisible(false);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Input Penelitian */}
      {isModalPenVisible && (
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
          open
        >
          <div className="modal-box bg-whtprmy text-blckprmy">
            <h3 className="font-bold text-lg mb-4">Input Penelitian</h3>
            <form className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <label className="font-semibold">Nomor SK</label>
              <input
                type="text"
                placeholder="Masukkan nomor SK"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.no_sk}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    no_sk: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Nomor Kontrak</label>
              <input
                type="text"
                placeholder="Masukkan nomor kontrak"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.no_kontrak}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    no_kontrak: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Judul Penelitian</label>
              <input
                type="text"
                placeholder="Masukkan judul penelitian"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.judul}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    judul: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Skema</label>
              <input
                type="text"
                placeholder="Masukkan skema"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.skema}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    skema: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Tahun</label>
              <input
                type="number"
                placeholder="Masukkan tahun"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.tahun}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    tahun: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Bidang</label>
              <input
                type="text"
                placeholder="Masukkan bidang"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.bidang}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    bidang: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Dana</label>
              <input
                type="number"
                placeholder="Masukkan dana"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.dana}
                onChange={(e) =>
                  setPenelitianData({ ...penelitianData, dana: e.target.value })
                }
                required
              />

              <label className="font-semibold">Sumber Dana</label>
              <select
                className="select select-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.sumber_dana}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    sumber_dana: e.target.value,
                  })
                }
                required
              >
                <option value="" disabled>
                  Pilih sumber dana
                </option>
                <option value="Internal">Internal</option>
                <option value="Eksternal">Eksternal</option>
              </select>

              <label className="font-semibold">laporan akhir</label>
              <input
                type="text"
                placeholder="Masukkan nama laporan akhir"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={penelitianData.laporan_akhir}
                onChange={(e) =>
                  setPenelitianData({
                    ...penelitianData,
                    laporan_akhir: e.target.value,
                  })
                }
                required
              />
            </form>
            <div className="modal-action mt-4 justify-center gap-3">
              <button
                className="btn bg-rdprmy text-whtprmy border-none btn-sm px-4"
                onClick={handleSubmit}
              >
                Next
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

      {/* Modal Input Mahasiswa */}
      {isModalMahaVisible && (
        <InputPenMaha
          penelitianData={penelitianData}
          onClose={closeAllModals}
        />
      )}
    </>
  );
};

export default InputPenModal;
