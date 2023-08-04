import { useState, useEffect } from "react";
import { deleteNews, editNews, getPublishManage } from "../../api";
import { notification } from "antd";

const usePublish = (type) => {
  const [dataSource, setDataSource] = useState([]);
  const { username } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getPublishManage(username, type);
        setDataSource(res?.data);
      } catch (error) {}
    })();
  }, [username, type]);

  const handlePublish = (id) => {
    setDataSource(dataSource.filter((item) => item.id !== id));
    editNews(id, {
      publishState: 2,
      publishTime: Date.now(),
    }).then((res) => {
      notification.info({
        message: "Notice",
        description: "You can go to Published List to check your news.",
        placement: "bottomRight",
      });
    });
    console.log("Publish", id);
  };
  const handleRemove = (id) => {
    setDataSource(dataSource.filter((item) => item.id !== id));
    editNews(id, {
      publishState: 3,
    }).then((res) => {
      notification.info({
        message: "Notice",
        description: "You can go to Removed List to check your news.",
        placement: "bottomRight",
      });
    });
    console.log("Remove", id);
  };
  const handleDelete = (id) => {
    setDataSource(dataSource.filter((item) => item.id !== id));
    deleteNews(id).then((res) => {
      notification.info({
        message: "Notice",
        description: "You have already deleted the news",
        placement: "bottomRight",
      });
    });
  };
  return {
    dataSource,
    handlePublish,
    handleRemove,
    handleDelete,
  };
};

export default usePublish;
