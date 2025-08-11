import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const Protected = () => {
    const token = localStorage.getItem("admin-token");
    if(!token){
        return <Navigate to = "/adminlogin" />;
    }
  return (<Outlet/>)
}
