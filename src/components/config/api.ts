import axios from "axios";

const api = axios.create({
    // baseURL: "https://662b9b66de35f91de158d943.mockapi.io/",
    baseURL: "http://localhost:5088/api/v1/",
  });
   api.interceptors.request.use(
    function (config){
      const token = localStorage.getItem("accessToken");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    
  , function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
  
 export default api;