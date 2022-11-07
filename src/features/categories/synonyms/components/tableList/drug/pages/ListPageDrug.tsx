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
import { useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import DrugFilters from '../components/drugFilter';
import DrugForm from '../components/drugForm';
import DrugTable from '../components/drugTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { viVN } from '@mui/material/locale';
import { t } from 'i18next';
import {
  drugActions,
  selectDrugFilter,
  selectDrugList,
  selectDrugLoading,
  selectDrugPageCount,
  selectDrugTotalRow,
} from 'features/categories/drug/drugSlice';

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

export default function ListPageDrug() {
  const match = useRouteMatch();
  const history = useHistory();

  const drugList = useAppSelector(selectDrugList);
  const totalRow = useAppSelector(selectDrugTotalRow);
  const pageCount = useAppSelector(selectDrugPageCount);
  const filter = useAppSelector(selectDrugFilter);
  const loading = useAppSelector(selectDrugLoading);

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const [openPopup, setOpenPopup] = useState(false);
  const [drug, setDrug] = useState<Drug>();

  const initialValues: Drug = {
    name: '',
    ...drug,
  } as Drug;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(drugActions.fetchDrugList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      drugActions.setFilter({
        ...filter,
        page,
      })
    );
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(1);
    dispatch(
      drugActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
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
    history.push(`${match.url}/${drug.id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        {loading && <LinearProgress className={classes.loading} />}
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

        <DrugTable drugList={drugList} onEdit={handleEditDrug} onRemove={handleRemoveDrug} />

        <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
          <Pagination
            color="primary"
            variant="outlined"
            shape="rounded"
            count={Math.ceil(totalRow / pageSize)}
            page={pageIndex}
            onChange={handlePageChange}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRow}
            rowsPerPage={pageSize}
            page={pageIndex - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        <Popup
          title={initialValues?.id ? t('Update synonyms') : t('Create synonyms')}
          subtitle={t('Fill in required fields below')}
          openPopup={openPopup}
          onClose={() => setOpenPopup(false)}
        >
          <DrugForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
