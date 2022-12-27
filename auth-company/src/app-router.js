/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoginPage } from './auth/components/login-page';
import { PrivateRoute } from './utils/components/private-route';
import { AdminPage } from './admin/components/admin-page';
import { EmployeePage } from './employee/components/employee-page';

export function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin">
          <AdminPage />
        </PrivateRoute>
        <PrivateRoute path="/employee">
          <EmployeePage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default {
  AppRouter,
};
