import { Box, Grid, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from '@mui/icons-material';
import { ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';
import { t } from 'i18next';
export interface DistrictsFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}
export default function DistrictsFilter({
  filter,
  onChange,
  onSearchChange,
}: DistrictsFilterProps) {
  const searchRef = useRef<HTMLInputElement>();
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name: e.target.value,
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
              id="name"
              label={t('Search')}
              endAdornment={<Search />}
              defaultValue={filter.name}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
