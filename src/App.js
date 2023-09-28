import React, {useState,useEffect} from 'react';
import './assets/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './assets/css/style.scss';
import {RouterProvider} from 'react-router-dom';
import ProjectRouter from './components/router/ProjectRouter';
import PublicRouter from './components/router/PublicRouter';
import axios from 'axios';
import './axiosInterceptor.js';

function App() { 
  const [auth, setAuth] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token") != undefined){
      setAuth(true);
      // It will use in axios inceptors
      // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
    }
  },[]);

  return (
    <>
    {
      auth ? <RouterProvider router={ProjectRouter} /> : <RouterProvider router={PublicRouter} />
    }
    </>
  );
}

export default App;
