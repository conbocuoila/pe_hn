import axios from "axios";

const API_URL = "http://localhost:5174/projects";
const API_URL2 = "http://localhost:5174/departments";
const API_URL3 = "http://localhost:5174/employees";
export const getAllProject = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.log("Errror while calling getAllProject", error.message);
  }
};
export const getDepartmentById = async (id) => {
  try {
    return await axios.get(`${API_URL2}/${id}`);
  } catch (error) {
    console.log("Errror while calling getAllProject", error.message);
  }
};
export const getAllDepartment = async () => {
  try {
    return await axios.get(API_URL2);
  } catch (error) {
    console.log("Errror while calling getAllDepartment", error.message);
  }
};

export const getAllEmployee = async () => {
  try {
    return await axios.get(API_URL3);
  } catch (error) {
    console.log("Errror while calling getAllEmployee api", error.message);
  }
};

export const addNewProject = async (data) => {
  try {
    return await axios.post(API_URL, data);
  } catch (error) {
    console.log("Errror while calling addNewProject api", error.message);
  }
};
