/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
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

describe('When the developer does a search', () => {
  const fireClickSearch = () =>
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
  it('The search button should be disabled until the search is done.', async () => {
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).not.toBeDisabled();
    fireClickSearch();
    expect(searchButton).toBeDisabled();
    await waitFor(() => expect(searchButton).not.toBeDisabled());
  });
  it('The data should be displayed as a sticky table.', async () => {
    fireClickSearch();
    await waitFor(() =>
      expect(
        screen.queryByText(
          /please provide a search option and click in the search button/i
        )
      ).not.toBeInTheDocument()
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('The table headers must contain: Repository, stars, forks, open issues and updated at', async () => {
    fireClickSearch();
    const table = await screen.findByRole('table');
    const tableHeaders = within(table).getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(5);
    const [repository, stars, forks, openIssues, updatedAt] = tableHeaders;
    expect(repository).toHaveTextContent(/repository/i);
    expect(stars).toHaveTextContent(/stars/i);
    expect(forks).toHaveTextContent(/forks/i);
    expect(openIssues).toHaveTextContent(/open issues/i);
    expect(updatedAt).toHaveTextContent(/updated at/i);
  });
  it('Each table result must contain: owner avatar image, name, stars, updated at, forks, open issues. It should have a link that opens in a new tab', async () => {
    fireClickSearch();
    const table = await screen.findByRole('table');
    const withInTable = within(table);
    const tableCells = withInTable.getAllByRole('cell');
    const [repository, stars, forks, openIssues, updatedAt] = tableCells;
    // eslint-disable-next-line jest/valid-expect
    expect(within(repository).getByRole('img', { name: /test/i }));
    expect(tableCells).toHaveLength(5);
    expect(repository).toHaveTextContent(/test/i);
    expect(stars).toHaveTextContent(/10/i);
    expect(forks).toHaveTextContent(/5/i);
    expect(openIssues).toHaveTextContent(/2/i);
    expect(updatedAt).toHaveTextContent(/2020-04-01/i);
    // eslint-disable-next-line testing-library/no-node-access
    expect(withInTable.getByText(/test/i).closest('a')).toHaveAttribute(
      'href',
      'http://localhost:3000/test'
    );
  });
  it('Must display total results number of the search and the current number of results.', async () => {
    fireClickSearch();
    await screen.findByRole('table');
    expect(screen.getByText(/1–1 of 1/i)).toBeInTheDocument();
  });
});
