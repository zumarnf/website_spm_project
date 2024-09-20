import BtnLogin from "./button/BtnLogin";

const FormLogin = () => {
  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl font-extrabold mb-7 text-blckprmy">Login</h1>
        </div>
        <label className="input flex items-center gap-2 mb-7 border border-blckprmy bg-whtprmy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 text-blckprmy"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow text-blckprmy placeholder-gray-400 focus:outline-none focus:ring-0 border-none"
            placeholder="Username"
          />
        </label>
        <label className="input flex items-center gap-2 mb-7 border border-blckprmy bg-whtprmy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 text-blckprmy"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow text-blckprmy placeholder-gray-400 focus:outline-none focus:ring-0 border-none"
            placeholder="Password"
          />
        </label>
        <div className="flex justify-center">
          <BtnLogin />
        </div>
      </div>
    </>
  );
};

export default FormLogin;
