import React, { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";

const ContainerProfile = () => {
  const [role, setRole] = useState("Guest"); // Default role

  useEffect(() => {
    // Ambil role dari localStorage saat komponen dimuat
    const storedRole = localStorage.getItem("role");

    if (storedRole) {
      setRole(storedRole); // Jika role ada di localStorage, set role
    } else {
      setRole("Guest"); // Jika tidak ada role di localStorage, default ke Guest
    }
  }, []);

  // Map role ke teks yang ditampilkan
  const displayRole =
    role === "admin" ? "Admin" : role === "prodi" ? "Prodi" : "Guest";

  return (
    <div className="flex flex-row w-full pt-6 pb-6 items-center justify-between">
      <div className="flex items-center">
        <div className="flex flex-col justify-center pl-2">
          <div className="text-base font-bold text-blckprmy">{displayRole}</div>
        </div>
      </div>
      <div className="pr-5">
        <button
          className="bg-rdprmy p-2 rounded-full"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <FaCog className="text-whtprmy text-lg" />
        </button>
      </div>
    </div>
  );
};

export default ContainerProfile;
