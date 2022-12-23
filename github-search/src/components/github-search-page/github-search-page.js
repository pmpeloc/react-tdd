import React, { useCallback, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import Snackbar from '@mui/material/Snackbar';

import Content from '../content';
import GitHubTable from '../github-table';
import { getRepos } from '../../services';

const ROWS_PER_PAGE_DEFAULT = 30;
const INITIAL_CURRENT_PAGE = 0;
const INITIAL_TOTAL_COUNT = 0;

export const GitHubSearchPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [reposList, setReposList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_DEFAULT);
  const [currentPage, setCurrentPage] = useState(INITIAL_CURRENT_PAGE);
  const [totalCount, setTotalCount] = useState(INITIAL_TOTAL_COUNT);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const didMount = useRef(false);
  const searchByInput = useRef(null);

  const handleSearch = useCallback(async () => {
    try {
      setIsSearching(true);
      const response = await getRepos({
        q: searchByInput.current.value,
        rowsPerPage,
        currentPage,
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setReposList(data.items);
      setTotalCount(data.total_count);
      setIsSearchApplied(true);
      setIsSearching(false);
    } catch (err) {
      const data = await err.json();
      setIsOpen(true);
      setErrorMessage(data.message);
    } finally {
      setIsSearching(false);
    }
  }, [rowsPerPage, currentPage]);

  const handleChangeRowsPerPage = ({ target: { value } }) => {
    setCurrentPage(INITIAL_CURRENT_PAGE);
    setRowsPerPage(parseInt(value, 10));
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleClickSearch = () => {
    if (currentPage === INITIAL_CURRENT_PAGE) {
      handleSearch();
      return;
    }
    setCurrentPage(INITIAL_CURRENT_PAGE);
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    handleSearch();
  }, [handleSearch]);

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
            inputRef={searchByInput}
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
            onClick={handleClickSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      <Box my={4}>
        <Content isSearchApplied={isSearchApplied} reposList={reposList}>
          <>
            <GitHubTable reposList={reposList} />
            <TablePagination
              rowsPerPageOptions={[30, 50, 100]}
              component='div'
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        </Content>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
        message={errorMessage}
      />
    </Container>
  );
};

export default GitHubSearchPage;
