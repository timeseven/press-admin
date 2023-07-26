import SideMenu from "../../components/newssandbox/SideMenu";
import TopHeader from "../../components/newssandbox/TopHeader";
import { Outlet, redirect } from "react-router-dom";
import { Layout, theme } from "antd";
import "./NewsSandBox.css";

const { Content } = Layout;

const NewsSandBox = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
const newsSandBoxLoader = () => {
  if (!localStorage.getItem("token")) {
    console.log("no authority", localStorage.getItem("token"));
    return redirect("/login");
  }
  return null;
};

export { newsSandBoxLoader };
export default NewsSandBox;
