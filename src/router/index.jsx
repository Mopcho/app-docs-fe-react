import { useRoutes } from "react-router-dom";
import TopMenu from "../layouts/top-menu/Main";
import FileManager from "../views/file-manager";
import Login from "../views/login/Main";
// import Register from "../views/register/Main";
import ErrorPage from "../views/error-page/Main";
import { WaitForAuthorizedService } from "../service"
import {Logout} from '../components/logout/logout'

function Router() {
  const routes = [
    {
      path: "/",
      element: <WaitForAuthorizedService><TopMenu /></WaitForAuthorizedService>,
      children: [
        {
          path: "/",
          element: <FileManager />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/:contentType",
      element: <WaitForAuthorizedService><TopMenu /></WaitForAuthorizedService>,
      children: [
        {
          path: "/:contentType",
          element: <FileManager />,
        },
      ],
    },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
