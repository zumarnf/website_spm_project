import FormLogin from "../components/FormLogin";
import LogoLogin from "../components/LogoLogin";

const LoginPage = () => {
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="basis-1/2 bg-rdprmy bg-opacity-70 flex justify-center items-center">
        <LogoLogin />
      </div>
      <div className="basis-1/2 bg-whtprmy flex justify-center items-center">
        <FormLogin />
      </div>
    </div>
  );
};

export default LoginPage;
