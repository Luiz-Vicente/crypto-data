import axios from "axios";

const axiosInstance = axios.create({
  timeout: 50000,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;