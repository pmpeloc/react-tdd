const baseUrl =
  process.env.NODE_ENV === 'test' ? '' : process.env.REACT_APP_BASE_URL;

export const getRepos = ({ q, rowsPerPage }) =>
  fetch(`${baseUrl}/search/repositories?q=${q}&page=0&per_page=${rowsPerPage}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getRepos,
};
