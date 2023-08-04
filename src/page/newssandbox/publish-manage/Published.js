import { Button } from "antd";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../hooks/publish-manage/usePublish";

const Published = () => {
  const { dataSource, handleRemove } = usePublish(2);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button danger onClick={() => handleRemove(id)}>
            Remove
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
};

export default Published;
