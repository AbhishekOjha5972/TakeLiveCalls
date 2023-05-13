import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }) => {
    const { user } = useSelector((store) => store.masterAuthentication);
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!user?.token) {
            return navigate("/authentication")
        }
    }, [])
    return children
}
