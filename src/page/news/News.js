import _ from "lodash";
import { useEffect, useState } from "react";
import { getBarData } from "../../api";
import { Card, Col, Row, List } from "antd";
const News = () => {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getBarData();
        setNewsList(Object.entries(_.groupBy(res?.data, (item) => item.category.title)));
        console.log(Object.entries(_.groupBy(res?.data, (item) => item.category.title)));
      } catch (error) {}
    })();
  }, []);
  return (
    <div style={{ width: "95%", margin: "0 auto" }}>
      <div style={{ width: "100%", float: "left", marginTop: "15px" }}>
        <span>
          <span style={{ fontSize: "25px", fontWeight: "bold", marginRight: "15px" }}>Global Breaking News</span>
          <span style={{ color: "grey" }}>Review News</span>
        </span>
      </div>
      <div style={{ paddingTop: "80px" }}>
        <Row gutter={[16, 16]}>
          {newsList.map((item) => (
            <Col span={8} key={item[0]}>
              <Card title={item[0]} bordered={false} hoverable={true}>
                <List
                  dataSource={item[1]}
                  pagination={{
                    pageSize: 3,
                  }}
                  renderItem={(data) => <List.Item>{<a href={`#/details/${data.id}`}>{data.title}</a>}</List.Item>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default News;
