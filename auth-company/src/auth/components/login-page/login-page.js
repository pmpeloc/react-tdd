import React, { useState } from 'react';
import { Button, CircularProgress, Snackbar, TextField } from '@mui/material';
import { login } from '../../services';

const validateEmail = email => {
  const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regex.test(email);
};

const validatePassword = password => {
  const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return regex.test(password);
};

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

  return (
    <>
      <h1>Login Page</h1>
      {isFetching && <CircularProgress data-testid="loading-indicator" />}
      <form onSubmit={handleSubmit}>
        <TextField
          label="email"
          id="email"
          name="email"
          helperText={emailValidationMessage}
          onChange={handleChange}
          value={formValues.email}
          onBlur={handleBlurEmail}
        />
        <TextField
          label="password"
          id="password"
          type="password"
          name="password"
          helperText={passwordValidationMessage}
          onChange={handleChange}
          value={formValues.password}
          onBlur={handleBlurPassword}
        />
        <Button type="submit" disabled={isFetching}>
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
    </>
  );
}

export default { LoginPage };
