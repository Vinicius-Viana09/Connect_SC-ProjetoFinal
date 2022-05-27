import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/index.html",
});

export default api;