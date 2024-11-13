import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [isRisetOpen, setIsRisetOpen] = useState(false);

  const isActive = (pathname, href) => {
    return pathname.startsWith(href) ? "bg-rdprmy text-whtprmy" : "";
  };

  useEffect(() => {
    if (
      location.pathname === "/penelitian" ||
      location.pathname === "/pengabdian" ||
      location.pathname === "/publikasi"
    ) {
      setIsRisetOpen(true);
    } else {
      setIsRisetOpen(false);
    }
  }, [location.pathname]);

  const handleClick = (e, href) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div className="pl-6 py-5 bg-whtprmy h-full">
      <Sidebar>
        <Sidebar.Logo
          href="#"
          img={shieldDatabase}
          imgAlt="Flowbite logo"
          className="pb-9"
        >
          <div className="text-blckprmy text-3xl">Simda</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="/home"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/home"
              )}`}
              onClick={(e) => handleClick(e, "/home")}
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
              open={isRisetOpen}
            >
              <Sidebar.Item
                href="/penelitian"
                className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                  location.pathname,
                  "/penelitian"
                )}`}
                onClick={(e) => handleClick(e, "/penelitian")}
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
                onClick={(e) => handleClick(e, "/pengabdian")}
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
              <Sidebar.Item
                href="/publikasi"
                className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                  location.pathname,
                  "/publikasi"
                )}`}
                onClick={(e) => handleClick(e, "/publikasi")}
              >
                <div className="flex flex-row">
                  <HiDocument
                    className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                      location.pathname,
                      "/publikasi"
                    )}`}
                  />
                  <span className="text-base">Publikasi</span>
                </div>
              </Sidebar.Item>
            </Sidebar.Collapse>

            {/* Additional items */}
            <Sidebar.Item
              href="/mahasiswa"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/mahasiswa"
              )}`}
              onClick={(e) => handleClick(e, "/mahasiswa")}
            >
              <div className="flex flex-row">
                <HiAcademicCap
                  className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                    location.pathname,
                    "/mahasiswa"
                  )}`}
                />
                <span className="text-base">Mahasiswa</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="/dosen"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/dosen"
              )}`}
              onClick={(e) => handleClick(e, "/dosen")}
            >
              <div className="flex flex-row">
                <HiUser
                  className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                    location.pathname,
                    "/dosen"
                  )}`}
                />
                <span className="text-base">Dosen</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Item
              href="/penelitian-unggulan"
              className={`hover:bg-rdprmy hover:text-whtprmy group ${isActive(
                location.pathname,
                "/prestasi"
              )}`}
              onClick={(e) => handleClick(e, "/prestasi")}
            >
              <div className="flex flex-row">
                <HiStar
                  className={`h-6 w-6 text-blckprmy pr-2 group-hover:text-whtprmy ${isActive(
                    location.pathname,
                    "/prestasi"
                  )}`}
                />
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
