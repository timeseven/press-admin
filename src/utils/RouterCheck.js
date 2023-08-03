// Check Router
const RouterCheck = (item, permitList, pagePermissionOnly) => {
  if (item && permitList) {
    if (pagePermissionOnly) {
      return item.pagepermission && permitList.includes(item.key);
    } else {
      return (item.pagepermission || item.routepermission) && permitList.includes(item.key);
    }
  } else {
    if (pagePermissionOnly) {
      return item.pagepermission;
    } else {
      return item.pagepermission || item.routepermission;
    }
  }
};

export { RouterCheck };
