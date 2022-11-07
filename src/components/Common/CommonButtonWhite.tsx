import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
export const CommonButtonWhite = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#EDF3EF'),
  backgroundColor: '#EDF3EF',
  '&:hover': {
    backgroundColor: '#B9C4C0',
  },
}));
