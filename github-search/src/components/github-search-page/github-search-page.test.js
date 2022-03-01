/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import GitHubSearchPage from './github-search-page';

const fakeRepo = {
  id: '10270250',
  name: 'react',
  owner: {
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
  html_url: 'https://github.com/facebook/react',
  updated_at: '2022-03-01',
  stargazers_count: 183116,
  forks_count: 37407,
  open_issues_count: 975,
};

const server = setupServer(
  rest.get('/search/repositories', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        total_count: 2729858,
        incomplete_results: false,
        items: [fakeRepo],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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
  it('Results size per page select/combobox with the options: 30, 50, 100.', async () => {
    fireClickSearch();
    await screen.findByRole('table');
    expect(screen.getByLabelText(/rows per page/i)).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));
    const listbox = screen.getByRole('listbox', { name: /rows per page/i });
    const options = within(listbox).getAllByRole('option');
    const [option30, option50, option100] = options;
    expect(option30).toHaveTextContent(/30/);
    expect(option50).toHaveTextContent(/50/);
    expect(option100).toHaveTextContent(/100/);
  });
  it('Must exists the next and previous pagination button', async () => {
    fireClickSearch();
    await screen.findByRole('table');
    const previousPageBtn = screen.getByRole('button', {
      name: /previous page/i,
    });
    const nextPageBtn = screen.getByRole('button', { name: /next page/i });
    screen.getByRole('button', { name: /previous page/i });
    expect(previousPageBtn).toBeInTheDocument();
    expect(nextPageBtn).toBeInTheDocument();
    expect(previousPageBtn).toBeDisabled();
  });
});

describe('When the developer does a search without results', () => {
  it.todo('Must show a empty state message');
});
