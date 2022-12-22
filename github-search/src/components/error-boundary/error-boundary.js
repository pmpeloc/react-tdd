import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@mui/material';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReloadClick = () => window.location.reload();

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError)
      return (
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}>
          <Typography variant='h4'>There is an unexpected error</Typography>
          <Button
            type='button'
            onClick={this.handleReloadClick}
            variant='contained'
            color='primary'>
            Reload
          </Button>
        </Grid>
      );

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
