import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/hooks';
import { Header } from 'components/Common/header';
import { authActions } from 'features/auth/authSlice';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { AppRoutes } from './AppRoutes';
import { MenuList } from './MenuList';
import { ButtonCountries } from 'components/Common/ButtonCountries';

const drawerWidth: number = 250;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

export function AppLayout() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(authActions.getUserInfo());
  }, [dispatch]);

  return (
    <Box sx={{ display: 'flex' }}>
      <ScrollToTop
        smooth
        viewBox="0 0 24 24"
        svgPath="M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21"
      />
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'flex-start',
            px: [2],
          }}
        >
          {open && (
            <Typography
              sx={{
                textAlign: 'center',
                marginRight: '50px',
                fontWeight: 'bold',
              }}
            >
              {t('Trolle')}
            </Typography>
          )}
          <IconButton onClick={toggleDrawer}>
            {open && <ChevronLeftIcon />}
            {!open && <MenuIcon />}
          </IconButton>
        </Toolbar>
        {/* <Divider /> */}
        <MenuList />
        <div className="switch-language">
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
            style={{ position: 'absolute', bottom: '60px' }}
          >
            <ButtonCountries />
          </ul>
        </div>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Header />
        <div style={{ maxHeight: 'calc(100vh - 64px)', overflow: 'auto' }}>
          <AppRoutes />
        </div>
      </Box>
    </Box>
  );
}
