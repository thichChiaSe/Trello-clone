import { Box, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Search } from '@mui/icons-material';
import { ListParams } from 'models';
import React, { ChangeEvent, useRef } from 'react';
import { t } from 'i18next';

export interface ProvinceFiltersProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function ProvinceFilters({
  filter,
  onChange,
  onSearchChange,
}: ProvinceFiltersProps) {
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

  const inputRef = useRef(null);
  const onButtonClick = () => {
    // @ts-ignore (us this comment if typescript raises an error)
    inputRef.current.value = '';
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clear, setClear] = React.useState('');
  const clearSearch = () => setClear('');
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <FormControl fullWidth variant="outlined" size="small" style={{ marginTop: '15px' }}>
            <InputLabel htmlFor="searchByName">{t('Search')}</InputLabel>
            <OutlinedInput
              onBlur={clearSearch}
              ref={inputRef}
              style={{ borderRadius: '5px', backgroundColor: '#FFFF' }}
              id="searchByName"
              label={t('Search')}
              endAdornment={<Search onClick={onButtonClick} />}
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
