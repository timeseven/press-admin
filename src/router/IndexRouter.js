import Login from "../page/login/Login";
import NewsSandBox, { newsSandBoxLoader } from "../page/newssandbox/NewsSandBox";
import Home from "../page/newssandbox/home/Home";
import UserList from "../page/newssandbox/user-manage/UserList";
import RoleList from "../page/newssandbox/permit-manage/RoleList";
import PermitList from "../page/newssandbox/permit-manage/PermitList";
import NoPermit from "../page/newssandbox/no-permit/NoPermit";

import { createHashRouter } from "react-router-dom";

const IndexRouter = createHashRouter([
  {
    path: "/",
    element: <NewsSandBox />,
    loader: newsSandBoxLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/user-manage/list",
        element: <UserList />,
      },
      {
        path: "/permit-manage/role/list",
        element: <RoleList />,
      },
      {
        path: "/permit-manage/permit/list",
        element: <PermitList />,
      },
      {
        path: "*",
        element: <NoPermit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default IndexRouter;
