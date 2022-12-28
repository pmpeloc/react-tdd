/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../contexts/auth-context';

export const PrivateRoute = ({ children, path, allowRoles }) => {
  const {
    isAuth,
    user: { role },
  } = useContext(AuthContext);

  const getIsAllowed = () => {
    if (allowRoles.length > 0) {
      return allowRoles.includes(role);
    }
    return true;
  };

  const pathToRedirect = () => {
    let destination = '';
    if (allowRoles.length && allowRoles.includes(role)) {
      destination = `/${role}`;
    } else {
      destination = '/';
    }
    return destination;
  };

  return (
    <Route path={path} exact>
      {isAuth && getIsAllowed() ? children : <Redirect to={pathToRedirect} />}
    </Route>
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  allowRoles: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
  allowRoles: [],
};

export default { PrivateRoute };
