import React from 'react';
import {
  screen,
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

import { LoginPage } from './login-page';
import { handlerInvalidCredentials, handlers } from '../../../mocks/handlers';
import { HTTP_UNEXPECTED_ERROR_STATUS } from '../../../consts';

const getPasswordInput = () => screen.getByLabelText(/password/i);
const getSendButton = () => screen.getByRole('button', { name: /send/i });
const fillInputs = ({
  email = 'john.doe@test.com',
  password = 'Aa123456789!@#',
} = {}) => {
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: email },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: password },
  });
};

const passwordValidationMessage =
  'The password must contain at least 8 characters, one upper case letter, one number and one special character';

const server = setupServer(...handlers);

beforeEach(() => render(<LoginPage />));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('When login page is mounted', () => {
  it('Must display the login title', () => {
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('Must have a form with the following fields: email, password and submit button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(getSendButton());
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
    fireEvent.click(getSendButton());
    expect(screen.getByText(/The email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/The password is required/i)).toBeInTheDocument();
  });
});

describe('When the user fills the fields and clicks the submit button', () => {
  it('must not display the required messages', () => {
    fillInputs();
    fireEvent.click(getSendButton());
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

describe('When the user submit the login form with valid data', () => {
  it('Must disable the submit button while the form page is fetching the data', async () => {
    fillInputs();
    fireEvent.click(getSendButton());
    expect(getSendButton()).toBeDisabled();
    await waitFor(() => expect(getSendButton()).not.toBeDisabled());
  });

  it('Must be a loading indicator at the top of the form while it is fetching', async () => {
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    fillInputs();
    fireEvent.click(getSendButton());
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('loading-indicator'),
    );
  });
});

describe('When the user submit the login form with valid data and there ir an unexpected server error', () => {
  it('Must display the error message "Unexpected error, please try again" from the api', async () => {
    // Setup config the server
    server.use(
      rest.post('/login', (req, res, ctx) =>
        res(
          ctx.status(HTTP_UNEXPECTED_ERROR_STATUS),
          ctx.json({ message: 'Unexpected error, please try again' }),
        ),
      ),
    );
    expect(
      await screen.queryByText(/unexpected error, please try again/i),
    ).not.toBeInTheDocument();
    // Trigger submit form
    fillInputs();
    fireEvent.click(getSendButton());
    // Expect display message error
    expect(
      await screen.findByText(/unexpected error, please try again/i),
    ).toBeInTheDocument();
  });
});

describe('When the user submit the login form with valid data and there is an invalid credentials error', () => {
  it('Must display the error message "The email or password are not correct" from the api', async () => {
    const wrongEmail = 'wrong@mail.com';
    const wrongPassword = 'Aa12345678$';
    // Setup server
    server.use(handlerInvalidCredentials({ wrongEmail, wrongPassword }));
    // Trigger submit form
    expect(
      screen.queryByText(/the email or password are not correct/i),
    ).not.toBeInTheDocument();
    fillInputs({ email: wrongEmail, password: wrongPassword });
    fireEvent.click(getSendButton());
    // Expect error message
    expect(
      await screen.findByText(/the email or password are not correct/i),
    ).toBeInTheDocument();
  });
});
