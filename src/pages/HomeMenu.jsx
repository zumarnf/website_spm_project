import Dasboard from "../components/Dasboard";
import SidebarMen from "../components/layout/SidebarMen";

const HomeMenu = () => {
  return (
    <>
      <div className="flex w-screen h-screen bg-whtprmy overflow-hidden">
        <div className="basis-1/4 h-full">
          <SidebarMen />
        </div>
        <div className="basis-3/4 pr-8 pt-2 pb-5 h-full">
          <Dasboard />
        </div>
      </div>
    </>
  );
};

export default HomeMenu;
