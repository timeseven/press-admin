import { useEffect, useState, useRef } from "react";
import { Button, Table, Modal, Switch } from "antd";
import { deleteChildren, deletePermit, getUser, getRegion, getRole } from "../../../api";
import { IconList } from "../../../const/IconList";
import UserForm from "../../../components/user-manage/UserForm";
const { confirm } = Modal;

const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const addForm = useRef();
  // get user info
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getUser();
        setDataSource(res?.data);
      } catch (error) {}
    })();
  }, []);

  // get role info
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getRole();
        setRoleList(res?.data);
      } catch (error) {}
    })();
  }, []);
  // get region info
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getRegion();
        setRegionList(res?.data);
      } catch (error) {}
    })();
  }, []);

  const columns = [
    {
      title: "Region",
      dataIndex: "region",
      render: (region) => {
        return <b>{region === "" ? "Global" : region}</b>;
      },
    },
    {
      title: "Role Name",
      dataIndex: "role",
      render: (role) => {
        return role?.roleName;
      },
    },
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "Status",
      dataIndex: "roleState",
      render: (roleState, item) => {
        return <Switch checked={roleState} disabled={item.default}></Switch>;
      },
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <div>
            <span style={{ marginRight: "10px" }}>
              <Button
                danger
                shape="circle"
                icon={IconList["/delete"]}
                onClick={() => confirmMethod(item)}
                disabled={item.default}
              ></Button>
            </span>
            <span>
              <Button type="primary" shape="circle" icon={IconList["/edit"]} disabled={item.default}></Button>
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

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add User
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
      />
      <Modal
        open={isModalOpen}
        title="Add User"
        okText="Confirm"
        cancelText="Cancel"
        onCancel={() => {
          setModalOpen(false);
          console.log("cancel");
        }}
        onOk={() => {
          addForm.current
            .validateFields()
            .then((value) => {
              console.log(value, "value");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addForm}></UserForm>
      </Modal>
    </div>
  );
};

export default UserList;
