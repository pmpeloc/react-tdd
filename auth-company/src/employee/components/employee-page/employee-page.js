/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';

import { AuthContext } from '../../../utils/contexts/auth-context';
import { ADMIN_ROLE } from '../../../consts';
import { AppLayout } from '../../../utils/components/app-layout';

export const EmployeePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <AppLayout user={user}>
      <>
        <Typography component="h1" variant="h5">
          Employee Page
        </Typography>
        {user.role === ADMIN_ROLE && <Button type="button">Delete</Button>}
      </>
    </AppLayout>
  );
};

export default { EmployeePage };
