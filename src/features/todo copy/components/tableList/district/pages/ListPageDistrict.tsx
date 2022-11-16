import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import { Box, Container, Grid, LinearProgress, TablePagination, Theme } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import districtsApi from 'api/districtApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';

import { t } from 'i18next';
import { Districts } from 'models/district';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DistrictsFilter from '../components/districtsFilter';
import DistrictsForm from '../components/districtsForm';
import DistrictsTable from '../components/districtsTable';
import {
  districtsActions,
  selectDistrictsFilter,
  selectDistrictsList,
  selectDistrictsLoading,
  selectDistrictsPageCount,
  selectDistrictsTotalRow,
} from '../districtSlice';

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
      right: '565px',
      top: '190px',
      minWidth: '25px!important',
      maxWidth: '25px!important',
      height: '25px',
    },
  })
);

export default function ListPageDistrict() {
  const districtsList = useAppSelector(selectDistrictsList);
  const pageCount = useAppSelector(selectDistrictsPageCount);
  const totalRow = useAppSelector(selectDistrictsTotalRow);
  const classes = useStyles();
  const filter = useAppSelector(selectDistrictsFilter);
  const loading = useAppSelector(selectDistrictsLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [openPopup, setOpenPopup] = useState(false);
  const [districts, setDistricts] = useState<Districts>();

  const initialValues: Districts = {
    alias: '',
    ...districts,
  } as Districts;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(districtsActions.fetchDistrictsList(filter));
  }, [dispatch, filter]);

  // const handleEditDistricts =
  const handleRemoveDistricts = async (districts: Districts) => {
    try {
      await districtsApi.remove(districts?.id || '');
      toast.success(`${t('Remove district successfully')}!`);
      const newFilter = { ...filter };
      dispatch(districtsActions.fetchDistrictsList(newFilter));
    } catch (error) {
      console.log('Failed to fetch district', error);
    }
  };

  const handleEditDistricts = async (districts: Districts) => {
    setOpenPopup(true);
    setDistricts(districts);
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
        <DistrictsTable
          districtsList={districtsList}
          onEdit={handleEditDistricts}
          onRemove={handleRemoveDistricts}
        />
        <Popup
          title={initialValues?.id ? t('Update') : t('Create ')}
          subtitle={t('Please enter all information in the box below')}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setDistricts(undefined);
          }}
        >
          <DistrictsForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
