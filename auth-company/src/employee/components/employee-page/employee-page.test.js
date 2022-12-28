import React from 'react';
import { screen } from '@testing-library/react';
import { EmployeePage } from './employee-page';
import { AuthContext } from '../../../utils/contexts/auth-context';
import { renderWithAuthProvider } from '../../../utils/tests';

describe('When the admin access to employee page', () => {
  it('Must have access to delete the employee button', () => {
    renderWithAuthProvider(
      <AuthContext.Provider
        value={{ user: { username: 'John Doe', role: 'admin' } }}
      >
        <EmployeePage />
      </AuthContext.Provider>,
    );
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});

describe('When the employee access to employee page', () => {
  it('Must not have access to delete the employee button', () => {
    renderWithAuthProvider(
      <AuthContext.Provider
        value={{ user: { username: 'John Doe', role: 'employee' } }}
      >
        <EmployeePage />
      </AuthContext.Provider>,
    );
    expect(
      screen.queryByRole('button', { name: /delete/i }),
    ).not.toBeInTheDocument();
  });
});
