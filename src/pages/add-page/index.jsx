import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { Link, useNavigate } from "react-router-dom";
import { getAllDepartment } from "../../server/api";
import { useEffect, useState } from "react";
import { addNewProject } from "../../server/api";
import { useForm } from "antd/es/form/Form";
const Add = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await getAllDepartment();
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    form.submit();
  };
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const nameInput = document.querySelector('input[name="name"]');
    if (nameInput.value.trim() === "") {
      window.alert("Please enter the form fields that are required");
    } else {
      await addNewProject(value);
      window.alert("Create success");
      navigate("/");
    }
    console.log("value", value);
  };
  const [form] = useForm();
  return (
    <div style={{ margin: "10px 100px" }}>
      <h1 style={{ textAlign: "center" }}>Add a new project</h1>
      <Link to={"/"}>Home page</Link>
      <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
        <Form.Item label="Project name" name={"name"}>
          <Input name="name" />
        </Form.Item>

        <Form.Item label="Description" name={"description"}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Start date" name={"startDate"}>
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Type" name={"type"}>
          <Input />
        </Form.Item>
        <Form.Item label="Department" name={"department"}>
          <Select>
            {data.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleSubmitForm} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Add;
