import AddIcon from '@mui/icons-material/Add';
import { Pagination } from '@mui/lab';
import { Box, Container, Grid, TablePagination, Theme, Typography } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import provinceApi from 'api/provinceApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { Province, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProvinceFilters from '../components/ProvinceFilter';
import ProvinceForm from '../components/ProvinceForm';
import {
  provinceActions,
  selectProvinceFilter,
  selectProvinceList,
  selectProvincePageCount,
  selectProvinceTotalRow,
} from '../provinceSlice';
import ProvinceTableTest from '../components/ProvinceTableTest';

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
  const provinceList = useAppSelector(selectProvinceList);
  const pageCount = useAppSelector(selectProvincePageCount);
  const totalRow = useAppSelector(selectProvinceTotalRow);

  const filter = useAppSelector(selectProvinceFilter);

  const [openPopup, setOpenPopup] = useState(false);
  const [province, setProvince] = useState<Province>();

  const initialValues: Province = {
    name: '',
    slug: '',
    type: '',
    nameWithType: '',
    code: '',
    ...province,
  } as Province;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(provinceActions.fetchProvinceList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    console.log({ e, page });

    dispatch(
      provinceActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };

  console.log({ filter });

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      provinceActions.setFilter({
        ...filter,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(provinceActions.setFilterWithDebounce(newFilter));
  };

  const handleFillterChange = (newFilter: ListParams) => {
    dispatch(provinceActions.setFilter(newFilter));
  };
  const handleRemoveProvince = async (province: Province) => {
    try {
      // Remove pri API
      await provinceApi.remove(province?.id || '');
      toast.success(`${t('Remove province successfully')}!`);
      // Trigger to re-fetch province list with current filter
      const newFilter = { ...filter };
      dispatch(provinceActions.fetchProvinceList(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch province', error);
    }
  };

  const handleEditProvince = async (province: Province) => {
    setProvince(province);
    setOpenPopup(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('Province category')}
          </Typography>
        </Box>
        <Grid container mb={3}>
          {/* Search */}
          <Grid xs={8} width="100%" md={8}>
            <ProvinceFilters
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
        <ProvinceTableTest
          provinceList={provinceList}
          onEdit={handleEditProvince}
          onRemove={handleRemoveProvince}
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
          title={initialValues?.id ? t('update province') : t('create province')}
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
