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
import { createStyles, makeStyles } from '@mui/styles';
import drugApi from 'api/drugApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { Drug, ListParams } from 'models';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DrugFilters from '../components/DrugFilters';
import DrugForm from '../components/DrugForm';
import DrugTable from '../components/DrugTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  drugActions,
  selectDrugFilter,
  selectDrugList,
  selectDrugLoading,
  selectDrugPageCount,
  selectDrugTotalRow,
} from '../drugSlice';
import { viVN } from '@mui/material/locale';
import { t } from 'i18next';

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
  const drugList = useAppSelector(selectDrugList);
  const totalRow = useAppSelector(selectDrugTotalRow);
  const pageCount = useAppSelector(selectDrugPageCount);
  const filter = useAppSelector(selectDrugFilter);
  const loading = useAppSelector(selectDrugLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageIndex, setPageIndex] = React.useState(1);

  const [openPopup, setOpenPopup] = useState(false);
  const [drug, setDrug] = useState<Drug>();

  const initialValues: Drug = {
    name: '',
    unit: '',
    order: '',
    ...drug,
  } as Drug;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(drugActions.fetchDrugList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    setPageIndex(page);
    dispatch(
      drugActions.setFilter({
        ...filter,
        pageIndex: page,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      drugActions.setFilter({
        ...filter,
        pageSize: parseInt(event.target.value, 10),
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(drugActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(drugActions.setFilter(newFilter));
  };

  const handleRemoveDrug = async (drug: Drug) => {
    try {
      await drugApi.remove(drug?.id || '');
      toast.success(`${t('Remove drug successfully')}!`);
      const newFilter = { ...filter };
      dispatch(drugActions.fetchDrugList(newFilter));
    } catch (error) {
      console.log('Failed to fetch drug', error);
    }
  };

  const handleEditDrug = async (drug: Drug) => {
    // history.push(`${match.url}/${drug.id}`);
    setOpenPopup(true);
    setDrug(drug);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}

        <Box className={classes.titleContainer}>
          <Typography component="h1" variant="h5" fontWeight="bold">
            {t('Drug category')}
          </Typography>
        </Box>

        <Grid container mb={3}>
          <Grid xs={8} width="100%" md={8}>
            <DrugFilters
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
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CommonButton onClick={() => setOpenPopup(true)} variant="contained">
              <AddIcon />
            </CommonButton>
          </Grid>
        </Grid>

        <DrugTable drugList={drugList} onEdit={handleEditDrug} onRemove={handleRemoveDrug} />

        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            defaultPage={1}
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
          title={initialValues?.id ? t('Update drug') : t('Create drug')}
          subtitle={t('Fill in required fields below')}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setDrug(undefined);
          }}
        >
          <DrugForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
