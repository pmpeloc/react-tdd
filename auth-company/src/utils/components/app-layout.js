/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const AppLayout = ({ user, children }) => {
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
      {children}
    </>
  );
};

AppLayout.propTypes = {
  user: PropTypes.shape({ username: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.node.isRequired,
};

export default { AppLayout };
