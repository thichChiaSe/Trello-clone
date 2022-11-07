import { MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ButtonCountries = () => {
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState('');
  console.log({ country });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value as string);
  };
  const handleClick = (lang: string | undefined) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Box width={150}>
      <TextField
        label={t('Select language')}
        select
        onChange={handleChange}
        value={country}
        sx={{ width: '150px' }}
      >
        <MenuItem value="vn" onClick={() => handleClick('vn')}>
          VN
        </MenuItem>
        <MenuItem value="en" onClick={() => handleClick('en')}>
          EN
        </MenuItem>
      </TextField>
    </Box>
  );
};
