import { Button, Descriptions } from "antd";
import { IconList } from "../../../const/IconList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNewsPreviewNews } from "../../../api";
import moment from "moment/moment";

const NewsPreview = () => {
  const [previewContent, setPreviewContent] = useState([]);
  const param = useParams();
  console.log(param, "xxxx");
  let items = [
    {
      key: "author",
      label: "Author",
      children: "-",
    },
    {
      key: "createTime",
      label: "Create Time",
      children: "-",
    },
    {
      key: "publishTime",
      label: "Publish Time",
      children: "-",
    },
    {
      key: "region",
      label: "Region",
      children: "-",
    },
    {
      key: "auditState",
      label: "Audit Status",
      children: "-",
    },
    {
      key: "publishState",
      label: "Publish Status",
      children: "-",
    },
    {
      key: "view",
      label: "Viewss",
      children: "-",
    },
    {
      key: "star",
      label: "Stars",
      children: "-",
    },
    {
      key: "comments",
      label: "Comments",
      children: "-",
    },
  ];
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getNewsPreviewNews(param.id);
        console.log("Preview", res?.data);
        setPreviewContent(res?.data);
      } catch (error) {}
    })();
  }, [param.id]);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <span style={{ width: "65px", float: "left" }}>
        <Button
          type="text"
          icon={IconList["/arrowleft"]}
          onClick={() => {
            window.history.back();
          }}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </span>
      <span style={{ width: "300px", float: "left", marginTop: "15px" }}>
        <span style={{ fontSize: "25px", fontWeight: "bold", marginRight: "15px" }}>{previewContent?.title}</span>
        <span>{previewContent?.category?.title}</span>
      </span>
      <span>
        {items.forEach((data) => {
          if (previewContent[data.key] !== undefined) {
            switch (data.key) {
              case "createTime":
                data.children = moment(previewContent[data.key]).format("DD-MM-YYYY HH:mm:ss");
                break;
              case "auditState": // 0: waiting for audit  1:processing audit  2: passed  3:failed
                data.children = (
                  <span style={{ color: ["#D929D9", "orange", "green", "red"][previewContent[data.key]] }}>
                    {["Wait for Audit", "Audit in Process", "Audit Passed", "Audit Failed"][previewContent[data.key]]}
                  </span>
                );
                break;
              case "publishState": // 0: unpublished  1: waiting for publishing  2:published  3:removed
                data.children = (
                  <span style={{ color: ["#D929D9", "orange", "green", "red"][previewContent[data.key]] }}>
                    {["Unpublished", "Wait for Publish", "Published", "Removed"][previewContent[data.key]]}
                  </span>
                );
                break;
              default:
                data.children = previewContent[data.key];
                break;
            }
          }
        })}
        <Descriptions items={items} size="middle" />
      </span>
      <div
        style={{ border: "2px groove #DADEF5" }}
        dangerouslySetInnerHTML={{
          __html: previewContent.content,
        }}
      ></div>
    </div>
  );
};

export default NewsPreview;
