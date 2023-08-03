import { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select } from "antd";
import { RoleObj } from "../../const/RoleObj";

const UserForm = forwardRef((props, ref) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { roleId, region } = JSON.parse(localStorage.getItem("token"));
  let regionData = [];
  let roleData = [];
  const checkRegionDisabled = () => {
    // if you are super admin, you can select all region no matter is added  or edited.
    if (RoleObj[roleId] === "Super Administrator") {
      regionData = props.regionList.map((item) => {
        return {
          ...item,
          disabled: false,
        };
      });
    } else {
      // if you are not super admin, you can't select to change region when it is edited and you can only select your region when it is added.
      if (props.isUpdate) {
        regionData = props.regionList.map((item) => {
          return {
            ...item,
            disabled: true,
          };
        });
      } else {
        regionData = props.regionList.map((item) => {
          return {
            ...item,
            disabled: item.value !== region,
          };
        });
      }
    }
  };

  const checkRoleDisabled = () => {
    if (RoleObj[roleId] === "Super Administrator") {
      roleData = props.roleList.map((item) => {
        return {
          ...item,
          disabled: false,
        };
      });
    } else {
      // if you are not super admin, you can't select to change role when it is edited and you can only select "Field Editor" when it is added.
      if (props.isUpdate) {
        roleData = props.roleList.map((item) => {
          return {
            ...item,
            disabled: true,
          };
        });
      } else {
        roleData = props.roleList.map((item) => {
          return {
            ...item,
            disabled: RoleObj[item.id] !== "Field Editor",
          };
        });
      }
    }
  };

  useEffect(() => {
    setIsDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled]);

  checkRegionDisabled();
  checkRoleDisabled();
  return (
    <div>
      <Form layout="vertical" ref={ref}>
        <Form.Item
          name="username"
          label="User Name"
          rules={[{ required: true, message: "Please input the User Name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input the Password" }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="region"
          label="Region"
          rules={isDisabled ? [] : [{ required: true, message: "Please input the Region" }]} // Super Admin don't need to set region
        >
          <Select allowClear fieldNames={{ label: "title" }} options={regionData} disabled={isDisabled} />
        </Form.Item>
        <Form.Item name="roleId" label="Role Name" rules={[{ required: true, message: "Please input the Region" }]}>
          <Select
            allowClear
            fieldNames={{ label: "roleName", value: "roleType" }}
            options={roleData}
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
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
});

export default UserForm;
