import { Button, Table, Modal, Form, Input } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { deleteCategory, editCategory, getCategory } from "../../../api";
import { IconList } from "../../../const/IconList";
const { confirm } = Modal;

const NewsCategory = () => {
  const [dataSource, setDataSource] = useState([]);
  const EditableContext = React.createContext(null);

  useEffect(() => {
    (async function getData() {
      try {
        const res = await getCategory();
        setDataSource(res?.data);
      } catch (error) {}
    })();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "Category Name",
      dataIndex: "title",
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: "title",
        title: "Category Name",
        handleSave,
      }),
    },
    {
      title: "Action",
      render: (item) => {
        return (
          <div>
            <span style={{ marginRight: "10px" }}>
              <Button danger shape="circle" icon={IconList["/delete"]} onClick={() => confirmMethod(item)}></Button>
            </span>
          </div>
        );
      },
    },
  ];

  // confirm before delete
  const confirmMethod = (item) => {
    confirm({
      title: "Do you Want to delete this item?",
      icon: IconList["/exclamation"],
      onOk() {
        deleteMehod(item);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const deleteMehod = (item) => {
    setDataSource(dataSource.filter((data) => data.id !== item.id));
    deleteCategory(item.id);
  };

  const handleSave = (row) => {
    console.log("handleSave", row);
    setDataSource(
      dataSource.map((item) => {
        if (item.id === row.id) {
          return {
            id: row.id,
            title: row.title,
            value: row.title,
          };
        }
        return item;
      })
    );
    editCategory(row.id, {
      title: row.title,
      value: row.title,
    });
  };

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} placeholder="Edit Category Name" />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5,
        }}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
    </div>
  );
};

export default NewsCategory;
