import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdminPage } from './admin-page';
import { AuthContext } from '../../../utils/contexts/auth-context';

describe('When the admin page is mounted', () => {
  it('Must display the admin username', () => {
    render(
      <AuthContext.Provider value={{ user: { username: 'John Doe' } }}>
        <AdminPage />
      </AuthContext.Provider>,
    );
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });
});
