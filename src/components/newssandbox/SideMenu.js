import "./SideMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { IconList } from "../../const/IconList";
import { useEffect, useState } from "react";
import { getPermit } from "../../api";

const { Sider } = Layout;

const SideMenu = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const selectKeys = [location.pathname]; // keep sidemenu is selected after freshing the page
  const openKeys = ["/" + location.pathname.split("/")[1]]; // keep the parent of the selected sidemenu open
  console.log("uselocation", location);
  const [items, setItem] = useState([]);
  const onClick = (e) => {
    navigate(e.key);
  };
  useEffect(() => {
    (async function getData() {
      let data = [];
      try {
        const res = await getPermit();
        data =
          res.data &&
          res.data.map((item) => {
            return (
              item.pagepermisson === 1 && {
                label: item.title,
                key: item.key,
                icon: IconList[item.key],
                children:
                  item.children.length > 0 &&
                  item.children.map((data) => {
                    return (
                      data.pagepermisson === 1 && {
                        id: data.id,
                        label: data.title,
                        key: data.key,
                        permitid: data.permitId,
                        grade: data.grade,
                        icon: IconList[data.key],
                        pagepermisson: data.pagepermisson,
                      }
                    );
                  }),
                id: item.id,
                grade: item.grade,
                pagepermisson: item.pagepermisson,
              }
            );
          });
        setItem(data);
      } catch (error) {}
    })();
  }, []);
  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", flexDirection: "column" }}>
        <div className="logo">Press Administration</div>
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

export default SideMenu;
