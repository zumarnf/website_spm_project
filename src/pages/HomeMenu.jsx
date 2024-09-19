import Dasboard from "../components/Dasboard";
import SidebarMen from "../components/SidebarMen";

const HomeMenu = () => {
  return (
    <>
      <div className="flex flex-row w-screen h-screen bg-whtprmy">
        <div className="basis-1/4">
          <SidebarMen />
        </div>
        <div className="basis-3/4">
          <Dasboard />
        </div>
      </div>
    </>
  );
};

export default HomeMenu;
