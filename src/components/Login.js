import { Link } from "react-router-dom";
import netflixHeroImage from "../assets/netflixHeroImage.jpg";
import Header from "./Header";

const Login = () => {
  return (
    <div className="h-screen overflow-hidden w-full">
      <div className="h-full w-full absolute top-0 -z-10 overflow-hidden">
        <img className="object-cover " src={netflixHeroImage} alt="" />
      </div>

      <div className="absolute top-0 -z-10 bg-black bg-opacity-50 h-full w-full"></div>
      <Header />
      <div className="bg-black bg-opacity-80 rounded-md flex flex-col gap-10 m-auto max-w-md p-16">
        <h2 className="text-3xl text-white font-semibold">Sign In</h2>
        <div className="flex flex-col gap-4">
          <input
            className="bg-gray-700 text-gray-400 rounded-md p-3"
            type="email"
            required
            placeholder="Email or phone number"
          />
          <input
            className="bg-gray-700 text-gray-400 rounded-md p-3"
            type="password"
            required
            placeholder="Password"
          />
        </div>

        <button className="text-white bg-red-600 rounded-md p-3 font-semibold">
          Sign In
        </button>
        <p>
          <span className="text-gray-400">New to Netflix?</span>{" "}
          <Link className="text-white">Sign up now.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
