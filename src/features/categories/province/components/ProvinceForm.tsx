import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress, MenuItem } from '@mui/material';
import provinceApi from 'api/provinceApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { DisableField } from 'components/FormFields/DisableField';
import { OptionField } from 'components/FormFields/OptionField';
import { t } from 'i18next';
import { Province } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { stringUtils } from 'utils';
import * as yup from 'yup';
import { provinceActions, selectProvinceFilter } from '../provinceSlice';
export interface ProvinceFormProps {
  initialValues?: Province;
  onClose: () => void;
}

const schema = yup.object().shape({
  name: yup.string().required(t('Province name is required')),
  code: yup.string().required(t('input code')),
  type: yup.string().required(t('Province type is required')),
  numberOrder: yup.string().required(t('Order is required')),
  slug: yup.string().required(t('Slug is required')),
  nameWithType: yup.string().required(t('Type is required')),
});

export default function ProvinceForm({ initialValues, onClose }: ProvinceFormProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectProvinceFilter);
  // --------------------------------------------------------
  const [currency, setCurrency] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  // ---------------------------------------------------------

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useForm<Province>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const watchFields = watch(['type', 'name']);

  React.useEffect(() => {
    console.log('watchFields : ', watchFields);
    return setValue('slug', `${stringUtils.removeVietNam(watchFields[1].toLowerCase())}`);
  }, [setValue, watchFields]);

  React.useEffect(() => {
    console.log('watchFields : ', watchFields);
    return setValue('nameWithType', `${watchFields[0]} ${watchFields[1]}`);
  }, [setValue, watchFields]);

  //submit
  const handleProvinceFormSubmit = async (formValues: Province) => {
    console.log('formValue:', formValues);

    if (isEdit) {
      await provinceApi.update(formValues);
      toast.success(`${t('Update province successfully')}!`);
    } else {
      await provinceApi.add(formValues);
      toast.success(`${t('Create province successfully')}!`);
    }
    dispatch(provinceActions.fetchProvinceList(filter));
    onClose();
  };

  const typeProvince = [
    { label: t('province capital'), value: t('province capital') },
    {
      label: t('City'),
      value: t('City'),
    },
  ];
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleProvinceFormSubmit)}>
        <OptionField
          name="type"
          control={control}
          placeholder={t('Choose Province')}
          label={`${t('Choose Province')}*`}
          value={currency}
          onChange={handleChange}
        >
          {typeProvince.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>
        <InputField
          name="name"
          control={control}
          placeholder={t('Input name province')}
          label={`${t('name')}*`}
        />
        <InputField
          name="code"
          type="number"
          control={control}
          placeholder={t('Input code province')}
          label={`${t('Code province')}*`}
        />
        <DisableField name="slug" control={control} placeholder="Nhập slug" label="Slug*" />
        <DisableField
          name="nameWithType"
          control={control}
          placeholder={t('Input standard name')}
          label={`${t('standard name')}*`}
        />
        <InputField
          name="numberOrder"
          control={control}
          placeholder={t('Input order')}
          label={`${t('Input order')}*`}
          type="number"
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
