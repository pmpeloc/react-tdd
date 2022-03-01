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
import {
  getReposListBy,
  makeFakeRepo,
  makeFakeResponse,
} from '../../__fixtures__/repos';
import { OK_STATUS } from '../../constants';

const fakeResponse = makeFakeResponse({ totalCount: 1 });
const fakeRepo = makeFakeRepo();
fakeResponse.items = [fakeRepo];

const server = setupServer(
  rest.get('/search/repositories', (req, res, ctx) => {
    return res(ctx.status(OK_STATUS), ctx.json(fakeResponse));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => render(<GitHubSearchPage />));

const fireClickSearch = () =>
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

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
    const avatarImg = within(repository).getByRole('img', {
      name: fakeRepo.name,
    });
    expect(avatarImg).toBeInTheDocument();
    expect(tableCells).toHaveLength(5);
    expect(repository).toHaveTextContent(fakeRepo.name);
    expect(stars).toHaveTextContent(fakeRepo.stargazers_count);
    expect(forks).toHaveTextContent(fakeRepo.forks_count);
    expect(openIssues).toHaveTextContent(fakeRepo.open_issues_count);
    expect(updatedAt).toHaveTextContent(fakeRepo.updated_at);
    // eslint-disable-next-line testing-library/no-node-access
    expect(withInTable.getByText(fakeRepo.name).closest('a')).toHaveAttribute(
      'href',
      fakeRepo.html_url
    );
    expect(avatarImg).toHaveAttribute('src', fakeRepo.owner.avatar_url);
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
  it('Must show a empty state message: "You search has no results"', async () => {
    server.use(
      rest.get('/search/repositories', (req, res, ctx) => {
        return res(ctx.status(OK_STATUS), ctx.json(makeFakeResponse()));
      })
    );
    fireClickSearch();
    // eslint-disable-next-line testing-library/prefer-find-by
    await waitFor(() =>
      expect(screen.getByText(/you search has no results/i)).toBeInTheDocument()
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});

describe('When the developer types on filter by and does a search', () => {
  it('Must display the related repos', async () => {
    const internalFakeResponse = makeFakeResponse();
    const REPO_NAME = 'laravel';
    const expectedRepo = getReposListBy({ name: REPO_NAME })[0];
    server.use(
      rest.get('/search/repositories', (req, res, ctx) =>
        res(
          ctx.status(OK_STATUS),
          ctx.json({
            ...internalFakeResponse,
            items: getReposListBy({ name: req.url.searchParams.get('q') }),
          })
        )
      )
    );
    fireEvent.change(screen.getByLabelText(/filter by/i), {
      target: { value: REPO_NAME },
    });
    fireClickSearch();
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();
    const withInTable = within(table);
    const tableCells = withInTable.getAllByRole('cell');
    const [repository] = tableCells;
    expect(repository).toHaveTextContent(expectedRepo.name);
  });
});
