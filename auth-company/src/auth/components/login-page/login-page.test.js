import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

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

describe('When the user leaves empty fields and clicks the submit button', () => {
  it('Display required messages as the format: The [field name] is required', () => {
    expect(
      screen.queryByText(/The email is required/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The password is required/i),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(screen.getByText(/The email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/The password is required/i)).toBeInTheDocument();
  });
});

describe('When the user fills the fields and clicks the submit button', () => {
  it('must not display the required messages', () => {
    screen.getByLabelText(/email/i).value = 'john.doe@test.com';
    screen.getByLabelText(/password/i).value = 'Aa123456789!@#';
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    expect(
      screen.queryByText(/The email is required/i),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/The password is required/i),
    ).not.toBeInTheDocument();
  });
});

describe('When the user fills and blur the email input with invalid email', () => {
  it('Must display a validation message "The email is invalid. Example: john.doe@mail.com"', () => {
    const emailInput = screen.getByLabelText(/email/i);
    // Change an blur email input
    fireEvent.change(emailInput, {
      target: { value: 'invalid.email' },
    });
    fireEvent.blur(emailInput);
    // Expect
    expect(
      screen.getByText(/the email is invalid. example: john.doe@mail.com/i),
    ).toBeInTheDocument();
  });
});

describe('When the user fills and blur the email input with invalid email', () => {
  it('Must display a validation message "The email is invalid. Example: john.doe@mail.com"', () => {
    const emailInput = screen.getByLabelText(/email/i);
    // Change an blur email input
    fireEvent.change(emailInput, {
      target: { value: 'invalid.email' },
    });
    fireEvent.blur(emailInput);
    // Expect
    expect(
      screen.getByText(/the email is invalid. example: john.doe@mail.com/i),
    ).toBeInTheDocument();
  });
});

describe('When the user fills and blur the email input with invalid email, and then focus and change with valid value', () => {
  it('Must not display a validation message', () => {
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, {
      target: { value: 'invalid.email' },
    });
    fireEvent.blur(emailInput);
    expect(
      screen.getByText(/the email is invalid. example: john.doe@mail.com/i),
    ).toBeInTheDocument();
    fireEvent.change(emailInput, {
      target: { value: 'john.doe@mail.com' },
    });
    fireEvent.blur(emailInput);
    expect(
      screen.queryByText(/the email is invalid. example: john.doe@mail.com/i),
    ).not.toBeInTheDocument();
  });
});
