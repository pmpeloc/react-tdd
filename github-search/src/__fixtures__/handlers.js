/* eslint-disable import/no-anonymous-default-export */
import { OK_STATUS } from '../constants';
import { getReposPerPage, makeFakeResponse } from './repos';

export const paginatedHandler = (req, res, ctx) =>
  res(
    ctx.status(OK_STATUS),
    ctx.json({
      ...makeFakeResponse(),
      items: getReposPerPage({
        perPage: Number(req.url.searchParams.get('per_page')),
        currentPage: Number(req.url.searchParams.get('page')),
      }),
    })
  );

export default {
  paginatedHandler,
};
