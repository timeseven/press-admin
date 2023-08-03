import "./SideMenu.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { IconList } from "../../const/IconList";
import { useEffect, useState } from "react";
import { getSideMenu } from "../../api";
import { RouterCheck } from "../../utils/RouterCheck";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const { Sider } = Layout;

const SideMenu = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const selectKeys = [location.pathname]; // keep sidemenu is selected after refreshing the page
  const openKeys = ["/" + location.pathname.split("/")[1]]; // keep the parent of the selected sidemenu open
  const [items, setItems] = useState([]);

  const onClick = (e) => {
    NProgress.start();
    navigate(e.key);
    console.log("sidemenu click");
  };
  NProgress.done();
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
            RouterCheck(item, permits) && {
              label: item.title,
              key: item.key,
              icon: IconList[item.key],
              children:
                item.children.length > 0 &&
                item.children.map((data) => {
                  return (
                    RouterCheck(data, permits) && {
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
        console.log("XOXOXOXOXOX", data);
        setItems(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <Sider trigger={null} collapsible collapsed={false}>
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

export default SideMenu;
