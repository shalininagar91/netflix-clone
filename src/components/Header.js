import netflixLogo from "../assets/Netflix_Logo.png";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-black bg-opacity-50 relative z-20 ">
      <img className="w-[210px]" src={netflixLogo} alt="Netflix logo" />
    </header>
  );
};

export default Header;
