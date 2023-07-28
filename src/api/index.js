import fetch from "../plugins/axios";

// getUser
export const getUser = (param) => fetch.get("/users", param);

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

// getRegion
export const getRegion = (param) => fetch.get("/regions", param);

// getNews
export const getNews = (param) => fetch.get("/news", param);
