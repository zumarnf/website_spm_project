import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiAcademicCap,
  HiCollection,
  HiUser,
  HiHand,
  HiDocument,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiStar,
} from "react-icons/hi";
import shieldDatabase from "/src/assets/shield-database.svg";

const SidebarMen = () => {
  return (
    <div className="pl-6 py-5 bg-whtprmy h-full">
      {" "}
      {/* Tambahkan h-full */}
      <Sidebar>
        <Sidebar.Logo
          href="#"
          img={shieldDatabase}
          imgAlt="Flowbite logo"
          className="pb-9"
        >
          <div className="text-blckprmy text-3xl">SiPeM</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/home"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiChartPie className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-base">Dashboard</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Collapse
              className="hover:bg-rdprmy hover:text-whtprmy group"
              label={
                <div className="flex items-center">
                  <HiCollection className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-base">Riset</span>
                </div>
              }
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return (
                  <IconComponent
                    aria-hidden
                    className={`h-6 w-6 text-blckprmy hover:text-whtprmy ${
                      theme.label.icon.open[open ? "on" : "off"]
                    }`}
                  />
                );
              }}
            >
              <Sidebar.Item
                href="/penelitian"
                className="hover:bg-rdprmy hover:text-whtprmy group"
              >
                <div className="flex flex-row">
                  <HiDocument className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-base">Penelitian</span>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                className="hover:bg-rdprmy hover:text-whtprmy group"
              >
                <div className="flex flex-row">
                  <HiHand className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-base">Pengabdian</span>
                </div>
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiAcademicCap className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-base">Mahasiswa</span>
              </div>
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiUser className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-base">Dosen</span>
              </div>
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiStar className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-base">Prestasi</span>
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarMen;
