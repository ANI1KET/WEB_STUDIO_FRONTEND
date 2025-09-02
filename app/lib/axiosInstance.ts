import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  withCredentials: true,
  // timeout: 5000,
  // maxRedirects: 0,
});

export default axiosInstance;
