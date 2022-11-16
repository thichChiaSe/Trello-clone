import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import { Box, Container, Grid, LinearProgress, TablePagination, Theme } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import provinceApi from 'api/province';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';

import { t } from 'i18next';
import { ListParams } from 'models';
import { Province } from 'models/province';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProvinceForm from '../components/provinceForm';
import ProvinceTable from '../components/provinceTable';
import {
  provinceActions,
  selectProvinceFilter,
  selectProvinceList,
  selectProvinceLoading,
  selectProvincePageCount,
  selectProvinceTotalRow,
} from '../provinceSlice';

const theme = createTheme({}, viVN);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      backgroundColor: '#EDF2F6',
    },
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
      right: '947px',
      top: '190px',
      minWidth: '25px!important',
      maxWidth: '25px!important',
      height: '25px',
    },
  })
);

export default function ListPageProvince() {
  const provinceList = useAppSelector(selectProvinceList);
  const pageCount = useAppSelector(selectProvincePageCount);
  const totalRow = useAppSelector(selectProvinceTotalRow);

  const filter = useAppSelector(selectProvinceFilter);
  const loading = useAppSelector(selectProvinceLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageIndex, setPageIndex] = React.useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [province, setProvince] = useState<Province>();

  const initialValues: Province = {
    alias: '',
    ...province,
  } as Province;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(provinceActions.fetchProvinceList(filter));
  }, [dispatch, filter]);

  const handleRemoveProvince = async (province: Province) => {
    try {
      await provinceApi.remove(province?.id || '');
      toast.success(`${t('Remove province successfully')}!`);
      const newFilter = { ...filter };
      dispatch(provinceActions.fetchProvinceList(newFilter));
    } catch (error) {
      console.log('Failed to fetch province', error);
    }
  };
  const handleEditProvince = async (province: Province) => {
    setProvince(province);
    setOpenPopup(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container className="classes.container">
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
              onClick={() => setOpenPopup(true)}
              variant="contained"
              className={classes.btn}
            >
              <AddIcon />
            </CommonButton>
          </Grid>
        </Grid>
        <ProvinceTable
          provinceList={provinceList}
          onRemove={handleRemoveProvince}
          onEdit={handleEditProvince}
        />
        <Popup
          title={initialValues?.id ? t('Update todo') : t('Create todo')}
          subtitle={t('Fill in required fields below')}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setProvince(undefined);
          }}
        >
          <ProvinceForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
