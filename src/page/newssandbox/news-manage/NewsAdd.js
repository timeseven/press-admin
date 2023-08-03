import { Steps, Button, Form, Input, Select, message, notification } from "antd";
import "./NewsAdd.css";
import { useEffect, useState, useRef } from "react";
import { createNews, getCategory } from "../../../api";
import NewsEditor from "../../../components/news-manage/NewsEditor";
import { useNavigate } from "react-router-dom";

const NewsAdd = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [categoryList, setCategoryList] = useState([]);

  const [formInfo, setFormInfo] = useState({});
  const [content, setContent] = useState("");

  const User = JSON.parse(localStorage.getItem("token"));

  const NewsForm = useRef();
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const handleNext = () => {
    if (currentStep === 0) {
      NewsForm.current
        .validateFields()
        .then((res) => {
          setFormInfo(res);
          setCurrentStep(currentStep + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (content === "" || content.trim() === "<p></p>") {
        message.error("The News Content can't be empty!");
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSave = (auditState) => {
    createNews({
      ...formInfo,
      content: content,
      region: User.region ? User.region : "Global",
      author: User.username,
      roleId: User.roleId,
      auditState: auditState, // 0: waiting for audit  1:processing audit  2: passed  3:failed
      publishState: 0, // 0: unpublished  1: waiting for publishing  2:published  3:removed
      createTime: Date.now(),
      star: 0,
      view: 0,
      // publishTime: 0,
    }).then((res) => {
      notification.info({
        message: "Notice",
        description: `You can go to ${auditState === 0 ? "Draft" : "Audit List"} to check your news.`,
        placement: "bottomRight",
      });
      navigate(auditState === 0 ? "/news-manage/draft" : "/audit-manage/list");
    });
  };
  useEffect(() => {
    (async function GetData() {
      try {
        const res = await getCategory();
        setCategoryList(res?.data);
      } catch (error) {}
    })();
  }, []);
  return (
    <div>
      <div className="page-header">Compose News</div>
      <Steps
        current={currentStep}
        items={[
          {
            title: "Basic Information",
            description: "News Title, News Category",
          },
          {
            title: "News Content",
            description: "News Paragraphs",
          },
          {
            title: "News Submit",
            description: "Save Draft or Submit for Audit",
          },
        ]}
      />

      <div style={{ marginTop: "50px" }}>
        <div className={currentStep === 0 ? "" : "hidden"}>
          <Form
            {...layout}
            name="nest-messages"
            ref={NewsForm}
            // onFinish={onFinish}
            // style={{ maxWidth: 600 }}
            // validateMessages={validateMessages}
          >
            <Form.Item name="title" label="News Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="categoryId" label="News Category" rules={[{ required: true }]}>
              <Select fieldNames={{ label: "value", value: "id" }} options={categoryList}></Select>
            </Form.Item>
          </Form>
        </div>
        <div className={currentStep === 1 ? "" : "hidden"}>
          <NewsEditor
            getContent={(value) => {
              setContent(value);
            }}
          ></NewsEditor>
        </div>
        <div className={currentStep === 2 ? "" : "hidden"}></div>
      </div>

      <div style={{ marginTop: "30px" }}>
        {currentStep === 2 && (
          <span>
            <Button type="primary" onClick={() => handleSave(0)}>
              Save Draft
            </Button>
            <Button danger onClick={() => handleSave(1)}>
              Submit for Audit
            </Button>
          </span>
        )}
        {currentStep < 2 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep > 0 && <Button onClick={handlePrevious}>Previous</Button>}
      </div>
    </div>
  );
};

export default NewsAdd;
