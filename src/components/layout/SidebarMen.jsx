import { useLocation } from "react-router-dom";
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
import { useState, useEffect } from "react";

const SidebarMen = () => {
  const location = useLocation();

  // State untuk mengelola apakah kategori Riset terbuka
  const [isRisetOpen, setIsRisetOpen] = useState(false);

  // Fungsi untuk memeriksa apakah suatu link aktif
  const isActive = (pathname, href) => {
    return pathname === href ? "bg-rdprmy text-whtprmy" : "";
  };

  // UseEffect untuk mengatur visibilitas kategori Riset berdasarkan halaman yang aktif
  useEffect(() => {
    // Jika halaman aktif adalah bagian dari kategori Riset, buka kategori
    if (
      location.pathname === "/penelitian" ||
      location.pathname === "/pengabdian"
    ) {
      setIsRisetOpen(true);
    } else {
      setIsRisetOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="pl-6 py-5 bg-whtprmy h-full">
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
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/home"
              )}`}
            >
              <div className="flex flex-row">
                <HiChartPie
                  className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                    location.pathname,
                    "/home"
                  )}`}
                />
                <span className="text-base">Dashboard</span>
              </div>
            </Sidebar.Item>

            {/* Kategori Riset */}
            <Sidebar.Collapse
              className="hover:bg-rdprmy hover:text-whtprmy group"
              label={
                <div className="flex items-center">
                  <HiCollection className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-base">Riset</span>
                </div>
              }
              open={isRisetOpen} // Tetap buka jika isRisetOpen true
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
                className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                  location.pathname,
                  "/penelitian"
                )}`}
              >
                <div className="flex flex-row">
                  <HiDocument
                    className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                      location.pathname,
                      "/penelitian"
                    )}`}
                  />
                  <span className="text-base">Penelitian</span>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="/pengabdian"
                className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                  location.pathname,
                  "/pengabdian"
                )}`}
              >
                <div className="flex flex-row">
                  <HiHand
                    className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                      location.pathname,
                      "/pengabdian"
                    )}`}
                  />
                  <span className="text-base">Pengabdian</span>
                </div>
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item
              href="/mahasiswa"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/mahasiswa"
              )}`}
            >
              <div className="flex flex-row">
                <HiAcademicCap className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-base">Mahasiswa</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="/dosen"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/dosen"
              )}`}
            >
              <div className="flex flex-row">
                <HiUser className="h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-base">Dosen</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="/penelitian-unggulan"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/penelitian-unggulan"
              )}`}
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
