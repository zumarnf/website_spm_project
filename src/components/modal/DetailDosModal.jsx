import React from "react";

const DetailDosModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <dialog open className="modal modal-bottom sm:modal-middle z-50">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DetailDosModal;
