/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { Typography } from '@mui/material';

import { AuthContext } from '../../../utils/contexts/auth-context';
import { AppLayout } from '../../../utils/components/app-layout';

export const AdminPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <AppLayout user={user}>
      <Typography component="h1" variant="h5">
        Admin Page
      </Typography>
    </AppLayout>
  );
};

export default { AdminPage };
