import FormLogin from "../components/FormLogin";
import LogoLogin from "../components/LogoLogin";
import logo from "/src/assets/telkom.png";

const LoginPage = () => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      {/* Bagian kiri hanya ditampilkan di desktop */}
      <div className="hidden md:flex basis-3/4 bg-gray-950 opacity-90 justify-center items-center">
        <div className="flex flex-row pb-10 items-center">
          <div className="flex items-center justify-center px-4">
            <LogoLogin />
          </div>
          <div>
            <div className="text-5xl font-bold text-whtprmy ">SIMDA</div>
            <div className="text-xl text-whtprmy pb-3">
              (Sistem Informasi Manajemen Data Akreditasi)
            </div>
            <div className="text-lg text-gray-300">
              Universitas Telkom Kampus Surabaya
            </div>
          </div>
        </div>
      </div>

      {/* Bagian kanan selalu ditampilkan */}
      <div className="flex flex-col basis-full md:basis-1/4 bg-whtprmy justify-center items-center">
        {/* Teks hanya untuk mobile */}
        <div className="md:flex items-center hidden pb-6">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Login Logo" className="w-28 h-28" />
          </div>
        </div>
        <div className="flex flex-col items-center text-center md:hidden pb-8">
          <div className="text-3xl font-bold text-blckprmy pb-4">SIMDA</div>
          <div className="text-sm text-gray-600 pb-4">
            (Sistem Informasi Manajemen Data Akreditasi)
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center md:hidden">
              <img src={logo} alt="Login Logo" className="w-28 h-28" />
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Universitas Telkom Kampus Surabaya
          </div>
        </div>
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage;
