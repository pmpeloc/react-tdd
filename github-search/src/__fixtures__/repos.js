export const makeFakeResponse = ({ totalCount = 0 } = {}) => ({
  total_count: totalCount,
  items: [],
});

export const makeFakeRepo = ({ name = 'react', id = '10270250' } = {}) => ({
  id,
  name,
  owner: {
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
  html_url: 'https://github.com/facebook/react',
  updated_at: '2022-03-01',
  stargazers_count: 183116,
  forks_count: 37407,
  open_issues_count: 975,
});

const reposData = ['go', 'freeCodeCamp', 'laravel', 'Python', 'Java'];
const reposList = reposData.map((name) => makeFakeRepo({ name, id: name }));

export const getReposListBy = ({ name }) =>
  reposList.filter((repo) => repo.name === name);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  makeFakeResponse,
  makeFakeRepo,
  getReposListBy,
};
