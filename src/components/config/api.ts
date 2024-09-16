import axios from "axios";

const api = axios.create({
    baseURL: "https://66e7cf37b17821a9d9da09d7.mockapi.io/",
  });
   api.interceptors.request.use(
    function (config){
      const token = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    
  , function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
  
 export default api;