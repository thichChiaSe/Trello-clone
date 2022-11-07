import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import siteApi from 'api/siteApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { Site } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { selectSiteFilter, siteActions } from '../siteSlice';
import { t } from 'i18next';
export interface SiteFormProps {
  initialValues?: Site;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(t('Site name is required')),
  districtID: yup.string().required(t('District id is required')),
});

export default function SiteForm({ initialValues, onClose }: SiteFormProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectSiteFilter);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Site>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleSiteFormSubmit = async (formValues: Site) => {
    if (isEdit) {
      await siteApi.update(formValues);
      toast.success(`${t('Update drug successfully')}!`);
    } else {
      await siteApi.add(formValues);
      toast.success(`${t('Create drug successfully')}!`);
    }
    dispatch(siteActions.fetchSiteList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSiteFormSubmit)}>
        <InputField name="name" control={control} label={`${t('Site name')}*`} />
        <InputField
          name="districtID"
          control={control}
          placeholder={t('Code province')}
          label={`${t('Code province')}*`}
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
