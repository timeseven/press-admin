import { useEffect, useState, useRef } from "react";
import { Button, Table, Modal, Switch } from "antd";
import { getUser, addUser, deleteUser, editUser, getRegion, getRole } from "../../../api";
import { IconList } from "../../../const/IconList";
import UserForm from "../../../components/user-manage/UserForm";
import { RoleObj } from "../../../const/RoleObj";
const { confirm } = Modal;

const UserList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isAddOpen, setAddOpen] = useState(false);
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [isUpdateDisabled, setUpdateDisabled] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const addForm = useRef();
  const updateForm = useRef();

  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"));
  console.log("userlist");
  // get user info
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getUser();
        const list = res?.data;
        //if you are super administrator, all data will be shown.
        //if you are field manager, you can only check your data and the data of field editors from your region.
        //field editors can't see the userlist
        setDataSource(
          RoleObj[roleId] === "Super Administrator"
            ? list
            : [
                ...list.filter((item) => item.username === username),
                ...list.filter((item) => item.region === region && RoleObj[item.roleId] === "Field Editor"),
              ]
        );
      } catch (error) {}
    })();
  }, [roleId, region, username]);

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
      filters: [
        {
          text: "Global",
          value: "",
        },
        ...regionList.map((item) => {
          return {
            text: item.title,
            value: item.value,
          };
        }),
      ],
      onFilter: (value, item) => item.region === value,
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
        return <Switch checked={roleState} disabled={item.default} onChange={() => handleChange(item)}></Switch>;
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
              <Button
                type="primary"
                shape="circle"
                icon={IconList["/edit"]}
                disabled={item.default}
                onClick={() => handleUpdate(item)}
              ></Button>
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

  // delete user
  const deleteMehod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    deleteUser(item.id);
  };

  const addFormOk = () => {
    addForm.current
      .validateFields()
      .then((value) => {
        // post to backend, create id
        addUser({ ...value, roleState: true, default: false }).then((res) => {
          setDataSource([...dataSource, { ...res.data, role: roleList.filter((item) => item.id === value.roleId)[0] }]); // update data to page
          setAddOpen(false);
          addForm.current.resetFields(); // reset form
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // change status
  const handleChange = (item) => {
    item.roleState = !item.roleState;
    setDataSource([...dataSource]);
    editUser(item.id, { roleState: item.roleState });
  };

  const handleUpdate = async (item) => {
    await setUpdateOpen(true);
    console.log("isUpdateDisabled when open modal", isUpdateDisabled);
    if (item.roleId === 1) {
      //disabled
      setUpdateDisabled(true);
    } else {
      // cancel disabled
      setUpdateDisabled(false);
    }
    setCurrentUser(item);
    updateForm.current.setFieldsValue(item);
  };

  // update user
  const updateFormOk = () => {
    updateForm.current
      .validateFields()
      .then((value) => {
        setUpdateOpen(false);
        setDataSource(
          dataSource.map((item) => {
            if (item.id === currentUser.id) {
              return {
                ...item,
                ...value,
                role: roleList.filter((item) => item.id === value.roleId)[0],
              };
            }
            return item;
          })
        );
        setUpdateDisabled(!isUpdateDisabled); // reverse value to activate useEffect in UserForm
        // post to backend, create id
        editUser(currentUser.id, value);
        console.log(value, "updateFormOk");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setAddOpen(true);
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
      {/* Add */}
      <Modal
        open={isAddOpen}
        title="Add User"
        okText="Confirm"
        cancelText="Cancel"
        onCancel={() => {
          setAddOpen(false);
          console.log("cancel");
        }}
        onOk={addFormOk}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addForm} isUpdate={false}></UserForm>
      </Modal>
      {/* Update */}
      <Modal
        open={isUpdateOpen}
        title="Update User"
        okText="Confirm"
        cancelText="Cancel"
        onCancel={async () => {
          await setUpdateDisabled(!isUpdateDisabled); // reverse value to activate useEffect in UserForm
          setUpdateOpen(false);
        }}
        onOk={updateFormOk}
      >
        <UserForm
          roleList={roleList}
          regionList={regionList}
          isUpdateDisabled={isUpdateDisabled}
          ref={updateForm}
          isUpdate={true}
        ></UserForm>
      </Modal>
    </div>
  );
};

export default UserList;
