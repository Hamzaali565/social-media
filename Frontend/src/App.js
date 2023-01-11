import logo from './logo.svg';
// import './App.css';
import Navbar from './components/Navbar';
import Signup from './components/Signup'
import Login from './components/Login'
import profilePage  from './components/ProfilePage'
import { Stack } from '@mui/system';
import { GlobalContext } from './context/Context';
import { useState, useContext, useEffect } from 'react';
import { Box, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Splash from './components/Splash';
import ChangePassword from './components/ChangePassword';
import ForgetPassword from './components/ForgetPassword';

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  // console.log("state", state);
  useEffect(() => {
    const getProfile = async () => {
      try {
        let response = await 
        axios.get(`${state.baseUrl}/api/v1/profile`, {
          withCredentials: true
        })
        dispatch({
          type: 'USER_LOGIN',
          payload: response.data

        })
      }
      catch {
        dispatch({
          type: 'USER_LOGOUT'
        })

      }
    }
    getProfile();
  }, [])

  // useEffect(() => {

  //   // Add a request interceptor
  //   axios.interceptors.request.use(function (config) {
  //     // Do something before request is sent
  //     config.withCredentials = true;
  //     return config;
  //   }, function (error) {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   });

  //   // Add a response interceptor
  //   axios.interceptors.response.use(function (response) {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     return response;
  //   }, function (error) {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     // if (error.response.status === 401) {
  //     //   dispatch({
  //     //     type: 'USER_LOGOUT'
  //     //   })
  //     // }
  //     return Promise.reject(error);
  //   });
  // }, [])

  return (

    <Stack>

      {(state.isLogin === true) ?

        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="profilePage" element={<profilePage />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        null
      }
      {(state.isLogin === false) ?
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
        :
        null
      }

      {
        (state.isLogin === null) ?
          <Splash />
          : null
      }
    </Stack>

  );
}

export default App;