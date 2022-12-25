import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRouter } from './app-router';

describe('When the user is not authenticated and enters on admin page', () => {
  it('Must be redirect to login page', () => {
    window.history.pushState({}, '', '/admin');
    render(
      <Router>
        <AppRouter />
      </Router>,
    );
    // screen.debug();
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});

describe('When the user is not authenticated and enters on employee page', () => {
  it('Must be redirect to login page', () => {
    window.history.pushState({}, '', '/employee');
    render(
      <Router>
        <AppRouter />
      </Router>,
    );
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
