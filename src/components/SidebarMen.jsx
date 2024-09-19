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
    <div className="px-10 py-10 bg-whtprmy">
      <Sidebar>
        <Sidebar.Logo
          href="#"
          img={shieldDatabase}
          imgAlt="Flowbite logo"
          className="mb-10"
        >
          <div className="text-blckprmy text-3xl">Flowbite</div>
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {/* Dashboard Item */}
            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiChartPie className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                <span>Dashboard</span>
              </div>
            </Sidebar.Item>

            {/* E-commerce Collapse */}
            <Sidebar.Collapse
              className="hover:bg-rdprmy hover:text-whtprmy group"
              label={
                <div className="flex items-center">
                  <HiShoppingBag className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                  <span>E-commerce</span>
                </div>
              }
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                return (
                  <IconComponent
                    aria-hidden
                    className={`h-6 w-6 text-blckprmy ${
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
                  <HiShoppingBag className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                  <span>Products</span>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                className="hover:bg-rdprmy hover:text-whtprmy group"
              >
                <div className="flex flex-row">
                  <HiShoppingBag className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                  <span>Sales</span>
                </div>
              </Sidebar.Item>
            </Sidebar.Collapse>

            {/* Inbox Item */}

            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiInbox className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                <span>Inbox</span>
              </div>
            </Sidebar.Item>

            {/* Users Item */}
            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiUser className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                <span>Users</span>
              </div>
            </Sidebar.Item>

            {/* Products Item */}
            <Sidebar.Item
              href="#"
              className="hover:bg-rdprmy hover:text-whtprmy group"
            >
              <div className="flex flex-row">
                <HiShoppingBag className="h-6 w-6 text-blckprmy mr-2 group-hover:text-whtprmy" />
                <span>Products</span>
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarMen;
