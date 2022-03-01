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

const Content = ({ isSearchApplied }) => {
  return isSearchApplied ? (
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
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar src='/logo192.png' alt='test' />
                <Link href='http://localhost:3000/test'>Test</Link>
              </TableCell>
              <TableCell>10</TableCell>
              <TableCell>5</TableCell>
              <TableCell>2</TableCell>
              <TableCell>2020-04-01</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={1}
        rowsPerPage={10}
        page={0}
        onChangePage={() => {}}
        onChangeRowsPerPage={() => {}}
      />
    </>
  ) : (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height={400}>
      <Typography>
        Please provide a search option and click in the search button
      </Typography>
    </Box>
  );
};

export default Content;

Content.propTypes = {
  isSearchApplied: PropTypes.bool.isRequired,
};
