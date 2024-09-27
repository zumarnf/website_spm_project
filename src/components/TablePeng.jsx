import React from "react";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import BtnSearchPeng from "./button/BtnSearchPeng";
import SelectPeng from "./button/SelectPeng";
import BtnInputPeng from "./button/BtnInputPeng";

const TablePeng = () => {
  return (
    <>
      <div className="h-full flex flex-col pr-5 pb-5 overflow-auto">
        <ContainerProfile />
        <MenuModal />
        <div className="h-full w-full border border-blckprmy rounded-xl p-4">
          <div className="flex justify-between pb-3">
            <div className="px-7 py-4">
              <h1 className="text-2xl font-bold text-blckprmy">
                Data Penelitian
              </h1>
            </div>
            <div className="flex flex-row gap-3 pr-3 justify-center items-center">
              <BtnInputPeng />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered border-blckprmy bg-whtprmy input-sm w-full max-w-xs"
              />
              <SelectPeng />
              <BtnSearchPeng />
            </div>
          </div>
          <div className="bg-whtprmy px-6">
            <div className="overflow-x-auto text-blckprmy bg-whtprmy">
              <table className="table table-pin-rows-whtprmy ">
                {/* head */}
                <thead className="bg-whtprmy text-blckprmy">
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th>Favorite Color</th>
                    <th>Favorite Color</th>
                    <th>Favorite Color</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist akdbaskdakdaskdaskjdakda</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>
                    <td>Purple</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>
                    <td>Red</td>
                    <td>Blue</td>
                    <td>Blue</td>
                    <td>Blue</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablePeng;
