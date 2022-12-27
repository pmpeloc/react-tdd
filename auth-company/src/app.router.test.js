import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';

import { AppRouter } from './app-router';
import { renderWithRouter } from './utils/tests';
import { handlers } from './mocks/handlers';

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

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('When the user is not authenticated and enters on admin page', () => {
  it('Must be redirect to login page', () => {
    window.history.pushState({}, '', '/admin');
    renderWithRouter(<AppRouter />, { route: '/admin' });
    // screen.debug();
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('When the user is not authenticated and enters on employee page', () => {
  it('Must be redirect to login page', () => {
    window.history.pushState({}, '', '/employee');
    renderWithRouter(<AppRouter />, { route: '/employee' });
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('When the user is authenticated and enters on admin page', () => {
  it('Must not be redirect to login page', () => {
    renderWithRouter(<AppRouter isAuth />, { route: '/admin' });
    expect(screen.getByText(/admin page/i)).toBeInTheDocument();
  });
});

describe('When the admin is authenticated in login page', () => {
  it('Must be redirected to admin page', async () => {
    // Go to login page
    renderWithRouter(<AppRouter isAuth />);
    // Fill form as admin
    fillInputs();
    // Submit form
    fireEvent.click(getSendButton());
    // Expect admin page
    expect(await screen.findByText(/admin page/i)).toBeInTheDocument();
  });
});
