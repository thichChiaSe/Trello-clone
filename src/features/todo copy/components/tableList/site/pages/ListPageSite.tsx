import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import { Box, Container, Grid, LinearProgress, TablePagination, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
import { t } from 'i18next';

import siteApi from 'api/siteApi';

import SiteFilter from '../components/sitesFilter';
import SiteTable from '../components/sitesTable';
import SiteForm from '../components/sitesForm';
import { selectSiteFilter, selectSiteList, selectSiteLoading, siteActions } from '../siteSlice';
import { Site } from 'models/site';
import { ListParams } from 'models';

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
    btn: {
      position: 'absolute',
      right: '95px',
      top: '190px',
      minWidth: '25px!important',
      maxWidth: '25px!important',
      height: '25px',
    },
  })
);

export default function ListPageSite() {
  const siteList = useAppSelector(selectSiteList);

  const filter = useAppSelector(selectSiteFilter);
  const loading = useAppSelector(selectSiteLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [openPopup, setOpenPopup] = useState(false);
  const [site, setSite] = useState<Site>();

  const initialValues: Site = {
    alias: '',
    ...site,
  } as Site;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(siteActions.fetchSiteList(filter));
  }, [dispatch, filter]);

  const handleRemoveSite = async (site: Site) => {
    try {
      //Remove site API
      await siteApi.remove(site?.id || '');
      toast.success(`${t('Remove success')}!`);
      // Trigger to re-fetch site list with current filter
      const newFilter = { ...filter };
      dispatch(siteActions.fetchSiteList(newFilter));
    } catch (error) {
      console.log('Failed to fetch site', error);
    }
  };

  const handleEditSite = async (site: Site) => {
    setSite(site);
    setOpenPopup(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}
        <Grid container mb={3}>
          <Grid
            width="100%"
            xs={4}
            md={4}
            container
            display="flex"
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            marginTop="15px"
          >
            <CommonButton
              className={classes.btn}
              onClick={() => setOpenPopup(true)}
              variant="contained"
            >
              <AddIcon />
            </CommonButton>
          </Grid>
        </Grid>
        <SiteTable siteList={siteList} onRemove={handleRemoveSite} onEdit={handleEditSite} />
        <Popup
          title={initialValues?.id ? t('Update') : t('Create')}
          subtitle={t('Fill in required fields below')}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setSite(undefined);
          }}
        >
          <SiteForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
