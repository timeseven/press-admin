import "./SideMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { IconList } from "../../const/IconList";
import { useEffect, useState } from "react";
import { getSideMenu } from "../../api";
import { RouterCheck } from "../../utils/RouterCheck";
import { connect } from "react-redux";

const { Sider } = Layout;

const SideMenu = (props) => {
  const navigate = useNavigate();
  let location = useLocation();
  const selectKeys = [location.pathname]; // keep sidemenu is selected after refreshing the page
  const openKeys = ["/" + location.pathname.split("/")[1]]; // keep the parent of the selected sidemenu open
  const [items, setItems] = useState([]);

  const onClick = (e) => {
    navigate(e.key);
  };
  useEffect(() => {
    // get the permits and the relevant children data and re-assembly them
    (async function getData() {
      let data = [];
      const {
        role: { permits },
      } = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await getSideMenu();
        data = res.data?.map((item) => {
          return (
            RouterCheck(item, permits, true) && {
              label: item.title,
              key: item.key,
              icon: IconList[item.key],
              children:
                item.children.length > 0 &&
                item.children.map((data) => {
                  return (
                    RouterCheck(data, permits, true) && {
                      id: data.id,
                      label: data.title,
                      key: data.key,
                      permitid: data.permitId,
                      grade: data.grade,
                      icon: IconList[data.key],
                      pagepermission: data.pagepermission,
                    }
                  );
                }),
              id: item.id,
              grade: item.grade,
              pagepermission: item.pagepermission,
            }
          );
        });
        setItems(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">News Administration</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <Menu
            onClick={onClick}
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
            items={items}
          />
        </div>
      </div>
    </Sider>
  );
};

const mapStateToProps = ({ CollapsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed,
  };
};

export default connect(mapStateToProps)(SideMenu);
