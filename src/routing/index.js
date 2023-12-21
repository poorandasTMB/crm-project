import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../templates/auth/login';
import AdminDashboardLayout from '../templates/adminDashboard';
import ProctedRoute from './proctedRoute';
import AdminDashboard from '../templates/adminDashboard/pages/dashboard';
import Products from '../templates/adminDashboard/pages/products';
function Routing() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path={""} element={<AdminDashboardLayout />}>
                <Route path="/product" element={<Products />} />
                </Route>
            <Route element={<ProctedRoute />}>
                <Route path={"/"} element={<AdminDashboardLayout />}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<Products />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default Routing;
