import React, { useState } from "react";
import InputPengMaha from "./InputPengMaha";

const InputPengModal = ({ onClose }) => {
  const [isModalPengVisible, setModalPengVisible] = useState(true);
  const [isModalMahaVisible, setModalMahaVisible] = useState(false);
  const [pengabdianData, setPengabdianData] = useState({
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
    console.log(pengabdianData);
    if (
      pengabdianData.no_sk !== "" &&
      pengabdianData.no_kontrak !== "" &&
      pengabdianData.judul !== "" &&
      pengabdianData.skema !== "" &&
      pengabdianData.tahun !== "" &&
      pengabdianData.bidang !== "" &&
      pengabdianData.dana !== "" &&
      pengabdianData.sumber_dana !== "" &&
      pengabdianData.laporan_akhir !== ""
    ) {
      setModalPengVisible(false);
      setModalMahaVisible(true);
    } else {
      alert("Lengkapi data pengabdian");
    }
  };

  const handleBackToModalPeng = () => {
    setModalMahaVisible(false);
    setModalPengVisible(true);
  };

  const handleCloseModal = () => {
    setModalPengVisible(false);
    setModalMahaVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const closeAllModals = () => {
    setModalPengVisible(false);
    setModalMahaVisible(false);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      {/* Modal Input Pengabdian */}
      {isModalPengVisible && (
        <dialog
          id="my_modal_6"
          className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
          open
        >
          <div className="modal-box bg-whtprmy text-blckprmy">
            <h3 className="font-bold text-lg mb-4">Input Pengabdian</h3>
            <form className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <label className="font-semibold">Nomor SK</label>
              <input
                type="text"
                placeholder="Masukkan nomor SK"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={pengabdianData.no_sk}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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
                value={pengabdianData.no_kontrak}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
                    no_kontrak: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Judul Pengabdian</label>
              <input
                type="text"
                placeholder="Masukkan judul pengabdian"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={pengabdianData.judul}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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
                value={pengabdianData.skema}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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
                value={pengabdianData.tahun}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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
                value={pengabdianData.bidang}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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
                value={pengabdianData.dana}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
                    dana: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Sumber Dana</label>
              <select
                className="select select-bordered w-full bg-whtprmy input-sm"
                value={pengabdianData.sumber_dana}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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

              <label className="font-semibold">Laporan Akhir</label>
              <input
                type="text"
                placeholder="Masukkan nama laporan akhir"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={pengabdianData.laporan_akhir}
                onChange={(e) =>
                  setPengabdianData({
                    ...pengabdianData,
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
        <InputPengMaha
          pengabdianData={pengabdianData}
          onClose={closeAllModals}
        />
      )}
    </>
  );
};

export default InputPengModal;
