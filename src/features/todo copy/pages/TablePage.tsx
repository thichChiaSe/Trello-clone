import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import ScrollToTop from 'react-scroll-to-top';
import { Box, Container, LinearProgress, Theme, Typography } from '@mui/material';
import ListPageProvince from '../components/tableList/province/pages/ListPageInprogress';
import ListPageDistrict from '../components/tableList/district/pages/ListPagePending';
import ListPageGender from '../components/tableList/gender/pages/ListPageGender';
const theme = createTheme({}, viVN);
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: ' space-between',
      alignItems: 'center',
      marginBottom: 16,
      marginLeft: '500px',
      marginTop: '30px',
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
      alignItems: ' center',
    },
    text: {},
  })
);
export default function ListPage() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold" className="classes.text">
            Trolle
          </Typography>
        </Box>
        <div style={{ display: 'flex' }}>
          <ListPageProvince />
          <ListPageDistrict />
          <ListPageGender />
        </div>
        <ScrollToTop
          smooth
          viewBox="0 0 24 24"
          svgPath="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"
        />
      </Container>
    </ThemeProvider>
  );
}
