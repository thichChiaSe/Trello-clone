import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import genderApi from 'api/genderApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Gender } from 'models/gender';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { genderActions, selectGenderFilter } from '../genderSlice';

export interface GenderFormProps {
  initialValues?: Gender;
  onClose: () => void;
}

const schema = yup.object().shape({
  alias: yup.string().required('Vui lòng nhập'),
});

export default function GenderForm({ initialValues, onClose }: GenderFormProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectGenderFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Gender>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleGenderFormSubmit = async (formValues: Gender) => {
    if (isEdit) {
      await genderApi.updateSyn(formValues);
      toast.success(`${t('Update success')}!`);
    } else {
      await genderApi.addSyn(formValues);
      toast.success(`${t('Create success')}!`);
    }
    dispatch(genderActions.fetchGenderList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleGenderFormSubmit)}>
        <InputField name="alias" control={control} placeholder={t('Input')} />
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;{t('Confirm')}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
