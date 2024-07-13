import { Link, useParams } from "react-router-dom";
import { getDepartmentById } from "../../server/api";
import { useEffect, useState } from "react";

import { getAllEmployee } from "../../server/api";
import { Table } from "antd";
const ListEmployee = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const [allEmployee, setAllEmployee] = useState([]);
  const fetchAllEmployee = async () => {
    const response = await getAllEmployee();
    setAllEmployee(response.data);
  };
  useEffect(() => {
    fetchAllEmployee();
  }, []);

  const fetchDetailsDepartment = async () => {
    const response = await getDepartmentById(id);
    setData(response.data);
  };
  useEffect(() => {
    fetchDetailsDepartment();
  }, []);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Employee name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
  ];
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of Employess</h1>
      <div style={{margin:' 0 100px'}}>
        <Link to={"/"} style={{ textDecoration: "underline" }}>
          Home page
        </Link>
        <h2>Department: {data.name}</h2>
      </div>
      <Table 
        style={{ margin: "10px 100px"}}
        columns={columns}
        dataSource={allEmployee.filter((item) => item.department == id)}
      />
    </div>
  );
};

export default ListEmployee;
