import _ from "lodash";
import * as echarts from "echarts";
import { Card, Col, Row, List, Avatar, Drawer } from "antd";
import { EditOutlined, EllipsisOutlined, PieChartOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { getBarData, getMostStars, getMostViews } from "../../../api";
const { Meta } = Card;

const Home = () => {
  const [mostViewList, setMostViewList] = useState([]);
  const [mostStarList, setMostStarList] = useState([]);
  const [allList, setAllList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [pieChart, setPieChart] = useState(null);
  const barRef = useRef(null);
  const pieRef = useRef(null);
  const {
    username,
    region,
    role: { roleName },
  } = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getMostViews();
        setMostViewList(res?.data);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getMostStars();
        setMostStarList(res?.data);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getBarData();
        renderBarView(_.groupBy(res?.data, (item) => item.category.title));
        setAllList(res?.data);
      } catch (error) {}
    })();
    return () => {
      window.onresize = null;
    };
  }, []);

  // render bar chart
  const renderBarView = (data) => {
    // init echarts
    var myChart = echarts.init(barRef.current);

    // set options
    var option = {
      title: {
        text: "News Categories",
      },
      tooltip: {},
      legend: {
        data: ["Quantity"],
      },
      xAxis: {
        data: Object.keys(data),

        axisLabel: {
          interval: 0,
          rotate: "45",
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: "Quantity",
          type: "bar",
          data: Object.values(data).map((item) => item.length),
        },
      ],
    };

    // show graph according to the above configuration
    myChart.setOption(option);

    window.onresize = () => {
      console.log("resize");
      myChart.resize();
    };
  };

  // render pie chart
  const renderPieView = () => {
    // handle data
    var currentList = allList.filter((item) => item.author === username);
    var groupObj = _.groupBy(currentList, (item) => item.category.title);

    var list = [];
    for (var i in groupObj) {
      list.push({
        name: i,
        value: groupObj[i].length,
      });
    }
    console.log("ffff", currentList, groupObj);

    // init echarts
    var myChart;
    if (!pieChart) {
      myChart = echarts.init(pieRef.current);
      setPieChart(myChart);
    } else {
      myChart = pieChart;
    }

    // set options
    var option = {
      title: {
        text: "Current User Category Data",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Publish Quantity",
          type: "pie",
          radius: "50%",
          data: list,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // show graph according to the above configuration
    myChart.setOption(option);
  };
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Most Views" bordered={true}>
            <List
              dataSource={mostViewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Most Stars" bordered={false}>
            <List
              dataSource={mostStarList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
            actions={[
              <PieChartOutlined
                key="setting"
                onClick={async () => {
                  await setVisible(true);
                  // init pie chart
                  renderPieView();
                }}
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title={username}
              description={
                <div>
                  <b>{region ? region : "Global"}</b>
                  <span style={{ paddingLeft: "30px" }}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
      <div ref={barRef} style={{ height: "400px", width: "100%", marginTop: "30px" }}></div>
      <Drawer
        width="500px"
        title="Personal News Category"
        placement="right"
        onClose={() => {
          setVisible(false);
        }}
        open={visible}
      >
        <div ref={pieRef} style={{ height: "400px", width: "100%", marginTop: "30px" }}></div>
      </Drawer>
    </div>
  );
};

export default Home;
