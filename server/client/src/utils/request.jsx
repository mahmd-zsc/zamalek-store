import axios from "axios";

const request = axios.create({
  // baseURL: "http://localhost:3000/",
  // baseURL: "https://backend-dbflgyq7h-mahmdzscs-projects.vercel.app/",
  baseURL: "http://localhost:3000/api/",
});

export default request;
