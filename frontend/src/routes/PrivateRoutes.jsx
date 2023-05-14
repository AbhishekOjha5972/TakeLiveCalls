import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    let token = JSON.parse(localStorage.getItem("token")) || ""
    if (token=="") {
        return <Navigate to="/authentication"/>
    }
    return children
}
