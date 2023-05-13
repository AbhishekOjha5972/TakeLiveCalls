import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/home/Home'
import Authentication from '../pages/authentication/Authentication'
import { PrivateRoutes } from './PrivateRoutes'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoutes><Home /></PrivateRoutes>} />
            <Route path="/authentication" element={<Authentication />} />
        </Routes>
    )
}

export default AllRoutes