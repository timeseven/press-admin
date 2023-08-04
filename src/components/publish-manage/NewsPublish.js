import { Table } from "antd";

const NewsPublish = (props) => {
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
        return <div>{props.button(item.id)}</div>;
      },
    },
  ];

  return (
    <div>
      <Table dataSource={props.dataSource} columns={columns} rowKey={(item) => item.id} align="center"></Table>
    </div>
  );
};

export default NewsPublish;
