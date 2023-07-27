import {
  // MenuFoldOutlined,
  // MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  KeyOutlined,
} from "@ant-design/icons";

const IconList = {
  "/home": <HomeOutlined />,
  "/user-manage": <UserOutlined />,
  "/user-manage/list": <TeamOutlined />,
  "/permit-manage": <KeyOutlined />,
  "/permit-manage/role/list": <KeyOutlined />,
  "/permit-manage/permit/list": <KeyOutlined />,
  "/news-manage": <KeyOutlined />,
  "/news-manage/add": <KeyOutlined />,
  "/news-manage/draft": <KeyOutlined />,
  "/news-manage/category": <KeyOutlined />,
  "/audit-manage": <KeyOutlined />,
  "/audit-manage/audit": <KeyOutlined />,
  "/audit-manage/list": <KeyOutlined />,
  "/publish-manage": <KeyOutlined />,
  "/publish-manage/unpublished": <KeyOutlined />,
  "/publish-manage/published": <KeyOutlined />,
  "/publish-manage/sunset": <KeyOutlined />,
};

export { IconList };
