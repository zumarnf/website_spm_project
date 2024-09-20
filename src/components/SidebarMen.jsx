import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
} from "react-icons/hi";
import shieldDatabase from "../assets/shield-database.svg"; // Pastikan path ini benar

const SidebarMen = () => {
  return (
    <div className="pl-8 py-5 bg-whtprmy h-full">
      {" "}
      {/* Tambahkan h-full */}
      <Sidebar>
        <Sidebar.Logo
          href="#"
          img={shieldDatabase}
          imgAlt="Flowbite logo"
          className="pb-9"
        >
          <div className="text-blckprmy text-2xl">Flowbite</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiChartPie className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-sm">Dashboard</span>
              </div>
            </Sidebar.Item>
            <Sidebar.Collapse
              className="hover:bg-rdprmy hover:text-whtprmy group"
              label={
                <div className="flex items-center">
                  <HiShoppingBag className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-sm">E-commerce</span>
                </div>
              }
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return (
                  <IconComponent
                    aria-hidden
                    className={`h-5 w-5 text-blckprmy ${
                      theme.label.icon.open[open ? "on" : "off"]
                    }`}
                  />
                );
              }}
            >
              <Sidebar.Item
                href="#"
                className="hover:bg-rdprmy hover:text-whtprmy group"
              >
                <div className="flex flex-row">
                  <HiShoppingBag className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-sm">Products</span>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                className="hover:bg-rdprmy hover:text-whtprmy group"
              >
                <div className="flex flex-row">
                  <HiShoppingBag className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                  <span className="text-sm">Sales</span>
                </div>
              </Sidebar.Item>
            </Sidebar.Collapse>

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiInbox className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-sm">Inbox</span>
              </div>
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiUser className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-sm">Users</span>
              </div>
            </Sidebar.Item>

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiShoppingBag className="h-5 w-5 text-blckprmy pr-2 group-hover:text-whtprmy" />
                <span className="text-sm">Products</span>
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarMen;
