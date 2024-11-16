import { useState } from "react";
import axios from "axios";
import BtnLogin from "./button/BtnLogin";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/telkom.png";

const FormLogin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Pastikan Anda menggunakan useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log(email, password); // Log email dan password
      const response = await axios.post("http://127.0.0.1:8000/api/v1/login", {
        email: email,
        password: password,
      });

      console.log(response); // Log respons dari API

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (err) {
      console.error(err); // Log error
      setError(
        "Login failed: " + (err.response?.data?.message || "Unknown error")
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
            onChange={(e) => setemail(e.target.value)}
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
          <BtnLogin onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
