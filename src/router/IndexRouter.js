import React from "react";
import { createHashRouter } from "react-router-dom";
import Login from "../page/login/Login";
import NewsSandBox, {
  newsSandBoxLoader,
} from "../page/newssandbox/NewsSandBox";

const IndexRouter = createHashRouter([
  {
    path: "",
    element: <NewsSandBox />,
    loader: newsSandBoxLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default IndexRouter;
