/* eslint-disable testing-library/prefer-presence-queries */
import React from 'react';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Form from './form';

const server = setupServer(
  rest.post('/products', (req, res, ctx) => {
    return res(ctx.status(201));
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<Form />));

describe('When the form is mounted', () => {
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
  it('Should display validation messages', async () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /submit/i })).not.toBeDisabled()
    );
  });
});

describe('If the user blurs a field that is empty.', () => {
  it('Then the form must display the required message for the input name', () => {
    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/name/i), {
      target: { name: 'name', value: '' },
    });
    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument();
  });
  it('Then the form must display the required message for the input size', () => {
    expect(screen.queryByText(/the size is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/size/i), {
      target: { name: 'size', value: '' },
    });
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument();
  });
  it('Then the form must display the required message for the input type', () => {
    expect(screen.queryByText(/the type is required/i)).not.toBeInTheDocument();
    fireEvent.blur(screen.getByLabelText(/type/i), {
      target: { name: 'type', value: '' },
    });
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument();
  });
});

describe('When the user submits the form', () => {
  it('Should the submit button be disabled until the request is done', async () => {
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    expect(submitBtn).not.toBeDisabled();
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();
    await waitFor(() => expect(submitBtn).not.toBeDisabled());
  });
});
