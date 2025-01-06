import axios from "axios";

// create api
const API = axios.create({
  baseURL: "http://localhost:5050/",
  timeout: "20000",
  withCredentials: false,
});

// export API utils
export default API;
