import { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Content from '../content';
import { getRepos } from '../../services';

export const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [reposList, setReposList] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const didMount = useRef(false);

  const searchHandler = useCallback(async () => {
    setIsSearching(true);
    const res = await getRepos({ q: searchBy, rowsPerPage });
    const data = await res.json();
    setReposList(data.items);
    setIsSearchApplied(true);
    setIsSearching(false);
  }, [rowsPerPage, searchBy]);

  const changeHandler = ({ target: { value } }) => setSearchBy(value);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    searchHandler();
  }, [searchHandler]);

  return (
    <Container>
      <Box my={4}>
        <Typography component='h1' variant='h3'>
          GitHub repositories list
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent='space-between'>
        <Grid item md={6} xs={12}>
          <TextField
            value={searchBy}
            onChange={changeHandler}
            fullWidth
            label='Filter by'
            id='filterBy'
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Button
            disabled={isSearching}
            fullWidth
            color='primary'
            variant='contained'
            onClick={searchHandler}>
            Search
          </Button>
        </Grid>
      </Grid>
      <Box my={4}>
        <Content
          isSearchApplied={isSearchApplied}
          reposList={reposList}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default GitHubSearchPage;
