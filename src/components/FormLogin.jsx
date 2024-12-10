import { useState } from "react";
import axios from "axios";
import BtnLogin from "./button/BtnLogin";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Kirim permintaan login
      const response = await axios.post("http://127.0.0.1:8000/api/v1/login", {
        email,
        password,
      });

      // Validasi respons
      if (response.status === 200 && response.data.data) {
        const { token, role } = response.data.data;

        // Simpan token dan role di localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Log untuk verifikasi
        console.log("Token tersimpan:", localStorage.getItem("token"));
        console.log("Role tersimpan:", localStorage.getItem("role"));

        // Arahkan pengguna ke halaman home
        navigate("/home");
      } else {
        setError("Login gagal, coba lagi.");
      }
    } catch (err) {
      // Tangani kesalahan
      console.error("Error:", err);
      setError(
        err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-36">
      <form onSubmit={handleLogin}>
        <label className="input flex items-center gap-2 mb-7 border border-blckprmy bg-whtprmy">
          <input
            type="email"
            className="grow text-blckprmy placeholder-gray-400 focus:outline-none focus:ring-0 border-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="input flex items-center gap-2 mb-7 border border-blckprmy bg-whtprmy">
          <input
            type="password"
            className="grow text-blckprmy placeholder-gray-400 focus:outline-none focus:ring-0 border-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-center">
          <BtnLogin />
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
