/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen } from '@testing-library/react';
import GitHubSearchPage from './github-search-page';

beforeEach(() => render(<GitHubSearchPage />));

describe('When the GitHubSearchPage is mounted', () => {
  it('Must display the title', () => {
    expect(
      screen.getByRole('heading', { name: /github repositories list/i })
    ).toBeInTheDocument();
  });
  it('Must be an input text with label "filter by" field.', () => {
    expect(screen.getByLabelText(/filter by/i)).toBeInTheDocument();
  });
  it('Must be a Search Button.', () => {
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  it('Must be a initial message "Please provide a search option and click in the search button"', () => {
    expect(
      screen.getByText(
        /please provide a search option and click in the search button/i
      )
    ).toBeInTheDocument();
  });
});
