import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BtnModalMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect ke halaman login
    navigate("/");

    // Tutup modal
    document.getElementById("my_modal_3").close();
    toast.success("Berhasil keluar.");
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
