import React, { useState } from "react";
import axios from "axios";
import InputPresMaha from "./InputPresMaha";

const InputPresModal = ({ onClose }) => {
  const [isModalPresVisible, setModalPresVisible] = useState(true);
  const [isModalMahaVisible, setModalMahaVisible] = useState(false);
  const [prestasiData, setPrestasiData] = useState({
    nama_lomba: "",
    juara: "",
    url_foto: "",
    url_sertifikat: "",
  });

  const handleSubmit = () => {
    console.log(prestasiData);
    if (
      prestasiData.nama_lomba != "" &&
      prestasiData.juara != "" &&
      prestasiData.url_foto != "" &&
      prestasiData.url_sertifikat != ""
    ) {
      setModalPresVisible(false);
      setModalMahaVisible(true);
    } else {
      alert("Lengkapi data prestasi");
    }
  };

  const closeAllModals = () => {
    setModalPresVisible(false);
    setModalMahaVisible(false);
    onClose();
  };

  const handleCloseModal = () => {
    setModalPresVisible(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      {isModalPresVisible && (
        <dialog
          id="my_modal_6"
          className="modal modal-bottom sm:modal-middle w-full overflow-hidden"
          open
        >
          <div className="modal-box bg-whtprmy text-blckprmy">
            <h3 className="font-bold text-lg mb-4">Input Prestasi</h3>
            <form className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
              <label className="font-semibold">Judul Prestasi</label>
              <input
                type="text"
                placeholder="Masukkan judul prestasi"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={prestasiData.nama_lomba}
                onChange={(e) =>
                  setPrestasiData({
                    ...prestasiData,
                    nama_lomba: e.target.value,
                  })
                }
                required
              />

              <label className="font-semibold">Juara</label>
              <input
                type="number"
                placeholder="Masukkan Juara Berapa"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={prestasiData.juara}
                onChange={(e) =>
                  setPrestasiData({ ...prestasiData, juara: e.target.value })
                }
                required
              />

              <label className="font-semibold">Link Bukti Foto</label>
              <input
                type="text"
                placeholder="Foto"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={prestasiData.url_foto}
                onChange={(e) =>
                  setPrestasiData({
                    ...prestasiData,
                    url_foto: e.target.value,
                  })
                }
                required
              />
              <label className="font-semibold">Link Bukti Sertifikat</label>
              <input
                type="text"
                placeholder="Sertifikat"
                className="input input-bordered w-full bg-whtprmy input-sm"
                value={prestasiData.url_sertifikat}
                onChange={(e) =>
                  setPrestasiData({
                    ...prestasiData,
                    url_sertifikat: e.target.value,
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
      {isModalMahaVisible && (
        <InputPresMaha prestasiData={prestasiData} onClose={closeAllModals} />
      )}
    </>
  );
};

export default InputPresModal;
