import { useNavigate } from "react-router-dom";

const BtnLogin = ({ onClick }) => {
  return (
    <>
      <button
        className="btn bg-rdprmy text-whtprmy border-none px-32"
        onClick={onClick} // Panggil fungsi login dari props
      >
        Login
      </button>
    </>
  );
};

export default BtnLogin;
