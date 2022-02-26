/* eslint-disable testing-library/prefer-presence-queries */
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import Form from './form';

describe('When the form is mounted', () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  beforeEach(() => render(<Form />));
  it('There must be a create product form page', () => {
    expect(
      screen.getByRole('heading', { name: /create product/i })
    ).toBeInTheDocument();
  });
  it('The form must have the following fields: name, size, type (electronic, furniture, clothing).', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.queryByText(/electronic/i)).toBeInTheDocument();
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument();
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument();
  });
  it('Should exist the submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});

describe('When the user submits the form without values', () => {
  it('Should display validation messages', () => {
    render(<Form />);
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument();
  });
});
