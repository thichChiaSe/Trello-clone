import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import siteApi from 'api/siteApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { selectSiteFilter, siteActions } from 'features/categories/site/siteSlice';
import { t } from 'i18next';
import { Site } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export interface SiteFormProps {
  initialValues?: Site;
  onClose: () => void;
}

const schema = yup.object().shape({
  alias: yup.string().required(t('Site name is required')),
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
      await siteApi.updateSyn(formValues);
      toast.success(`${t('Update drug successfully')}!`);
    } else {
      await siteApi.addSyn(formValues);
      toast.success(`${t('Create drug successfully')}!`);
    }
    dispatch(siteActions.fetchSiteList(filter));
    onClose();
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSiteFormSubmit)}>
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
