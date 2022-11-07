import { Box, LinearProgress, Theme, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { selectCustomerLoading } from '../customerSlice';
import { viVN } from '@mui/material/locale';
import { t } from 'i18next';
import CustomerTabs from '../components/CustomerTabs';
import { useAppSelector } from 'app/hooks';

const theme = createTheme({}, viVN);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',

      marginBottom: 16,
    },

    loading: {
      position: 'absolute',
      top: -8,
      width: '100%',
    },
    filter: {
      width: '100%',
      display: 'flex',
      justifyItems: 'space-between',
      alignItems: 'center',
    },
  })
);

export default function ListPage() {
  const loading = useAppSelector(selectCustomerLoading);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '15px' }}>
        {loading && <LinearProgress className={classes.loading} />}
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('PERSONAL DATA MANAGEMENT')}
          </Typography>
        </Box>
        <CustomerTabs />
      </div>
    </ThemeProvider>
  );
}
