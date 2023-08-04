import fetch from "../plugins/axios";

// loginUser because of the limitation of json-server, we use .get to process login simulation. In reality, we use .post instead.
export const loginUser = (username, password) =>
  fetch.get(`/users?username=${username}&password=${password}&roleState=true&_expand=role`);

// getUser
export const getUser = (param) => fetch.get("/users?_expand=role", param);

// addUser
export const addUser = (param) => fetch.post("/users", param);

// editUser
export const editUser = (id, param) => fetch.patch(`/users/${id}`, param);

// deleteUser
export const deleteUser = (param) => fetch.delete(`/users/${param}`);

// getRole
export const getRole = (param) => fetch.get("/roles", param);

// deleteRole
export const deleteRole = (param) => fetch.delete(`/roles/${param}`);

// editRole
export const editRole = (id, param) => fetch.patch(`/roles/${id}`, param);

// getChildren
export const getChildren = (param) => fetch.get("/children", param);

// deleteChildren
export const deleteChildren = (param) => fetch.delete(`/children/${param}`);

// editChildren
export const editChildren = (id, param) => fetch.patch(`/children/${id}`, param);

// getPermit
export const getPermit = (param) => fetch.get("/permits", param);

// deletePermit
export const deletePermit = (param) => fetch.delete(`/permits/${param}`);

// editPermit
export const editPermit = (id, param) => fetch.patch(`/permits/${id}`, param);

// getSideMenu
export const getSideMenu = (param) => fetch.get("/permits?_embed=children", param);

// getCategory
export const getCategory = (param) => fetch.get("/categories", param);

// deleteCategory
export const deleteCategory = (id, param) => fetch.delete(`/categories/${id}`, param);

// editCategory
export const editCategory = (id, param) => fetch.patch(`/categories/${id}`, param);

// getRegion
export const getRegion = (param) => fetch.get("/regions", param);

// getNews
export const getNews = (param) => fetch.get("/news", param);

// createNews
export const createNews = (param) => fetch.post("/news", param);

// editNews
export const editNews = (id, param) => fetch.patch(`/news/${id}`, param);

// getNewsDraft
export const getNewsDraft = (username) => fetch.get(`/news?author=${username}&auditState=0&_expand=category`, username);

// deleteNews
export const deleteNews = (id) => fetch.delete(`/news/${id}`, id);

// getNewsPreview
export const getNewsPreviewNews = (param) => fetch.get(`/news/${param}?_expand=category&_expand=role`, param);

// getAuditList
export const getAuditList = (username) =>
  fetch.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`, username);

// getAuditNews
export const getAuditNews = (param) => fetch.get("/news?auditState=1&_expand=category", param);

// getPublishManage
export const getPublishManage = (username, type) =>
  fetch.get(`/news?author=${username}&publishState=${type}&_expand=category`, username, type);

// getMostViews
export const getMostViews = () => fetch.get("/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6");

// getMostStars
export const getMostStars = () => fetch.get("/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6");

// getBarData
export const getBarData = () => fetch.get("/news?publishState=2&_expand=category");
