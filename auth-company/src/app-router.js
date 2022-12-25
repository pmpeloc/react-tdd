/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './auth/components/login-page';

const isAuth = false;

const AdminPage = () => {
  return <h1>Admin Page</h1>;
};

const EmployeePage = () => {
  return <h1>Employee Page</h1>;
};

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={isAuth ? <AdminPage /> : <Navigate replace to="/" />}
      />
      <Route
        path="/employee"
        element={isAuth ? <EmployeePage /> : <Navigate replace to="/" />}
      />
    </Routes>
  );
}

export default {
  AppRouter,
};
