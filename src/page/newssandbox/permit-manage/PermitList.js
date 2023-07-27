import { Button, Table, Tag, Modal } from "antd";
import { useEffect, useState } from "react";
import { deletePermit, getSideMenu } from "../../../api";
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
            <Button danger shape="circle" icon={IconList["/delete"]} onClick={() => confirmMethod(item)}></Button>
            <Button type="primary" shape="circle" icon={IconList["/edit"]}></Button>
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
      // grade 1 data
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      // deletePermit(item.id);
    } else {
      //grade 2 children data
      console.log(item.permitId);
      let list = dataSource.filter((data) => data.id === item.permitId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      setDataSource([...dataSource]);
      console.log(list, "xxxx", dataSource);
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
