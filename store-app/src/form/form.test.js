/* eslint-disable testing-library/prefer-presence-queries */
import React from 'react';
import { screen, render } from '@testing-library/react';

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
});
