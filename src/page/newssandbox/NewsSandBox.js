import SideMenu from "../../components/newssandbox/SideMenu";
import TopHeader from "../../components/newssandbox/TopHeader";
import { Outlet, redirect } from "react-router-dom";
import { Layout, Spin, theme } from "antd";
import "./NewsSandBox.css";
import { connect } from "react-redux";

const { Content } = Layout;

const NewsSandBox = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  console.log("newssandbox");
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
          <Spin tip="Loading..." spinning={props.isLoading}>
            <Outlet />
          </Spin>
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

const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
  return {
    isLoading,
  };
};

export default connect(mapStateToProps)(NewsSandBox);
