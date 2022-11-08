import { Button, CircularProgress, Box } from '@mui/material';
import { Todo } from 'models/todo';
import { Alert } from '@mui/lab';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/FormFields';
import { data } from '../../../api/dataFake';
export interface TodoFormProps {
  initialValues?: Todo;
  onClose: () => void;
}
const schema = yup.object().shape({
  name: yup.string().required('Nhập tên'),
});
export default function TodoForm({ initialValues, onClose }: TodoFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Todo>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  console.log('data', data);
  const handleSubmitForm = (formValue: Todo) => {};
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control} placeholder={'Nhập tên todo'} />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Xác nhận
          </Button>
        </Box>
      </form>
    </Box>
  );
}