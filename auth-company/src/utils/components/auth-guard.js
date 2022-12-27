/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../contexts/auth-context';

export const AuthGuard = ({ children, isAuth }) => {
  const [isUserAuth, setIsUserAuth] = useState(isAuth);
  const [user, setUser] = useState({ role: '', username: '' });

  const handleSuccessLogin = ({ role }) => {
    setUser({ role });
    setIsUserAuth(true);
  };

  const authProviderValue = {
    isAuth: isUserAuth,
    user,
    handleSuccessLogin,
  };

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};

AuthGuard.defaultProps = {
  isAuth: false,
};

export default { AuthGuard };
