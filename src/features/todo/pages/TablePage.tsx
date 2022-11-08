import { Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Popup from 'components/Common/PopUp';
import { Todo } from 'models/todo';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TodoForm from '../components/TodoForm';

type Props = {};
const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
export default function TablePage({}: Props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const history = useHistory();

  const [todo, setTodo] = useState<Todo>();
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
