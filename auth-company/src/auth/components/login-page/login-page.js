import React from 'react';
import { Button, TextField } from '@mui/material';

export function LoginPage() {
  return (
    <>
      <h1>Login Page</h1>
      <TextField label="email" id="email" />
      <TextField label="password" id="password" type="password" />
      <Button>Send</Button>
    </>
  );
}

export default { LoginPage };
