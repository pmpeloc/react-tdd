import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const tableHeaders = [
  'Repository',
  'Stars',
  'Forks',
  'Open issues',
  'Updated at',
];

const Content = ({ isSearchApplied, reposList }) => {
  const renderWithBox = (cb) => (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height={400}>
      {cb()}
    </Box>
  );
  if (isSearchApplied && !!reposList.length) {
    return (
      <>
        <TableContainer>
          <Table>
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
        <TablePagination
          rowsPerPageOptions={[30, 50, 100]}
          component='div'
          count={1}
          rowsPerPage={30}
          page={0}
          onChangePage={() => {}}
          onChangeRowsPerPage={() => {}}
        />
      </>
    );
  }

  if (isSearchApplied && !reposList.length) {
    return renderWithBox(() => (
      <Typography>You search has no results</Typography>
    ));
  }

  return renderWithBox(() => (
    <Typography>
      Please provide a search option and click in the search button
    </Typography>
  ));
};

export default Content;

Content.propTypes = {
  isSearchApplied: PropTypes.bool.isRequired,
  reposList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
