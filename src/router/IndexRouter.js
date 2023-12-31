import { LocalRouterMap } from "../const/LocalRouterMap";
import { createHashRouter } from "react-router-dom";
import { NewsSandBoxLoader } from "../page/newssandbox/NewsSandBox";
import { useState, useEffect } from "react";
import { getChildren, getPermit } from "../api";
import { RouterCheck } from "../utils/RouterCheck";
import Login from "../page/login/Login";
import News from "../page/news/News";
import Details from "../page/news/Details";

const IndexRouter = () => {
  const [dynamicRoutes, setDynamicRoutes] = useState(
    JSON.parse(localStorage.getItem("dynamicRoutes"))?.map((item) => {
      return {
        path: item.path,
        element: LocalRouterMap[item.path],
      };
    }) || []
  );
  const [routesData, setRoutesData] = useState([]);
  const createDynamicRoutes = (permissionData) => {
    // Process the permissionsData to create the dynamic router configuration
    console.log("creteDynamicROutes:", routesData, permissionData);
    const filterRouter = routesData
      ?.filter((item) => {
        // console.log("filter before", RouterCheck(item, permissionData), !!LocalRouterMap[item.key], item.key);
        return RouterCheck(item, permissionData, false) && !!LocalRouterMap[item.key];
      })
      .map((item) => {
        // console.log("after filter", LocalRouterMap, item.key, LocalRouterMap[`${item.key}`], typeof item.key);
        return {
          path: item.key,
          element: LocalRouterMap[item.key],
        };
      });

    setDynamicRoutes(filterRouter);
    console.log("filterROuter", filterRouter);
    localStorage.setItem("dynamicRoutes", JSON.stringify(filterRouter));
  };

  // get data from login
  const handleLogin = (routerList) => {
    // console.log("handleLogin");
    const {
      role: { permits },
    } = routerList;
    createDynamicRoutes(permits);
  };
  useEffect(() => {
    (async function GetData() {
      try {
        const childList = await getChildren();
        const permitList = await getPermit();
        setRoutesData(permitList?.data.concat(childList?.data));
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);
  const routes = [
    {
      path: "/",
      element: LocalRouterMap["/"],
      loader: NewsSandBoxLoader,
      children: [
        ...dynamicRoutes,
        {
          path: "*",
          element: LocalRouterMap["*"],
        },
      ],
    },
    {
      path: "/login",
      element: <Login onLoginSuccess={handleLogin} />,
    },
    // guest mode view pages
    {
      path: "/news/secret=Even2023",
      element: <News />,
    },
    {
      path: "/details/:id",
      element: <Details />,
    },
  ];
  return createHashRouter(routes);
};

export default IndexRouter;
