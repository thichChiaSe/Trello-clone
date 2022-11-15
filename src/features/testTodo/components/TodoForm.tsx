import { Button, CircularProgress, Box } from '@mui/material';
import { Board } from 'models/todo';
import { Alert } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from 'components/FormFields';
import { data } from '../../../api/dataFake';
import todoApi from 'api/todoApi';
import { MenuItem } from '@mui/material';
import { selectTodoFilter, todoActions } from 'features/todo/todoSlice';
import OptionStatus from './OptionStatus';
import { makeStyles } from '@mui/styles';
import { OptionField } from 'components/FormFields/OptionField';
import { current } from '@reduxjs/toolkit';
export interface TodoFormProps {
  initialValues?: Board;
  onClose: () => void;
}
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên'),
  option: yup.string().required('Vui lòng nhập lựa chọn'),
});
const useStyles = makeStyles({
  btnBottom: {
    display: 'flex',
  },
});
export default function TodoForm({ initialValues, onClose }: TodoFormProps): JSX.Element {
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectTodoFilter);
  const [error, setError] = useState<string>('');
  const [todoList, setTodoList] = useState(data);
  const [postList, setPostList] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Board>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  console.log('data', data);

  const handleSubmitForm = async (formValues: Board) => {
    if (isEdit) {
      await todoApi.update(formValues);
      toast.success(`${'Cập nhật thành công'}`);
    } else {
      await todoApi.add(formValues);
      toast.success(`${'Tạo mới thành công'}`);
    }
    dispatch(todoActions.fetchTodoList(filter));
    onClose();
  };
  const [currency, setCurrency] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const typeStatus = [
    { label: 'Completed', value: 'Completed' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Inprogress', value: 'Inprogress' },
  ];
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <InputField name="name" control={control} placeholder={'Nhập tên todo'} />
        <div style={{ margin: '10px' }}></div>
        <OptionField
          name="option"
          control={control}
          placeholder="Chọn"
          label="Chọn"
          value={currency}
          onChange={handleChange}
        >
          {' '}
          {typeStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </OptionField>
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
