import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress, MenuItem } from '@mui/material';
import drugApi from 'api/drugApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Drug } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { drugActions, selectDrugFilter } from '../drugSlice';
import { OptionField } from 'components/FormFields/OptionField';
import { toast } from 'react-toastify';
export interface DrugFormProps {
  initialValues?: Drug;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(t('Drugnameisrequired')),
  unit: yup.string().required(t('Drugunitisrequired')),
  order: yup.string().required(t('Orderisrequired')),
});

export default function DrugForm({ initialValues, onClose }: DrugFormProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectDrugFilter);
  const [currency, setCurrency] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
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
      toast.success(`${t('Update drug successfully')}!`);
    } else {
      await drugApi.add(formValues);
      toast.success(`${t('Create drug successfully')}!`);
    }
    dispatch(drugActions.fetchDrugList(filter));
    onClose();
  };
  const drugUnit = [
    {
      label: 'Viên',
      value: 'Viên',
    },
    { label: 'Vỉ', value: 'Vỉ' },
  ];
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleDrugFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder={t('Input drug name')}
          label={`${t('Drug name')}*`}
        />
        <OptionField
          name="unit"
          control={control}
          value={currency}
          onChange={handleChange}
          placeholder={t('Input drug unit')}
          label={`${t('Drug unit')}*`}
        >
          {drugUnit.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>
        <InputField
          name="order"
          control={control}
          placeholder={t('Input order')}
          label={`${t('Drug order')}*`}
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
