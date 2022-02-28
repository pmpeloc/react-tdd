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
      {isSearchApplied ? (
        <table />
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
      )}
    </Container>
  );
};

export default GitHubSearchPage;
