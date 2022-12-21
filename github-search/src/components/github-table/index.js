import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open issues',
  'Updated at',
];

const GitHubTable = ({ reposList }) => (
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {tableHeaders.map((name) => (
            <TableCell key={name}>{name}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      {reposList.map(
        ({
          id,
          name,
          owner: { avatar_url: avatarUrl },
          html_url: htmlUrl,
          stargazers_count: stargazersCount,
          forks_count: forksCount,
          open_issues_count: openIssuesCount,
          updated_at: updatedAt,
        }) => (
          <TableBody key={id}>
            <TableRow>
              <TableCell>
                <Avatar src={avatarUrl} alt={name} />
                <Link href={htmlUrl}>{name}</Link>
              </TableCell>
              <TableCell>{stargazersCount}</TableCell>
              <TableCell>{forksCount}</TableCell>
              <TableCell>{openIssuesCount}</TableCell>
              <TableCell>{updatedAt}</TableCell>
            </TableRow>
          </TableBody>
        )
      )}
    </Table>
  </TableContainer>
);

export default GitHubTable;

GitHubTable.propTypes = {
  reposList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
