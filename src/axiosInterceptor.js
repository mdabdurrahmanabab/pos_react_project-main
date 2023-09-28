import axios from 'axios';
import { redirect } from "react-router-dom";
import GlobalFunction from './GlobalFunction.js';

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    if(localStorage.getItem("token") != undefined){
      config.headers['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('from interceptor');
    return response;
  }, function (error) {

    if(error.response?.status==401){
      GlobalFunction.logout();
    }else if(error.response?.status==500){
      redirect('/error-500');
    }
    
    return Promise.reject(error);
  });