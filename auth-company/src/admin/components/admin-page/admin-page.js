/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../../utils/contexts/auth-context';

export const AdminPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{user.username}</Typography>
          <Button component={Link} color="inherit" to="/employee">
            Employee
          </Button>
        </Toolbar>
      </AppBar>
      <Typography component="h1" variant="h5">
        Admin Page
      </Typography>
    </>
  );
};

export default { AdminPage };
