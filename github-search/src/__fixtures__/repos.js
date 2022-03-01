export const makeFakeResponse = ({ totalCount }) => ({
  total_count: totalCount,
  items: [],
});

export const makeFakeRepo = () => ({
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
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  makeFakeResponse,
  makeFakeRepo,
};
