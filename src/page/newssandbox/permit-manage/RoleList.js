import { Button, Table, Modal, Tree } from "antd";
import { useEffect, useState } from "react";
import { deleteRole, editRole, getRole, getSideMenu } from "../../../api";
import { IconList } from "../../../const/IconList";

const { confirm } = Modal;

const RoleList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [permitList, setPermitList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPermit, setCurrentPermit] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
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
              <Button type="primary" shape="circle" icon={IconList["/edit"]} onClick={() => openModal(item)}></Button>
            </span>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    (async function getData() {
      const res = await getRole();
      setDataSource(res?.data);
      const resp = await getSideMenu();
      setPermitList(resp?.data);
    })();
  }, []);

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
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    deleteRole(item.id);
  };

  //
  const openModal = (item) => {
    setModalOpen(true);
    setCurrentPermit(item.permits);
    setCurrentId(item.id);
  };

  const handleOk = () => {
    setModalOpen(false);
    // sync dataSource
    setDataSource(
      dataSource.map((item) => {
        if (item.id === currentId) {
          return {
            ...item,
            permits: currentPermit,
          };
        }
        return item;
      })
    );
    // patch to backend
    editRole(currentId, { permits: currentPermit });
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const onCheck = (checkedKey) => {
    setCurrentPermit(checkedKey.checked);
  };

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} align="center"></Table>
      <Modal title="Permission Allocation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkStrictly={true}
          // onSelect={onSelect}
          onCheck={onCheck}
          checkedKeys={currentPermit}
          treeData={permitList}
        />
      </Modal>
    </div>
  );
};

export default RoleList;
