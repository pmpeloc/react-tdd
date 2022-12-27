import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';

import { AppRouter } from './app-router';
import {
  fillInputs,
  getSendButton,
  goTo,
  renderWithAuthProvider,
} from './utils/tests';
import { handlers } from './mocks/handlers';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('When the user is not authenticated and enters on admin page', () => {
  it('Must be redirect to login page', () => {
    goTo('/admin');
    renderWithAuthProvider(<AppRouter />);
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('When the user is not authenticated and enters on employee page', () => {
  it('Must be redirect to login page', () => {
    goTo('/employee');
    renderWithAuthProvider(<AppRouter />);
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('When the user is authenticated and enters on admin page', () => {
  it('Must not be redirect to login page', () => {
    goTo('/admin');
    renderWithAuthProvider(<AppRouter />, { isAuth: true });
    expect(screen.getByText(/admin page/i)).toBeInTheDocument();
  });
});

describe('When the admin is authenticated in login page', () => {
  it('Must be redirected to admin page', async () => {
    // Go to login page
    renderWithAuthProvider(<AppRouter />);
    // Fill form as admin
    fillInputs({ email: 'admin@mail.com' });
    // Submit form
    fireEvent.click(getSendButton());
    // Expect admin page
    expect(await screen.findByText(/admin page/i)).toBeInTheDocument();
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument();
  });
});
