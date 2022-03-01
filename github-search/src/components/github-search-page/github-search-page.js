import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

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
      <table>
        <thead>
          <tr>
            <th>Repository</th>
            <th>Stars</th>
            <th>Forks</th>
            <th>Open issues</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Test</td>
            <td>10</td>
            <td>5</td>
            <td>2</td>
            <td>2020-04-01</td>
          </tr>
        </tbody>
      </table>
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
