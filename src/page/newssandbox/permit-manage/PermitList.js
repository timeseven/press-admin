import { Button, Table, Tag, Modal, Popover, Switch } from "antd";
import { useEffect, useState } from "react";
import { deleteChildren, deletePermit, editChildren, editPermit, getSideMenu } from "../../../api";
import { IconList } from "../../../const/IconList";
const { confirm } = Modal;

const PermitList = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getSideMenu();
        res.data &&
          res.data.forEach((item) => {
            if (item.children.length === 0) {
              item.children = "";
            }
          }); // don't show + on Home Page
        setDataSource(res && res.data);
      } catch (error) {}
    })();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "Permission Name",
      dataIndex: "title",
    },
    {
      title: "Permission Path",
      dataIndex: "key",
      render: (key) => {
        return <Tag color="volcano">{key}</Tag>;
      },
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <div>
            <span style={{ marginRight: "10px" }}>
              <Button danger shape="circle" icon={IconList["/delete"]} onClick={() => confirmMethod(item)}></Button>
            </span>
            <span>
              <Popover
                content={
                  <div style={{ textAlign: "center" }}>
                    <span style={{ marginRight: "5px" }}>Off</span>
                    <Switch checked={item.pagepermission} onChange={() => changePermission(item)}></Switch>
                    <span style={{ marginLeft: "5px" }}>On</span>
                  </div>
                }
                title="Page Permission"
                trigger={item.pagepermission === undefined ? "" : "click"}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={IconList["/edit"]}
                  disabled={item.pagepermission === undefined}
                ></Button>
              </Popover>
            </span>
          </div>
        );
      },
    },
  ];

  // confirm before delete
  const confirmMethod = (item) => {
    confirm({
      title: "Do you Want to delete this item?",
      icon: IconList["/exclamation"],
      onOk() {
        deleteMehod(item);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteMehod = (item) => {
    if (item.grade === 1) {
      //delete grade 1 data
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      deletePermit(item.id);
    } else {
      //delete grade 2 children data
      console.log(item.permitId);
      let list = dataSource.filter((data) => data.id === item.permitId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setDataSource([...dataSource]); // grade 1 data didn't change. therefore we have to set the changed children data
      deleteChildren(item.id);
      console.log(list, "xxxx", dataSource);
    }
  };

  // change page permission
  const changePermission = (item) => {
    item.pagepermission = item.pagepermission === 1 ? 0 : 1;
    // sync dataSource
    setDataSource([...dataSource]);
    console.log("changePermission", item);
    // patch to backend
    if (item.grade === 1) {
      editPermit(item.id, { pagepermission: item.pagepermission });
    } else {
      editChildren(item.id, { pagepermission: item.pagepermission });
    }
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default PermitList;
