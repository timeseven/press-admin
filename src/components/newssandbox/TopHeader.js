import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Layout, theme, Space, Avatar } from "antd";
import { IconList } from "../../const/IconList";
import { connect } from "react-redux";

const { Header } = Layout;
const { useToken } = theme;

const TopHeader = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = useToken();
  const {
    role: { roleName },
    username,
  } = JSON.parse(localStorage.getItem("token"));

  const items = [
    {
      key: "/home",
      label: `${roleName}`,
    },
    {
      key: "/login",
      danger: true,
      label: "Exit",
    },
  ];

  const onClick = (e) => {
    navigate(e.key);
    if (e.key === "/login") {
      localStorage.clear();
    }
  };

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={props.isCollapsed ? IconList["/menuunfold"] : IconList["/menufold"]}
        onClick={() => {
          props.changeCollapsed();
        }}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div style={{ float: "right" }}>
        <span>
          Welcome <span style={{ color: "blue" }}>{username}</span> Back
        </span>
        <Dropdown menu={{ items, onClick }} sizePopupArrow="105">
          <a onClick={(e) => e.preventDefault()} href={{}} style={{ padding: "0 15px" }}>
            <Space>
              <Avatar size="large" icon={IconList["/user-manage"]} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

/*
  connect(
    // mapStateToProps
    // mapDispatchToProps
  )(components)

*/

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed,
  };
};

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: "change_collapsed",
    };
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);
