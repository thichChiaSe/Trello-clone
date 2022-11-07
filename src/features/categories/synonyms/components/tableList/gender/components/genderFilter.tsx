import { Box, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from '@mui/icons-material';
import { ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';
import { t } from 'i18next';

export interface GenderFiltersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function GenderFilters({ filter, onChange, onSearchChange }: GenderFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      searchGender: e.target.value,
      pageIndex: 1,
    };
    onSearchChange(newFilter);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '15px' }}>
            <InputLabel htmlFor="searchByName">{t('Search')}</InputLabel>
            <OutlinedInput
              style={{ borderRadius: '5px', backgroundColor: '#FFFF' }}
              id="searchByName"
              label={t('Search')}
              endAdornment={<Search />}
              defaultValue={filter.searchGender}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
