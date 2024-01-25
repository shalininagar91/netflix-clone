import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { addUser, deleteUser } from "../store/userSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, accessToken, photoURL } = user;
        dispatch(addUser({ email, displayName, accessToken, photoURL }));
        navigate("/browse");
      } else {
        dispatch(deleteUser());
        navigate("/auth?mode=login");
      }
    });
  }, [dispatch, navigate]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
