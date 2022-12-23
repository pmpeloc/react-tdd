import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import { LoginPage } from './login-page';

const getPasswordInput = () => screen.getByLabelText(/password/i);
const passwordValidationMessage =
  'The password must contain at least 8 characters, one upper case letter, one number and one special character';

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

describe('When the user fills and blur the password input with a value with 7 character length', () => {
  it('Must display the validation message "The password must contain at least 8 characters, one upper case letter, one number and one special character"', () => {
    const passwordSevenLength = 'asdfghj';
    fireEvent.change(getPasswordInput(), {
      target: { value: passwordSevenLength },
    });
    fireEvent.blur(getPasswordInput());
    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('When the user fills and blur the password input with a value without one upper case character', () => {
  it(`Must display the validation message ${passwordValidationMessage}`, () => {
    const passwordWithoutUpperCaseChar = 'asdfghj8';
    fireEvent.change(getPasswordInput(), {
      target: { value: passwordWithoutUpperCaseChar },
    });
    fireEvent.blur(getPasswordInput());
    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('When the user fills and blur the password input with a value without one number', () => {
  it(`Must display the validation message ${passwordValidationMessage}`, () => {
    const passwordWithoutNumber = 'asdfghjK';
    fireEvent.change(getPasswordInput(), {
      target: { value: passwordWithoutNumber },
    });
    fireEvent.blur(getPasswordInput());
    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('When the user fills and blur the password input with a value without one special character', () => {
  it(`Must display the validation message ${passwordValidationMessage}`, () => {
    const passwordWithoutSpecialChar = 'asdfghj9';
    fireEvent.change(getPasswordInput(), {
      target: { value: passwordWithoutSpecialChar },
    });
    fireEvent.blur(getPasswordInput());
    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument();
  });
});

describe('When the user fills and blur the password input with a invalid value and then change with valid value and blur again', () => {
  it('Must not display the validation message', () => {
    const passwordWithoutSpecialChar = 'asdfghj9';
    const validPassword = 'aA1asdasda#';
    fireEvent.change(getPasswordInput(), {
      target: { value: passwordWithoutSpecialChar },
    });
    fireEvent.blur(getPasswordInput());
    expect(screen.getByText(passwordValidationMessage)).toBeInTheDocument();
    fireEvent.change(getPasswordInput(), {
      target: { value: validPassword },
    });
    fireEvent.blur(getPasswordInput());
    expect(
      screen.queryByText(passwordValidationMessage),
    ).not.toBeInTheDocument();
  });
});
