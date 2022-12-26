/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, isAuth }) =>
  isAuth ? children : <Navigate replace to="/" />;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default { PrivateRoute };
