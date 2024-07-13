import { Button, Col, Radio, Row, Table } from "antd";

import { getAllProject } from "../../server/api";
import { useCallback, useEffect, useState } from "react";
import { getDepartmentById } from "../../server/api";
import { Link, useNavigate } from "react-router-dom";
import { getAllDepartment } from "../../server/api";
import "./index.scss";
const Home = () => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [dataSourceOriginal, setDataSourceOriginal] = useState([]);
  const [dataD, setDataD] = useState([]);
  const [departmentName, setDepartmentName] = useState({});
  const fetchData = async () => {
    const response = await getAllProject();
    setDataSource(response.data);
    setDataSourceOriginal(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchAllDepartment = async () => {
    const response = await getAllDepartment();
    setDataD(response.data);
  };
  useEffect(() => {
    fetchAllDepartment();
  }, []);

  useEffect(() => {
    const fetchDataFromDepartment = async () => {
      const response = await Promise.all(
        dataSourceOriginal.map((item) => getDepartmentById(item.department))
      );
      const departmentNamesObj = response.reduce((acc, response, index) => {
        acc[dataSourceOriginal[index].department] = response.data.name;
        return acc;
      }, {});
      setDepartmentName(departmentNamesObj);
    };
    fetchDataFromDepartment();
  }, [dataSourceOriginal]);
  console.log("departmentName", departmentName);
  console.log("dataSource", dataSource);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (id) => {
        return <div style={{ display: "block" }}>{id}</div>;
      },
    },
    {
      title: "Project Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (dataIndex) => {
        return (
          <Link
            onClick={() => handleNavigateList(dataIndex)}
            style={{ textDecoration: "underline" }}
          >
            {departmentName[dataIndex]}
          </Link>
        );
      },
    },
  ];
  const navigate = useNavigate();
  const handleNavigateList = (dataIndex) => {
    navigate(`/departments/${dataIndex}/employees`);
  };
  
  const handleOnChange = useCallback((e) => {
    const newSelectedRadio = e.target.value;
    setSelectedRadio(newSelectedRadio);
  }, []);
  
  useEffect(() => {
    if (selectedRadio === null) {
      setDataSource(dataSourceOriginal);
    } else {
      const filterData = dataSourceOriginal.filter((item) => {
        return departmentName[item.department] === selectedRadio;
      });
      setDataSource(filterData);
    }
  }, [selectedRadio, dataSourceOriginal, departmentName]);
  const handleNavigateAdd = () =>{
    navigate("/projects/add")
  }
  return (
    <div>
      <Row style={{ margin: " 20px 100px" }}>
        <Col style={{ display: "flex", flexDirection: "column" }} span={6}>
          <h1 style={{ fontSize: "18px" }}>Departments</h1>
          <Radio.Group
            style={{ display: "flex", flexDirection: "column" }}
            onChange={handleOnChange}
          >
            <Radio value={null}>All</Radio>
            {dataD.map((item) => {
              return (
                <Radio key={item.id} value={item.name}>
                  {item.name}
                </Radio>
              );
            })}
          </Radio.Group>
        </Col>
        <Col span={18}>
          <h1 style={{ marginLeft: "180px" }}>List of Projects </h1>
          <Button onClick={handleNavigateAdd}
            type="primary"
            style={{ background: "green", margin: "40px" }}
          >
            Create new project
          </Button>
          <Table columns={columns} dataSource={dataSource} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
