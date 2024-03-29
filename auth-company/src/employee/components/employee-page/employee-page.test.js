import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { EmployeePage } from './employee-page';
import { AuthContext } from '../../../utils/contexts/auth-context';
import { ADMIN_ROLE, EMPLOYEE_ROLE } from '../../../consts';

const renderWith = ({ role, username = 'John Doe' }) => {
  render(
    <AuthContext.Provider value={{ user: { username, role } }}>
      <EmployeePage />
    </AuthContext.Provider>,
    { wrapper: Router },
  );
};

describe('When the admin access to employee page', () => {
  it('Must have access to delete the employee button', () => {
    renderWith({ role: ADMIN_ROLE });
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});

describe('When the employee access to employee page', () => {
  it('Must not have access to delete the employee button', () => {
    renderWith({ role: EMPLOYEE_ROLE });
    expect(
      screen.queryByRole('button', { name: /delete/i }),
    ).not.toBeInTheDocument();
  });

  it('The employee username should be displayed on the common navbar', () => {
    renderWith({ role: EMPLOYEE_ROLE, username: 'Jane Doe' });
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();
  });
});
