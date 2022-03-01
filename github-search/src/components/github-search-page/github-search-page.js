import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

export const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const clickHandler = async () => {
    setIsSearching(true);
    await Promise.resolve();
    setIsSearchApplied(true);
    setIsSearching(false);
  };

  const renderContent = () =>
    isSearchApplied ? (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Repository</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Forks</TableCell>
              <TableCell>Open issues</TableCell>
              <TableCell>Updated at</TableCell>
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

  return (
    <Container>
      <Typography component='h1' variant='h3'>
        GitHub repositories list
      </Typography>
      <Grid container spacing={2} justifyContent='space-between'>
        <Grid item md={6} xs={12}>
          <TextField fullWidth label='Filter by' id='filterBy' />
        </Grid>
        <Grid item md={3} xs={12}>
          <Button
            disabled={isSearching}
            fullWidth
            color='primary'
            variant='contained'
            onClick={clickHandler}>
            Search
          </Button>
        </Grid>
      </Grid>
      {renderContent()}
    </Container>
  );
};

export default GitHubSearchPage;
