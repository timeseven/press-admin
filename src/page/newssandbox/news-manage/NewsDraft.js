import { Button, Table, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { deleteNews, editNews, getNewsDraft } from "../../../api";
import { IconList } from "../../../const/IconList";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;

const NewDraft = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const { username } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    (async function getData() {
      try {
        const res = await getNewsDraft(username);
        setDataSource(res?.data);
      } catch (error) {}
    })();
  }, [username]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
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
            <span style={{ marginRight: "10px" }}>
              <Button danger shape="circle" icon={IconList["/delete"]} onClick={() => confirmMethod(item)}></Button>
            </span>
            <span style={{ marginRight: "10px" }}>
              <Button
                shape="circle"
                icon={IconList["/edit"]}
                onClick={() => {
                  navigate(`/news-manage/update/${item.id}`);
                }}
              ></Button>
            </span>
            <span>
              <Button
                type="primary"
                shape="circle"
                icon={IconList["/upload"]}
                onClick={() => handleCheck(item.id)}
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

  const deleteMehod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    deleteNews(item.id);
  };

  const handleCheck = (id) => {
    confirm({
      title: "Do you want to submit the news?",
      icon: IconList["/exclamation"],
      onOk() {
        editNews(id, {
          auditState: 1,
        }).then((res) => {
          notification.info({
            message: "Notice",
            description: "You can go to Audit List to check your news.",
            placement: "bottomRight",
          });
          navigate("/audit-manage/list");
        });
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(item) => item.id}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default NewDraft;
