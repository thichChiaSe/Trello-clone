import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress, MenuItem } from '@mui/material';
import districtsApi from 'api/districtsApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { Districts } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { districtsActions, selectDistrictsFilter } from '../districtsSlice';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { OptionField } from 'components/FormFields/OptionField';
import { DisableField } from 'components/FormFields/DisableField';
export interface DistrictsFormProps {
  initialValues?: Districts;
  onClose: () => void;
}

const schema = yup.object().shape({
  type: yup.string().required(t('Please choose province')),
  district: yup.string().required(t('Please choose district')),
  code: yup.string().required(t('Please type code district')),
  name: yup.string().required(t('Please type name district')),
  slug: yup.string().required(t('Please type name slug')),
  nameWithType: yup.string().required(t('Please type namewithtype')),
  numberOrder: yup.string().required(t('Please type order')),
});

export default function DistrictsForm({ initialValues, onClose }: DistrictsFormProps): JSX.Element {
  const error = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectDistrictsFilter);
  const [currencyProvince, setCurrencyProvince] = React.useState('');
  const [currencyDistrict, setCurrencyDistrict] = React.useState('');
  const handleChangeProvince = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyProvince(event.target.value);
  };
  const handleChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrencyDistrict(event.target.value);
  };
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<Districts>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleDistrictsFormSubmit = async (formValues: Districts) => {
    if (isEdit) {
      await districtsApi.update(formValues);
      toast.success(`${t('Update districts successfully')}!`);
    } else {
      await districtsApi.add(formValues);
      toast.success(`${t('Create districts successfully')}!`);
    }
    dispatch(districtsActions.fetchDistrictsList(filter));
    onClose();
  };
  const chooseProvince = [
    {
      label: 'Thành phố',
      value: 'Thành phố',
    },
    { label: 'Tỉnh', value: 'Tỉnh' },
  ];
  const chooseDistrict = [
    { label: 'Quận ', value: 'Quận ' },
    { label: 'Huyện', value: 'Huyện' },
  ];
  const watchFields = watch(['type', 'name']);

  React.useEffect(() => {
    return setValue(
      'slug',
      `${watchFields[1]
        .toLowerCase()
        .replace(/[\s_-]+/g, '-')
        .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
        .replace(/ì|í|ị|ỉ|ĩ/g, 'i')
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
        .replace(/đ/g, 'd')
        .replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
        .replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
        .replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
        .replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
        .replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
        .replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
        .replace(/Đ/g, 'D')}`
    );
  }, [setValue, watchFields]);

  React.useEffect(() => {
    return setValue('nameWithType', `${watchFields[0]} ${watchFields[1]}`);
  }, [setValue, watchFields]);
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleDistrictsFormSubmit)}>
        <OptionField
          name="type"
          control={control}
          value={currencyProvince}
          onChange={handleChangeProvince}
          placeholder="Chọn loại Tỉnh/TP"
          label="Tỉnh/Thành Phố*"
        >
          {chooseProvince.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>
        {/* <Controller
          name="Province"
          control={control}
          render={({ field }) => (
            <ReactSelect
              isClearable
              {...field}
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
            />
          )}
        /> */}
        <InputField
          type="number"
          name="code"
          control={control}
          placeholder="Nhập mã Quận/Huyện"
          label="Mã Quận/Huyện*"
        />
        <OptionField
          name="district"
          control={control}
          value={currencyDistrict}
          onChange={handleChangeDistrict}
          placeholder="Chọn loại Quận/Huyện"
          label="Loại Quận/Huyện*"
        >
          {chooseDistrict.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>

        <InputField
          name="name"
          control={control}
          placeholder="Nhập tên Quận/Huyện"
          label="Tên Quận/Huyện*"
        />
        <DisableField name="slug" control={control} placeholder="slug" label="Nhập slug*" />
        <DisableField
          name="nameWithType"
          control={control}
          placeholder="Nhập tên chuẩn "
          label="Tên chuẩn*"
        />
        <InputField
          name="numberOrder"
          control={control}
          placeholder="Nhập số thứ tự"
          label="Thứ tự*"
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
