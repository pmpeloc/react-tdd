import React from 'react';
import { render, screen } from '@testing-library/react';
import GitHubSearchPage from './github-search-page';

describe('When the GitHubSearchPage is mounted', () => {
  it('Must display the title', () => {
    render(<GitHubSearchPage />);
    expect(
      screen.getByRole('heading', { name: /github repositories list/i })
    ).toBeInTheDocument();
  });
});
