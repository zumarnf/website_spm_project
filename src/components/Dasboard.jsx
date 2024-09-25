import { HiArrowRight } from "react-icons/hi";
import {
  HiStar,
  HiAcademicCap,
  HiUser,
  HiHand,
  HiDocument,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";

const CardItem = ({ title, number, Icon, link, iconColor }) => (
  <div className="flex justify-between items-center w-64 h-36 border rounded-2xl p-7 shadow-md">
    <div>
      <h2 className="text-xl font-semibold pb-7 text-blckprmy">{title}</h2>
      <div className="flex items-center">
        <Icon className={`text-3xl mr-6 ${iconColor}`} />{" "}
        <span className="text-3xl font-bold text-blckprmy">{number}</span>
      </div>
    </div>
    <div className="text-rdprmy">
      <Link to={link}>
        <HiArrowRight className="text-4xl cursor-pointer" />
      </Link>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col pr-5 pb-5">
      <ContainerProfile />
      <MenuModal />
      <div className="h-full w-full border border-blckprmy rounded-xl p-4">
        <div className="px-7 py-4">
          <h1 className="text-2xl font-bold pb-7 text-blckprmy">Dashboard</h1>
        </div>
        {/* Menggunakan grid untuk tata letak kartu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-7">
          <CardItem
            title="Penelitian"
            number={190}
            Icon={HiDocument}
            link="/penelitian"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Dosen"
            number={150}
            Icon={HiUser}
            link="/pengguna"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Mahasiswa"
            number={200}
            Icon={HiAcademicCap}
            link="/penjualan"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Pengabdian"
            number={200}
            Icon={HiHand}
            link="/penjualan"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Prestasi"
            number={200}
            Icon={HiStar}
            link="/penjualan"
            iconColor="text-blckprmy"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
