/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Redirect } from 'react-router-dom';

import { login } from '../../services';
import { ADMIN_ROLE, EMPLOYEE_ROLE } from '../../../consts';
import { AuthContext } from '../../../utils/contexts/auth-context';
import { validateEmail, validatePassword } from '../../../utils/helpers';

const passValidationMessage =
  'The password must contain at least 8 characters, one upper case letter, one number and one special character';

export function LoginPage() {
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const { handleSuccessLogin, user } = useContext(AuthContext);

  const validateForm = () => {
    const { email, password } = formValues;
    const isEmailEmpty = !email;
    const isPasswordEmpty = !password;
    if (isEmailEmpty) {
      setEmailValidationMessage('The email is required');
    }
    if (isPasswordEmpty) {
      setPasswordValidationMessage('The password is required');
    }
    return isEmailEmpty || isPasswordEmpty;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validateForm()) return;
    const { email, password } = formValues;
    try {
      setIsFetching(true);
      const response = await login({ email, password });
      if (!response.ok) {
        throw response;
      }
      const {
        user: { role, username },
      } = await response.json();
      handleSuccessLogin({ role, username });
    } catch (err) {
      const data = await err.json();
      setErrorMessage(data.message);
      setIsOpen(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = ({ target: { value, name } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleBlurEmail = () => {
    if (!validateEmail(formValues.email)) {
      setEmailValidationMessage(
        'The email is invalid. Example: john.doe@mail.com',
      );
      return;
    }
    setEmailValidationMessage('');
  };

  const handleBlurPassword = () => {
    if (!validatePassword(formValues.password)) {
      setPasswordValidationMessage(passValidationMessage);
      return;
    }
    setPasswordValidationMessage('');
  };

  const handleClose = () => setIsOpen(false);

  if (!isFetching && user.role === ADMIN_ROLE) {
    return <Redirect to="/admin" />;
  }

  if (!isFetching && user.role === EMPLOYEE_ROLE) {
    return <Redirect to="/employee" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: '8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar style={{ margin: '1rem', backgroundColor: 'red' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login Page
        </Typography>
        {isFetching && <CircularProgress data-testid="loading-indicator" />}
        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            label="email"
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={emailValidationMessage}
            onChange={handleChange}
            value={formValues.email}
            onBlur={handleBlurEmail}
            error={!!emailValidationMessage}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            label="password"
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            helperText={passwordValidationMessage}
            onChange={handleChange}
            value={formValues.password}
            onBlur={handleBlurPassword}
            error={!!passwordValidationMessage}
          />
          <Button
            type="submit"
            disabled={isFetching}
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '3rem 0rem 2rem' }}
          >
            Send
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorMessage}
        />
      </div>
    </Container>
  );
}

export default { LoginPage };
