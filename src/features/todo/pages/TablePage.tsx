import { Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from 'app/hooks';
import Popup from 'components/Common/PopUp';
import { Board } from 'models/todo';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoForm from '../components/TodoForm';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default function TablePage() {
  const classes = useStyles();
  const history = useHistory();

  const [todo, setTodo] = useState<Board>();
  const [openPopup, setOpenPopup] = useState(false);

  // const initialValues: Todo = {
  //   name: '',
  //   ...todo,
  // } as Todo;

  const handleClick = () => {
    history.push('/todo-detail');
  };

  return (
    <div
      className="classes.wrapper"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Button sx={{ border: ' 1px solid #096dd9' }} onClick={handleClick}>
        Tạo bảng mới
      </Button>
      <Popup
        title={'Tạo bảng'}
        openPopup={openPopup}
        onClose={() => {
          setOpenPopup(false);
          setTodo(undefined);
        }}
      >
        <TodoForm onClose={() => setOpenPopup(false)} />
      </Popup>
    </div>
  );
}
