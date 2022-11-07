import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Box, Button, CircularProgress, MenuItem, Stack, TextField } from '@mui/material';
// import customerApi from 'api/customerApi';
// import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Customer } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
// import { customerActions, selectCustomerFilter } from '../customerSlice';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { OptionField } from 'components/FormFields/OptionField';
export interface CustomerFormProps {
  initialValues?: Customer;
  onClose: () => void;
}

const schema = yup.object().shape({
  numberPhone: yup.string().required(t('Customer name is required')),
  card: yup.string().required(t('Order is required')),
  ethnic: yup.string().required(t('ethnic is required')),
  fistandlastname: yup.string().required(t('faln is required')),
  passport: yup.string().required(t('passport is required')),
  job: yup.string().required(t('job is required')),
  address: yup.string().required(t('address is required')),
  codeARV: yup.string().required(t('codeARV is required')),
  codeBHYT: yup.string().required(t('codeBHYT is required')),
});

export default function CustomerForm({ initialValues, onClose }: CustomerFormProps): JSX.Element {
  const error = useState<string>('');
  // const isEdit = Boolean(initialValues?.id);
  // const dispatch = useAppDispatch();
  // const filter = useAppSelector(selectCustomerFilter);
  const [currency, setCurrency] = React.useState('');
  const handleChangeEthnic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Customer>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleCustomerFormSubmit = async (formValues: Customer) => {
    // if (isEdit) {
    //   await customerApi.update(formValues);
    // } else {
    //   await customerApi.add(formValues);
    // }
    // dispatch(customerActions.fetchCustomerList(filter));
    // onClose();
  };
  const typeEthnic = [
    { label: 'Kinh', value: 'Kinh' },
    { label: "H'mong", value: "H'mong" },
    { label: "G'mong", value: "G'mong" },
    { label: "Q'mong", value: "Q'mong" },
    { label: "W'mong", value: "W'mong" },
  ];
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-10-10'));

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
        <InputField
          name="numberPhone"
          control={control}
          placeholder={t('input')}
          label={`${t('number phone')}*`}
        />
        <InputField
          name="fistandlastname"
          control={control}
          placeholder={t('input')}
          label={`${t('first and last name')}*`}
        />
        <InputField
          name="card"
          control={control}
          placeholder={t('input')}
          label={`${t('cmnd')}*`}
        />
        <InputField
          name="passport"
          control={control}
          placeholder={t('input')}
          label={`${t('passport')}*`}
        />
        <LocalizationProvider sx={{ marginTop: '10px' }} dateAdapter={AdapterDayjs}>
          <Stack spacing={3} sx={{ margin: '15px 0 10px 0' }}>
            <DesktopDatePicker
              label={t('yoB')}
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              // name ???
            />
          </Stack>
        </LocalizationProvider>
        <OptionField
          name="ethnic"
          control={control}
          placeholder={t('Choose Ethnic')}
          label={t('Choose Ethnic')}
          value={currency}
          onChange={handleChangeEthnic}
        >
          {typeEthnic.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>
        <InputField name="job" control={control} placeholder={t('input')} label={`${t('job')}*`} />
        <InputField
          name="address"
          control={control}
          placeholder={t('input')}
          label={`${t('address')}*`}
        />
        <InputField
          name="codeARV"
          control={control}
          placeholder={t('input')}
          label={`${t('code ARV')}*`}
        />
        <InputField
          name="codeBHYT"
          control={control}
          placeholder={t('input')}
          label={`${t('code BHYT')}*`}
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
