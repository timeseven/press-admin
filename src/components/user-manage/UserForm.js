import { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";

const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(props.isUpdateDisabled);
    console.log("disabled shown ", props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);
  return (
    <div>
      {" "}
      <Form layout="vertical" ref={ref}>
        <Form.Item
          name="username"
          label="User Name"
          rules={[{ required: true, message: "Please input the User Name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input the Password" }]}>
          <Input type="password" />
        </Form.Item>
        <Form.Item
          name="region"
          label="Region"
          rules={isDisabled ? [] : [{ required: true, message: "Please input the Region" }]} // Super Admin don't need to set region
        >
          <Select
            // style={{ width: 120 }}
            allowClear
            fieldNames={{ label: "title" }}
            options={props.regionList}
            disabled={isDisabled}
          />
        </Form.Item>
        <Form.Item name="roleId" label="Role Name" rules={[{ required: true, message: "Please input the Region" }]}>
          <Select
            // style={{ width: 120 }}
            allowClear
            fieldNames={{ label: "roleName", value: "roleType" }}
            options={props.roleList}
            onChange={(value) => {
              if (value === 1) {
                setIsDisabled(true);
                // value === 1 is super admin, clear region value
                ref.current.setFieldsValue({
                  region: "",
                });
              } else {
                setIsDisabled(false);
              }
              console.log(value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
});

export default UserForm;
