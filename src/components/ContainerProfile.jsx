import React from "react";
import { FaCog } from "react-icons/fa"; // Import ikon setting dari react-icons

const ContainerProfile = () => {
  return (
    <>
      <div className="flex flex-row w-full pt-6 pb-6 items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col justify-center pl-2">
            <div className="text-base font-bold text-blckprmy">
              Teknologi Informasi
            </div>
          </div>
        </div>
        <div className="pr-5">
          {/* Kotak rounded kecil dengan icon setting */}
          <button
            className="bg-rdprmy p-2 rounded-full"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <FaCog className="text-whtprmy text-lg" /> {/* Icon Setting */}
          </button>
        </div>
      </div>
    </>
  );
};

export default ContainerProfile;
