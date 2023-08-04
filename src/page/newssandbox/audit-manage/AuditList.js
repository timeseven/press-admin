import { useEffect, useState } from "react";
import { editNews, getAuditList } from "../../../api";
import { Button, Table, Tag, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { IconList } from "../../../const/IconList";
const { confirm } = Modal;

const AuditList = () => {
  const navigate = useNavigate();
  const { username } = JSON.parse(localStorage.getItem("token"));
  const [auditList, setAuditList] = useState([]);
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
      title: "Audit Status",
      dataIndex: "auditState",
      render: (key) => {
        return (
          <Tag color={["", "orange", "green", "red"][key]}>
            {["Wait for Audit", "Audit in Process", "Audit Passed", "Audit Failed"][key]}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: (item) => {
        console.log("Action", item.auditState);
        return (
          <div>
            <span>
              <Button
                style={{ width: "80px" }}
                type={["", "default", "primary", "primary"][item.auditState]}
                danger={item.auditState === 2}
                onClick={() => handleCheck(item)}
              >
                {["", "Revoke", "Publish", "Edit"][item.auditState]}
              </Button>
            </span>
          </div>
        );
      },
    },
  ];

  const handleCheck = (item) => {
    if (item.auditState === 1) {
      // Revoke
      setAuditList(auditList.filter((data) => data.id !== item.id));
      editNews(item.id, {
        auditState: 0,
      }).then((res) => {
        notification.info({
          message: "Notice",
          description: "You can go to Draft List to check your news.",
          placement: "bottomRight",
        });
      });
    } else if (item.auditState === 2) {
      //Publish
      confirm({
        title: "Do you want to publish the news?",
        icon: IconList["/exclamation"],
        onOk() {
          setAuditList(auditList.filter((data) => data.id !== item.id));
          editNews(item.id, {
            publishState: 2,
          }).then((res) => {
            notification.info({
              message: "Notice",
              description: "You can go to Published List to check your news.",
              placement: "bottomRight",
            });
          });
          console.log("OK");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      // Edit
      navigate(`/news-manage/update/${item.id}`);
    }
  };

  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getAuditList(username);
        setAuditList(res?.data);
        console.log("res", res);
      } catch (error) {}
    })();
  }, [username]);
  return (
    <div>
      <Table dataSource={auditList} columns={columns} rowKey={(item) => item.id} align="center"></Table>
    </div>
  );
};

export default AuditList;
