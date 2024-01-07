import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
