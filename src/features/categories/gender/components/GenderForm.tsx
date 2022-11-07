import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import genderApi from 'api/genderApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Gender } from 'models';
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
  name: yup.string().required(t('Gender name is required')),
  order: yup.string().required(t('Order is required')),
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
      await genderApi.update(formValues);
      toast.success(`${t('Update gender successfully')}!`);
    } else {
      await genderApi.add(formValues);
      toast.success(`${t('Create gender successfully')}!`);
    }
    dispatch(genderActions.fetchGenderList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleGenderFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder={t('Input gender')}
          label={`${t('Gender name')}*`}
        />
        <InputField
          name="order"
          control={control}
          placeholder={t('Order')}
          label={`${t('Order')}*`}
        />

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
