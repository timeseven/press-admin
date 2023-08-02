import { LocalRouterMap } from "../const/LocalRouterMap";
import { createHashRouter } from "react-router-dom";
import { NewsSandBoxLoader } from "../page/newssandbox/NewsSandBox";
import { useState, useEffect } from "react";
import { getChildren, getPermit } from "../api";
import { RouterCheck } from "../utils/RouterCheck";
import Login from "../page/login/Login";

const IndexRouter = () => {
  console.log(JSON.parse(localStorage.getItem("dynamicRoutes")), "xxxxxxx");
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
    let data = [];
    // Process the permissionsData to create the dynamic router configuration
    // console.log("creteDynamicROutes:", routesData, permissionData);
    data = routesData?.filter((item) => {
      // console.log("filter before", RouterCheck(item, permissionData), !!LocalRouterMap[item.key], item.key);
      return RouterCheck(item, permissionData) && !!LocalRouterMap[item.key];
    });
    // console.log(data, "xxxxxxxxxx");
    const filterRouter = data.map((item) => {
      // console.log("after filter", LocalRouterMap, item.key, LocalRouterMap[`${item.key}`], typeof item.key);
      return {
        path: item.key,
        element: LocalRouterMap[item.key],
      };
    });

    setDynamicRoutes(filterRouter);
    // console.log("filterROuter", filterRouter);
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
  console.log("enter routes");
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
      // children: [
      //   {
      //     path: "/home",
      //     element: LocalRouterMap["/home"],
      //   },
      //   {
      //     path: "/user-manage/list",
      //     element: LocalRouterMap["/user-manage/list"],
      //   },
      //   {
      //     path: "/permit-manage/role/list",
      //     element: LocalRouterMap["/permit-manage/role/list"],
      //   },
      //   {
      //     path: "/permit-manage/permit/list",
      //     element: LocalRouterMap["/permit-manage/permit/list"],
      //   },
      //   {
      //     path: "/news-manage/add",
      //     element: LocalRouterMap["/news-manage/add"],
      //   },
      //   {
      //     path: "/news-manage/draft",
      //     element: LocalRouterMap["/news-manage/draft"],
      //   },
      //   {
      //     path: "/news-manage/category",
      //     element: LocalRouterMap["/news-manage/category"],
      //   },
      //   {
      //     path: "/audit-manage/audit",
      //     element: LocalRouterMap["/audit-manage/audit"],
      //   },
      //   {
      //     path: "/audit-manage/list",
      //     element: LocalRouterMap["/audit-manage/list"],
      //   },
      //   {
      //     path: "/publish-manage/unpublished",
      //     element: LocalRouterMap["/publish-manage/unpublished"],
      //   },
      //   {
      //     path: "/publish-manage/published",
      //     element: LocalRouterMap["/publish-manage/published"],
      //   },
      //   {
      //     path: "/publish-manage/sunset",
      //     element: LocalRouterMap["/publish-manage/sunset"],
      //   },
      //   {
      //     path: "*",
      //     element: LocalRouterMap["*"],
      //   },
      // ],
    },
    {
      path: "/login",
      element: <Login onLoginSuccess={handleLogin} />,
    },
  ];
  return createHashRouter(routes);
};

export default IndexRouter;
