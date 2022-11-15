import { Button, CardActions, CardContent, Typography } from '@mui/material';
import Popup from 'components/Common/PopUp';
import { Board } from 'models/todo';
import React, { useEffect } from 'react';
import TodoForm from './TodoForm';

export default function CardComponent({ task, onclick, children, background }: any) {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [todo, setTodo] = React.useState<Board>();

  const initialValues: Board = {
    id: '',
    members: [],
    name: '',
    status: 0,
    description: '',
    ...todo,
  };

  const handleAdd = () => {
    setOpenPopup(true);
  };

  return (
    <div>
      <CardContent style={{ backgroundColor: `${background}`, borderRadius: '5%' }}>
        <Typography variant="h6" component="div">
          {task}
        </Typography>
      </CardContent>
      {children}
      <CardActions>
        <Button size="small" onClick={handleAdd}>
          + Thêm mới
        </Button>
      </CardActions>
      <Popup
        title={initialValues?.id ? 'Cập nhật' : 'Tạo mới'}
        openPopup={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <TodoForm onClose={() => setOpenPopup(false)} />
      </Popup>
    </div>
  );
}
