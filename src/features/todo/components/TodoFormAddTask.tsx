import { Button, CircularProgress, Box } from '@mui/material';
import { Columns } from 'models/todo';
import { Alert } from '@mui/lab';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/FormFields';
import { data } from '../../../api/dataFake';
import todoApi from 'api/todoApi';
import { selectTodoFilter, todoActions } from '../todoSlice';
export interface TodoFormProps {
  initialValues?: Columns;
  onClose: () => void;
}
const schema = yup.object().shape({
  label: yup.string().required('Nhập tiêu đề'),
});
export default function TodoFormAddItem({ initialValues, onClose }: TodoFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectTodoFilter);
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Columns>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  console.log('data', data);

  const handleSubmitForm = async (formValues: Columns) => {
    await todoApi.addColumns(formValues);
    toast.success(`${'Tạo mới thành công'}`);
    dispatch(todoActions.fetchTodoList(filter));
    onClose();
  };

  // const handleChange = (e: any) => {
  //   setPostList(e.target.value);
  //   console.log('');
  // };
  // useEffect(() => {
  //   setTodoList(todoList.concat());
  // }, [setTodoList]);

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="label" control={control} placeholder={'Nhập tên tiêu đề'} />

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
