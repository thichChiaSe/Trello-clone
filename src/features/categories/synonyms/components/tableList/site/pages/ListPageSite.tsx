import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import { Box, Container, Grid, LinearProgress, TablePagination, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { Site, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
import { t } from 'i18next';

import siteApi from 'api/siteApi';
import {
  selectSiteFilter,
  selectSiteList,
  selectSiteLoading,
  selectSitePageCount,
  selectSiteTotalRow,
  siteActions,
} from 'features/categories/site/siteSlice';
import SiteFilter from '../components/sitesFilter';
import SiteTable from '../components/sitesTable';
import SiteForm from '../components/sitesForm';

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

export default function ListPageSite() {
  const siteList = useAppSelector(selectSiteList);
  const pageCount = useAppSelector(selectSitePageCount);
  const totalRow = useAppSelector(selectSiteTotalRow);

  const filter = useAppSelector(selectSiteFilter);
  const loading = useAppSelector(selectSiteLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageIndex, setPageIndex] = React.useState(0);

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
  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      siteActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      siteActions.setFilter({
        ...filter,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };

  const handleRemoveSite = async (site: Site) => {
    try {
      //Remove site API
      await siteApi.remove(site?.id || '');
      toast.success(`${t('Remove site successfully')}!`);
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

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(siteActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(siteActions.setFilter(newFilter));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}
        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <SiteFilter
              filter={filter}
              onChange={handleFilterChange}
              onSearchChange={handleSearchChange}
            />
          </Grid>
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
            <CommonButton onClick={() => setOpenPopup(true)} variant="contained">
              <AddIcon style={{ marginRight: '10px' }} />
              {t('Create synonyms')}
            </CommonButton>
          </Grid>
        </Grid>
        <SiteTable siteList={siteList} onRemove={handleRemoveSite} onEdit={handleEditSite} />
        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            count={pageCount}
            page={filter.pageIndex + 1}
            onChange={handlePageChange}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRow}
            rowsPerPage={filter.pageSize}
            page={filter.pageIndex}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <Popup
          title={initialValues?.id ? t('Update synonyms') : t('Create synonyms')}
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
