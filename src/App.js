import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Login from "./components/Login";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ index: true, element: <Login /> }],
  },
]);

function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
