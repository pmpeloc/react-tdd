/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import GitHubSearchPage from './github-search-page';
import { makeFakeRepo, makeFakeResponse } from '../../__fixtures__/repos';
import { OK_STATUS } from '../../constants';
import { paginatedHandler } from '../../__fixtures__/handlers';

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

describe('When the developer does a search and selects 50 rows per page', () => {
  it('Must fetch a new search and display 50 rows results on the table', async () => {
    server.use(rest.get('/search/repositories', paginatedHandler));
    fireClickSearch();
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(await screen.findAllByRole('row')).toHaveLength(31);
    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));
    fireEvent.click(screen.getByRole('option', { name: '50' }));
    setTimeout(async () => {
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled()
      );
      expect(screen.getAllByRole('row')).toHaveLength(51);
    }, 30000);
  }, 50000);
});

describe('When the developer clicks on search and then on next page button', () => {
  it('must display the next repositories page', async () => {
    // Config server handler
    server.use(rest.get('/search/repositories', paginatedHandler));
    // Click search
    fireClickSearch();
    // Wait table
    expect(await screen.findByRole('table')).toBeInTheDocument();
    // Expect fist repo name is form page 0
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
    // Expect next page is not disabled
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).not.toBeDisabled();
    // Click next page button
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    // Wait search button is not disabled
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );
    // Expect first repo name is from page 1
    expect(screen.getByRole('cell', { name: /2-0/ })).toBeInTheDocument();
  }, 30000);
});

describe('When the developer clicks on search and then on next page button and then on previous page button', () => {
  it('Must display the previous repositories page', async () => {
    server.use(rest.get('/search/repositories', paginatedHandler));
    fireClickSearch();
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );
    expect(screen.getByRole('cell', { name: /2-0/ })).toBeInTheDocument();
    // Click previous page
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    // Wait search finish
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );
    // Expect
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
  }, 30000);
});

describe('When the developer does a search and clicks on next page button and selects 50 rows per page', () => {
  it('Must display the results of the first page', async () => {
    server.use(rest.get('/search/repositories', paginatedHandler));
    fireClickSearch();
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    setTimeout(async () => {
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled()
      );
      expect(screen.getByRole('cell', { name: /2-0/ })).toBeInTheDocument();
    }, 30000);
    fireEvent.mouseDown(screen.getByLabelText(/rows per page/i));
    fireEvent.click(screen.getByRole('option', { name: '50' }));
    setTimeout(async () => {
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled()
      );
      expect(screen.getAllByRole('row')).toHaveLength(51);
    }, 50000);
    // Expect first page
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
  }, 100000);
});

describe('When the developer does a search and clicks on next page button and clicks on search again', () => {
  it('Must display the results of the first page', async () => {
    server.use(rest.get('/search/repositories', paginatedHandler));
    fireClickSearch();
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /next page/i })
    ).not.toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );
    expect(screen.getByRole('cell', { name: /2-0/ })).toBeInTheDocument();
    fireClickSearch();
    await waitFor(
      () =>
        expect(
          screen.getByRole('button', { name: /search/i })
        ).not.toBeDisabled(),
      { timeout: 3000 }
    );
    // Expect first page
    expect(screen.getByRole('cell', { name: /1-0/ })).toBeInTheDocument();
  }, 30000);
});
