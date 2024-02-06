import { Form, Link } from "react-router-dom";
import netflixLogo from "../assets/Netflix_Logo.png";
import { useSelector } from "react-redux";
import defaultUserIcon from "../assets/defaultUserIcon.png";

const Header = () => {
  const user = useSelector((state) => state.user);
  return (
    <header className="bg-gradient-to-b from-black bg-opacity-50 absolute top-0 w-full flex justify-between px-5 items-center">
      <img className="w-[180px]" src={netflixLogo} alt="Netflix logo" />
      {user && (
        <nav>
          <ul className="flex justify-between gap-3 items-center text-white">
            <li>
              <Link to="/search">🔎 Search</Link>
            </li>
            <li>
              <img
                className="w-8 h-8 rounded-full"
                src={user.photoURL ?? defaultUserIcon}
                alt={user.displayName || "Profile Icon"}
              />
            </li>
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
