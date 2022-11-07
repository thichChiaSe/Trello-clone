import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  TablePagination,
  Theme,
  Typography,
} from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import districtsApi from 'api/districtsApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { Districts, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DistrictsFilter from '../components/DistrictsFilter';
import DistrictsForm from '../components/DistrictsForm';
import DistrictsTable from '../components/DistrictsTable';
import {
  districtsActions,
  selectDistrictsFilter,
  selectDistrictsList,
  selectDistrictsLoading,
  selectDistrictsPageCount,
  selectDistrictsTotalRow,
} from '../districtsSlice';

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
  const districtsList = useAppSelector(selectDistrictsList);
  const pageCount = useAppSelector(selectDistrictsPageCount);
  const totalRow = useAppSelector(selectDistrictsTotalRow);

  const filter = useAppSelector(selectDistrictsFilter);

  const loading = useAppSelector(selectDistrictsLoading);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageIndex, setPageIndex] = React.useState(1);

  const [openPopup, setOpenPopup] = useState(false);
  const [districts, setDistricts] = useState<Districts>();

  const initialValues: Districts = {
    provinceCode: '',
    code: '',
    type: '',
    name: '',
    pathWithType: '',
    slug: '',
    ...districts,
  } as Districts;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(districtsActions.fetchDistrictsList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      districtsActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      districtsActions.setFilter({
        ...filter,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };

  const handleEditDistricts = async (districts: Districts) => {
    setOpenPopup(true);
    setDistricts(districts);
  };
  const handleRemoveDistricts = async (districts: Districts) => {
    try {
      // Remove districts API
      await districtsApi.remove(districts?.id || '');

      toast.success(t('Remove districts successfully'));

      // Trigger to re-fetch districts list with current filter
      const newFilter = { ...filter };
      dispatch(districtsActions.fetchDistrictsList(newFilter));
    } catch (error) {
      // Toast error
    }
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(districtsActions.setFilterWithDebounce(newFilter));
  };
  const handleFillterChange = (newFilter: ListParams) => {
    dispatch(districtsActions.setFilter(newFilter));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('District population management')}
          </Typography>
        </Box>
        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <DistrictsFilter
              filter={filter}
              onChange={handleFillterChange}
              onSearchChange={handleSearchChange}
            />
          </Grid>
          <Grid
            width="100%"
            xs={4}
            md={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CommonButton onClick={() => setOpenPopup(true)} variant="contained">
              <AddIcon />
            </CommonButton>
          </Grid>
        </Grid>
        <DistrictsTable
          districtsList={districtsList}
          onEdit={handleEditDistricts}
          onRemove={handleRemoveDistricts}
        />
        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            count={pageCount}
            page={filter.pageIndex + 1}
            onChange={(e, page) => handlePageChange(e, page - 1)}
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
          title={initialValues?.id ? t('update district') : t('create district')}
          subtitle={t('Fill in required fields below')}
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
