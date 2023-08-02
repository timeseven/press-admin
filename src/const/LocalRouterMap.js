import Login from "../page/login/Login";
import NewsSandBox from "../page/newssandbox/NewsSandBox";
import Audit from "../page/newssandbox/audit-manage/Audit";
import AuditList from "../page/newssandbox/audit-manage/AuditList";
import Home from "../page/newssandbox/home/Home";
import NewsAdd from "../page/newssandbox/news-manage/NewsAdd";
import NewsCategory from "../page/newssandbox/news-manage/NewsCategory";
import NewsDraft from "../page/newssandbox/news-manage/NewsDraft";
import NoPermit from "../page/newssandbox/no-permit/NoPermit";
import PermitList from "../page/newssandbox/permit-manage/PermitList";
import RoleList from "../page/newssandbox/permit-manage/RoleList";
import Published from "../page/newssandbox/publish-manage/Published";
import Removed from "../page/newssandbox/publish-manage/Removed";
import Unpublished from "../page/newssandbox/publish-manage/Unpublished";
import UserList from "../page/newssandbox/user-manage/UserList";

const LocalRouterMap = {
  "/": <NewsSandBox />,
  "/home": <Home />,
  "/user-manage/list": <UserList />,
  "/permit-manage/role/list": <RoleList />,
  "/permit-manage/permit/list": <PermitList />,
  "/news-manage/add": <NewsAdd />,
  "/news-manage/draft": <NewsDraft />,
  "/news-manage/category": <NewsCategory />,
  "/audit-manage/audit": <Audit />,
  "/audit-manage/list": <AuditList />,
  "/publish-manage/unpublished": <Unpublished />,
  "/publish-manage/published": <Published />,
  "/publish-manage/sunset": <Removed />,
  "/login": <Login />,
  "*": <NoPermit />,
};

export { LocalRouterMap };
