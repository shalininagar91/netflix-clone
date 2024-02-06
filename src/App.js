import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { authAction } from "./components/Login";
import { logoutAction } from "./components/Logout";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import React from "react";

const Login = React.lazy(() =>
  import(/* webpackChunkName: 'login' */ "./components/Login")
);
const Browse = React.lazy(() =>
  import(/* webpackChunkName: 'browse' */ "./components/Browse")
);
const Search = React.lazy(() =>
  import(/* webpackChunkName: 'search' */ "./components/Search")
);

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "auth", element: <Login />, action: authAction },
      { path: "logout", action: logoutAction },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <RouterProvider router={BrowserRouter} />
    </Provider>
  );
}

export default App;
