import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import drugApi from 'api/drugApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { drugActions, selectDrugFilter } from 'features/categories/drug/drugSlice';
import { t } from 'i18next';
import { Drug } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface DrugFormProps {
  initialValues?: Drug;
  onClose: () => void;
}

const schema = yup.object().shape({
  alias: yup.string().required(t('Drug name is required')),
});

export default function DrugForm({ initialValues, onClose }: DrugFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectDrugFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Drug>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleDrugFormSubmit = async (formValues: Drug) => {
    if (isEdit) {
      await drugApi.update(formValues);
    } else {
      await drugApi.add(formValues);
    }
    dispatch(drugActions.fetchDrugList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleDrugFormSubmit)}>
        <InputField
          name="alias"
          control={control}
          placeholder={t('Input synonyms')}
          label={`${t('Input synonyms')}*`}
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
