import React from "react";
import { useNavigate } from "react-router-dom";

const BtnModalMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    document.getElementById("my_modal_3").close();
  };
  return (
    <>
      <div className="flex justify-center gap-4 pt-7">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-8 rounded-md"
        >
          Ya
        </button>
        <button
          onClick={handleCloseModal}
          className="bg-gray-300 text-black py-2 px-6 rounded-md"
        >
          Tidak
        </button>
      </div>
    </>
  );
};

export default BtnModalMenu;
