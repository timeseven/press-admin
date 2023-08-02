// Check Router
const RouterCheck = (item, permitList) => {
  if (item && permitList) {
    return item.pagepermission && permitList.includes(item.key);
  } else {
    return item.pagepermission;
  }
};

export { RouterCheck };
