/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../contexts/auth-context';

export const PrivateRoute = ({ children, path }) => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Route path={path} exact>
      {isAuth ? children : <Redirect to="/" />}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default { PrivateRoute };
