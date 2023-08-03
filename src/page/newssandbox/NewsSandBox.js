import SideMenu from "../../components/newssandbox/SideMenu";
import TopHeader from "../../components/newssandbox/TopHeader";
import { Outlet, redirect } from "react-router-dom";
import { Layout, theme } from "antd";
import "./NewsSandBox.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { Content } = Layout;

const NewsSandBox = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log("newssandbox");
  NProgress.start();
  return (
    <Layout>
      <SideMenu />
      <Layout>
        <TopHeader />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

// News SandBox loader
const NewsSandBoxLoader = (param) => {
  if (!localStorage.getItem("token")) {
    console.log("no authority", localStorage.getItem("token"));
    return redirect("/login");
  }
  if (param.request.url?.split("/")[3] === "") {
    return redirect("/home");
  }
  console.log("loader", param);
  return null;
};

export { NewsSandBoxLoader };
export default NewsSandBox;
