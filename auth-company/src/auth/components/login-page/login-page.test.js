import React from 'react';
import { screen, render } from '@testing-library/react';

import { LoginPage } from './login-page';

beforeEach(() => render(<LoginPage />));

describe('When login page is mounted', () => {
  it('Must display the login title', () => {
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('Must have a form with the following fields: email, password and submit button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i }));
  });
});
