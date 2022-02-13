import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularLoader() {
  return (
    <Box sx={{ display: 'flex', margin: 'auto' }}>
      <CircularProgress
        size='3rem'
      />
    </Box>
  );
}