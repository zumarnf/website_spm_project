import { useEffect, useState } from "react";
import {
  HiArrowRight,
  HiStar,
  HiAcademicCap,
  HiUser,
  HiHand,
  HiDocument,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import ContainerProfile from "./ContainerProfile";
import MenuModal from "./modal/MenuModal";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const CardItem = ({ title, number, Icon, link, iconColor, loading, error }) => (
  <div className="flex flex-col md:flex-row justify-between items-center w-full h-full border rounded-2xl p-3 md:p-7 shadow-md bg-whtprmy">
    <div>
      <h2 className="text-md md:text-xl font-semibold text-blckprmy">
        {title}
      </h2>
      <div className="flex items-center mt-2 md:mt-7">
        {loading ? (
          <span className="text-blue-500 text-lg">Loading...</span>
        ) : error ? (
          <span className="text-red-500 text-lg">Error</span>
        ) : (
          <>
            <Icon className={`text-xl md:text-3xl mr-2 md:mr-6 ${iconColor}`} />
            <span className="text-xl md:text-3xl font-bold text-blckprmy">
              {number}
            </span>
          </>
        )}
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
  const [counts, setCounts] = useState({
    penelitian: { count: 0, loading: true, error: false },
    publikasi: { count: 0, loading: true, error: false },
    dosen: { count: 0, loading: true, error: false },
    mahasiswa: { count: 0, loading: true, error: false },
    pengabdian: { count: 0, loading: true, error: false },
    prestasi: { count: 0, loading: true, error: false },
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login.");
      navigate("/");
      return;
    }

    const endpoints = [
      { key: "penelitian", url: `${API_BASE_URL}/penelitian` },
      { key: "publikasi", url: `${API_BASE_URL}/publikasi` },
      { key: "dosen", url: `${API_BASE_URL}/dosen` },
      { key: "mahasiswa", url: `${API_BASE_URL}/mahasiswa` },
      { key: "pengabdian", url: `${API_BASE_URL}/pengabdian` },
      { key: "prestasi", url: `${API_BASE_URL}/prestasi` },
    ];

    endpoints.forEach(async (endpoint) => {
      try {
        const response = await axios.get(endpoint.url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200 && response.data.data) {
          setCounts((prev) => ({
            ...prev,
            [endpoint.key]: {
              count: response.data.data.length,
              loading: false,
              error: false,
            },
          }));
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        console.error(`Error fetching ${endpoint.key}:`, err);
        setCounts((prev) => ({
          ...prev,
          [endpoint.key]: {
            count: 0,
            loading: false,
            error: true,
          },
        }));
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full flex flex-col px-4 md:px-8 lg:px-10 pb-5 overflow-auto">
      <ContainerProfile />
      <MenuModal />
      <div className="w-full border border-blckprmy rounded-xl p-4 md:p-6 lg:p-8 bg-whtprmy shadow-lg">
        <div className="px-4 md:px-7 py-4">
          <h1 className="text-lg md:text-2xl font-bold pb-5 md:pb-7 text-blckprmy">
            Dashboard
          </h1>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10">
          <CardItem
            title="Penelitian"
            number={counts.penelitian.count}
            Icon={HiDocument}
            link="/penelitian"
            iconColor="text-blckprmy"
            loading={counts.penelitian.loading}
            error={counts.penelitian.error}
          />
          <CardItem
            title="Publikasi"
            number={counts.publikasi.count}
            Icon={HiDocument}
            link="/publikasi"
            iconColor="text-blckprmy"
            loading={counts.publikasi.loading}
            error={counts.publikasi.error}
          />
          <CardItem
            title="Dosen"
            number={counts.dosen.count}
            Icon={HiUser}
            link="/dosen"
            iconColor="text-blckprmy"
            loading={counts.dosen.loading}
            error={counts.dosen.error}
          />
          <CardItem
            title="Mahasiswa"
            number={counts.mahasiswa.count}
            Icon={HiAcademicCap}
            link="/mahasiswa"
            iconColor="text-blckprmy"
            loading={counts.mahasiswa.loading}
            error={counts.mahasiswa.error}
          />
          <CardItem
            title="Pengabdian"
            number={counts.pengabdian.count}
            Icon={HiHand}
            link="/pengabdian"
            iconColor="text-blckprmy"
            loading={counts.pengabdian.loading}
            error={counts.pengabdian.error}
          />
          <CardItem
            title="Prestasi"
            number={counts.prestasi.count}
            Icon={HiStar}
            link="/prestasi"
            iconColor="text-blckprmy"
            loading={counts.prestasi.loading}
            error={counts.prestasi.error}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
