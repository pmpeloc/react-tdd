/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';

import { AuthContext } from '../../../utils/contexts/auth-context';

export const EmployeePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <h1>Employee Page</h1>
      {user.role === 'admin' && <button type="button">Delete</button>}
    </>
  );
};

export default { EmployeePage };
