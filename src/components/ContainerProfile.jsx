import React from "react";
import kimmich from "../assets/joshua_kimmich.png";

const ContainerProfile = () => {
  return (
    <>
      <div className="flex flex-row w-full pt-6 pb-3 items-center justify-between">
        <div className="flex items-center">
          <div className="avatar">
            <div className="w-11 rounded-full">
              <img src={kimmich} alt="Joshua Kimmich" />
            </div>
          </div>
          <div className="flex flex-col justify-center pl-4">
            <div className="text-sm font-bold text-blckprmy">
              Joshua Kimmich
            </div>
            <div className="text-sm text-blckprmy">Real Madrid</div>
          </div>
        </div>
        <div className="text-sm font-bold pr-5">Hai</div>
      </div>
    </>
  );
};

export default ContainerProfile;
