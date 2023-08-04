import { Button } from "antd";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../hooks/publish-manage/usePublish";

const Removed = () => {
  const { dataSource, handleDelete } = usePublish(3);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button danger type="primary" onClick={() => handleDelete(id)}>
            Delete
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
};

export default Removed;
