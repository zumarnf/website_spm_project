import { HiArrowRight } from "react-icons/hi"; // Menggunakan react-icons untuk panah
import { FaBook, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link untuk navigasi
import ContainerProfile from "./ContainerProfile";

const CardItem = ({ title, number, Icon, link }) => (
  <div className="flex justify-between items-center w-72 h-36 border rounded-lg p-7 shadow-md">
    <div>
      <h2 className="text-lg font-semibold mb-2 pb-5">{title}</h2>
      <div className="flex items-center">
        <Icon className="text-4xl mr-3" />{" "}
        <span className="text-3xl font-bold">{number}</span>
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
    <div className="h-full flex flex-col">
      <ContainerProfile />
      <div className="h-full w-full border border-blckprmy rounded-xl p-4">
        <div className="px-7 py-4">
          <h1 className="text-3xl font-extrabold mb-7 text-blckprmy">
            Dashboard
          </h1>
        </div>
        <div className="flex justify-between px-7">
          <CardItem
            title="Penelitian"
            number={190}
            Icon={FaBook}
            link="/penelitian"
          />
          <CardItem
            title="Pengguna"
            number={150}
            Icon={FaUser}
            link="/pengguna"
          />
          <CardItem
            title="Penjualan"
            number={200}
            Icon={FaShoppingCart}
            link="/penjualan"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
