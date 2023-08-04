import { Button } from "antd";
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../hooks/publish-manage/usePublish";

const Unpublished = () => {
  const { dataSource, handlePublish } = usePublish(1);
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => (
          <Button type="primary" onClick={() => handlePublish(id)}>
            Publish
          </Button>
        )}
      ></NewsPublish>
    </div>
  );
};

export default Unpublished;
