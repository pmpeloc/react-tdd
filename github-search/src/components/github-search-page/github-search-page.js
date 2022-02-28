import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const GitHubSearchPage = () => {
  return (
    <>
      <Typography component='h1' variant='h3'>
        GitHub repositories list
      </Typography>
      <TextField label='Filter by' id='filterBy' />
      <Button>Search</Button>
    </>
  );
};

export default GitHubSearchPage;
