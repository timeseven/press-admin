import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, theme, Space, Avatar } from "antd";
import { useState } from "react";
const { Header } = Layout;
const { useToken } = theme;

const TopHeader = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = useToken();
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Super Administrator
        </a>
      ),
    },
    {
      key: "2",
      danger: true,
      label: "Exit",
    },
  ];
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div style={{ float: "right" }}>
        <span>Welcome Admin Back</span>
        <Dropdown menu={{ items }} sizePopupArrow="105">
          <a onClick={(e) => e.preventDefault()} href={{}} style={{ padding: "0 15px" }}>
            <Space>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopHeader;
