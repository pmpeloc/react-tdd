import React from 'react';
import { screen } from '@testing-library/react';

import { AppRouter } from './app-router';
import { renderWithRouter } from './utils/tests';

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
