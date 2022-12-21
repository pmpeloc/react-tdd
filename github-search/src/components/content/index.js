import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Content = ({ isSearchApplied, reposList, children }) => {
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
    return children;
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
  reposList: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node.isRequired,
};
