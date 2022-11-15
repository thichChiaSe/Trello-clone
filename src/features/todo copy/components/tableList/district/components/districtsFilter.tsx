import { Box, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from '@mui/icons-material';
import React from 'react';
import { t } from 'i18next';

export default function DistrictsFilter() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '15px' }}>
            <InputLabel htmlFor="searchByName">{t('Search')}</InputLabel>
            <OutlinedInput
              id="searchByName"
              label={t('Search')}
              endAdornment={<Search />}
              style={{ borderRadius: '5px', backgroundColor: '#FFFF' }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
