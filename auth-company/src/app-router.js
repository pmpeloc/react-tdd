/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from './auth/components/login-page';
import { PrivateRoute } from './utils/components/private-route';
import { AdminPage } from './admin/components/admin-page';
import { EmployeePage } from './employee/components/employee-page';

export function AppRouter({ isAuth }) {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute isAuth={isAuth}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <PrivateRoute isAuth={isAuth}>
            <EmployeePage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

AppRouter.propTypes = {
  isAuth: PropTypes.bool,
};

AppRouter.defaultProps = {
  isAuth: false,
};

export default {
  AppRouter,
};
