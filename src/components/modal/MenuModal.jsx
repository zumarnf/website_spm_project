import React from "react";
import BtnModalMenu from "../button/BtnModalMenu";

const MenuModal = () => {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-whtprmy">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-blckprmy">
            Apakah Anda ingin keluar?
          </h3>
          <BtnModalMenu />
        </div>
      </dialog>
    </>
  );
};

export default MenuModal;
