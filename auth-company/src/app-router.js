/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from './auth/components/login-page';

const isAuth = false;

const AdminPage = () => {
  return <h1>Admin Page</h1>;
};

const EmployeePage = () => {
  return <h1>Employee Page</h1>;
};

const PrivateRoute = ({ children }) =>
  isAuth ? children : <Navigate replace to="/" />;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoute>
            <EmployeePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default {
  AppRouter,
};
