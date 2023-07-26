import "./SideMenu.css";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, KeyOutlined, TeamOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const getItem = (label, key, icon, children, type) => {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
};

const SideMenu = () => {
  const navigate = useNavigate();
  const items = [
    getItem("Home Page", "/", <HomeOutlined />),
    getItem("User", "/user-manage", <UserOutlined />, [getItem("User List", "/user-manage/list", <TeamOutlined />)]),
    getItem("Permission", "/permit-manage", <KeyOutlined />, [
      getItem("Role List", "/permit-manage/role/list"),
      getItem("Permission List", "/permit-manage/permit/list"),
    ]),
  ];
  const onClick = (e) => {
    console.log("click ", e);
    navigate(e.key);
  };
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">Press Administration</div>
      <Menu onClick={onClick} theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={items} />
    </Sider>
  );
};

export default SideMenu;
