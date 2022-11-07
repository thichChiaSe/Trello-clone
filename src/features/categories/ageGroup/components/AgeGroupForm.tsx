import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/lab';
import { Box, Button, CircularProgress } from '@mui/material';
import ageGroupApi from 'api/ageGroupApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { InputField } from 'components/FormFields';
import { AgeGroup } from 'models/ageGroup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import { ageGroupActions, selectAgeGroupFilter } from '../ageGroupSlice';
import RemoveIcon from '@mui/icons-material/Remove';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import React from 'react';
export interface AgeGroupFormProps {
  initialValues?: AgeGroup;
  onClose: () => void;
}
const schema = yup.object().shape({
  name: yup.string().required(t('Age is required')),
  order: yup.string().required(t('Order is required')),
  lowestAge: yup.string().required(t('Age lowest is required')),
  olderAge: yup.string().required(t('Age uppermost is required')),
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
    setValue,
    getValues,
  } = useForm<AgeGroup>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleAgeGroupFormSubmit = async (formValues: AgeGroup) => {
    console.log('formValues: ', formValues);

    if (isEdit) {
      await ageGroupApi.update(formValues);
      toast.success(t('Update Agegroup successfully'));
    } else {
      await ageGroupApi.add(formValues);
      toast.success(t('Create Agegroup successfully'));
    }
    dispatch(ageGroupActions.fetchAgeGroupList(filter));
    onClose();
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleAgeGroupFormSubmit)}>
        <InputField
          name="name"
          control={control}
          placeholder="Nhập tên nhóm tuổi"
          label="Tên nhóm tuổi*"
        ></InputField>
        {/* lowestAge  */}
        <div className="button__agegroup" style={{ display: 'flex' }}>
          <Button
            name="button__agegroup--desc"
            startIcon={<RemoveIcon style={{ alignItems: 'center', marginLeft: '10px' }} />}
            onClick={() => setValue('lowestAge', +getValues('lowestAge') - 1)}
            style={{
              borderRadius: '20px',
              backgroundColor: '#b4d3f0',
              alignItems: 'center',
              minWidth: '38px',
              height: '40px',
              marginTop: '15px',
              marginRight: '10px',
            }}
          />
          <InputField name="lowestAge" control={control}></InputField>
          <Button
            name="button__agegroup--asc"
            startIcon={<AddIcon style={{ alignItems: 'center', marginLeft: '10px' }} />}
            style={{
              borderRadius: '20px',
              backgroundColor: '#b4d3f0',
              alignItems: 'center',
              minWidth: '38px',
              height: '40px',
              marginTop: '15px',
              marginLeft: '10px',
            }}
            onClick={() => setValue('lowestAge', +getValues('lowestAge') + 1)}
          />
        </div>
        {/* olderAge  */}
        <div className="button__agegroup" style={{ display: 'flex' }}>
          <Button
            name="button__agegroup--desc"
            startIcon={<RemoveIcon style={{ alignItems: 'center', marginLeft: '10px' }} />}
            style={{
              borderRadius: '20px',
              backgroundColor: '#b4d3f0',
              alignItems: 'center',
              minWidth: '38px',
              height: '40px',
              marginTop: '15px',
              marginRight: '10px',
            }}
            onClick={() => setValue('olderAge', +getValues('olderAge') - 1)}
          />
          <InputField name="olderAge" control={control}></InputField>
          <Button
            name="button__agegroup--asc"
            startIcon={<AddIcon style={{ alignItems: 'center', marginLeft: '10px' }} />}
            style={{
              borderRadius: '20px',
              backgroundColor: '#b4d3f0',
              alignItems: 'center',
              minWidth: '38px',
              height: '40px',
              marginTop: '15px',
              marginLeft: '10px',
            }}
            onClick={() => setValue('olderAge', +getValues('olderAge') + 1)}
          />
        </div>
        <InputField
          name="order"
          control={control}
          placeholder="Nhập thứ tự"
          label="Thứ tự*"
        ></InputField>
        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;{t('Confirm')}
          </Button>
          {/* <Button onClick={handleClose} color="primary" style={{ marginLeft: '10px' }}>
            {t('cancel')}
          </Button> */}
        </Box>
      </form>
    </Box>
  );
}
