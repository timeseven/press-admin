import { useEffect, useState } from "react";
import { RoleObj } from "../../../const/RoleObj";
import { editNews, getAuditNews } from "../../../api";
import { Button, Table, Modal, notification } from "antd";
import { IconList } from "../../../const/IconList";
const { confirm } = Modal;

const Audit = () => {
  const [dataSource, setDataSource] = useState([]);
  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"));
  const columns = [
    {
      title: "News Title",
      dataIndex: "title",
      render: (title, item) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>;
      },
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "News Category",
      dataIndex: "category",
      render: (category) => {
        return category.title;
      },
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <div>
            <span>
              <Button type="primary" style={{ marginRight: "10px" }} onClick={() => handleAudit(item, 2, 1)}>
                Approve
              </Button>
              <Button danger onClick={() => handleAudit(item, 3, 0)}>
                Withdraw
              </Button>
            </span>
          </div>
        );
      },
    },
  ];

  //handleAudit
  const handleAudit = (item, auditState, publishState) => {
    confirm({
      title: `Do you want to ${["Approve", "Withdraw"][auditState - 2]} the news?`,
      icon: IconList["/exclamation"],
      onOk() {
        setDataSource(dataSource.filter((data) => data.id !== item.id));
        editNews(item.id, {
          auditState,
          publishState,
        }).then((res) => {
          notification.info({
            message: "Notice",
            description: "You can go to Audit List to check your news.",
            placement: "bottomRight",
          });
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // get user info
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getAuditNews();
        const list = res?.data;
        //if you are super administrator, all data will be shown.
        //if you are field manager, you can only check your data and the data of field editors from your region.
        //field editors can't see the userlist
        setDataSource(
          RoleObj[roleId] === "Super Administrator"
            ? list
            : [
                ...list.filter((item) => item.author === username),
                ...list.filter((item) => item.region === region && RoleObj[item.roleId] === "Field Editor"),
              ]
        );
      } catch (error) {}
    })();
  }, [roleId, region, username]);
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} align="center"></Table>
    </div>
  );
};

export default Audit;
