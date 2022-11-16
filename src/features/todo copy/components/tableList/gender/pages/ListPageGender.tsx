import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Grid, LinearProgress, TablePagination, Theme } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import genderApi from 'api/genderApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CommonButton } from 'components/Common/CommonButton';
import Popup from 'components/Common/PopUp';
import { t } from 'i18next';
import { Gender } from 'models/gender';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import GenderForm from '../components/genderForm';
import GenderTable from '../components/genderTable';
import {
  genderActions,
  selectGenderFilter,
  selectGenderList,
  selectGenderLoading,
} from '../genderSlice';

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
      right: '180px',
      top: '190px',
      minWidth: '25px!important',
      maxWidth: '25px!important',
      height: '25px',
    },
  })
);

export default function ListPageGender() {
  const genderList = useAppSelector(selectGenderList);
  const filter = useAppSelector(selectGenderFilter);
  const loading = useAppSelector(selectGenderLoading);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const [openPopup, setOpenPopup] = useState(false);
  const [gender, setGender] = useState<Gender>();

  const initialValues: Gender = {
    name: '',
    ...gender,
  } as Gender;

  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(genderActions.fetchGenderList(filter));
  }, [dispatch, filter]);

  const handleRemoveGender = async (gender: Gender) => {
    try {
      // Remove gender API
      await genderApi.remove(gender?.id || '');
      toast.success(`${t('Remove success')}!`);
      // Trigger to re-fetch gender list with current filter
      const newFilter = { ...filter };
      dispatch(genderActions.fetchGenderList(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch gender', error);
    }
  };

  const handleEditGender = async (gender: Gender) => {
    setGender(gender);
    setOpenPopup(true);
    console.log('clcik');
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

        <GenderTable
          genderList={genderList}
          onEdit={handleEditGender}
          onRemove={handleRemoveGender}
        />

        <Popup
          title={initialValues?.id ? t('Update') : t('Create')}
          subtitle={t('Fill in required fields below')}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setGender(undefined);
          }}
        >
          <GenderForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Container>
    </ThemeProvider>
  );
}
