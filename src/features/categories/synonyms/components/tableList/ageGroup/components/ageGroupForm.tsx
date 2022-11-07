import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import ageGroupApi from 'api/ageGroupApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { ageGroupActions, selectAgeGroupFilter } from 'features/categories/ageGroup/ageGroupSlice';
import { t } from 'i18next';
import { AgeGroup } from 'models/ageGroup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export interface AgeGroupFormProps {
  initialValues?: AgeGroup;
  onClose: () => void;
}
const schema = yup.object().shape({
  alias: yup.string().required('Vui lòng nhập từ đồng nghĩa'),
});

export default function AgeGroupForm({ initialValues, onClose }: AgeGroupFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectAgeGroupFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AgeGroup>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleAgeGroupFormSubmit = async (formValues: AgeGroup) => {
    if (isEdit) {
      await ageGroupApi.updateSyn(formValues);
      toast.success(t('Update Agegroup successfully'));
    } else {
      await ageGroupApi.addSyn(formValues);
      toast.success(t('Create Agegroup successfully'));
    }
    dispatch(ageGroupActions.fetchAgeGroupList(filter));
    onClose();
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleAgeGroupFormSubmit)}>
        <InputField
          name="alias"
          control={control}
          placeholder={t('Input synonyms')}
          label={`${t('Synonyms')}*`}
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
