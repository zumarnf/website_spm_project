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
  <div className="flex flex-col md:flex-row justify-between items-center w-full h-full border rounded-2xl p-3 md:p-7 shadow-md bg-whtprmy">
    <div>
      <h2 className="text-md md:text-xl font-semibold text-blckprmy">
        {title}
      </h2>
      <div className="flex items-center mt-2 md:mt-7">
        <Icon className={`text-xl md:text-3xl mr-2 md:mr-6 ${iconColor}`} />
        <span className="text-xl md:text-3xl font-bold text-blckprmy">
          {number}
        </span>
      </div>
    </div>
    <div className="text-rdprmy mt-3 md:mt-0">
      <Link to={link}>
        <HiArrowRight className="text-2xl md:text-4xl cursor-pointer" />
      </Link>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col px-4 md:px-8 lg:px-10 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      {/* Membungkus CardItem dalam kotak responsif */}
      <div className="w-full border border-blckprmy rounded-xl p-4 md:p-6 lg:p-8 bg-whtprmy shadow-lg">
        <div className="px-4 md:px-7 py-4">
          <h1 className="text-lg md:text-2xl font-bold pb-5 md:pb-7 text-blckprmy">
            Dashboard
          </h1>
        </div>
        {/* Menggunakan grid responsif untuk tata letak CardItem */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10">
          <CardItem
            title="Penelitian"
            number={190}
            Icon={HiDocument}
            link="/penelitian"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Publikasi"
            number={190}
            Icon={HiDocument}
            link="/publikasi"
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
            link="/mahasiswa"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Pengabdian"
            number={200}
            Icon={HiHand}
            link="/pengabdian"
            iconColor="text-blckprmy"
          />
          <CardItem
            title="Prestasi"
            number={200}
            Icon={HiStar}
            link="/prestasi"
            iconColor="text-blckprmy"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
