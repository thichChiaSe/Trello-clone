import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Todo } from 'models/todo';
import Popup from 'components/Common/PopUp';
import TodoForm from './TodoForm';
import { data } from '../../../api/dataFake';
import CardCpn from './Card';

export default function TodoCard() {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [todo, setTodo] = React.useState<Todo>();
  const initialValues: Todo = {
    name: '',
    ...todo,
  };

  const handleAdd = () => {
    setOpenPopup(true);
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }} style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ border: '1px solid gray', borderRadius: '5%', width: '200px' }}>
          <CardCpn
            task="Cần làm"
            children={data.filter((e) => e.status === 2).map((e) => e.name)}
            background="red"
            onclick={handleAdd}
          />
        </div>
        <div style={{ border: '1px solid gray', borderRadius: '5%', width: '200px' }}>
          <CardContent style={{ backgroundColor: '#e2e514', borderRadius: '5%' }}>
            <Typography variant="h6" component="div">
              Đang làm
            </Typography>
          </CardContent>
          {data.map((e) => e.name)}
          <CardActions>
            <Button size="small" onClick={handleAdd}>
              + Thêm mới
            </Button>
          </CardActions>
        </div>
        <div style={{ border: '1px solid gray', borderRadius: '5%', width: '200px' }}>
          <CardContent style={{ backgroundColor: '#2b593f' }}>
            <Typography variant="h6" component="div">
              Đã xong
            </Typography>
          </CardContent>
          {data.filter((e) => e.status === 2).map((e) => e.name)}
          {console.log(
            'data',
            data.filter((e) => e.status === 2).map((e) => e.name)
          )}
          <CardActions>
            <Button size="small" onClick={handleAdd}>
              + Thêm mới
            </Button>
          </CardActions>
        </div>
        <CardCpn
          task="Cần làm"
          children={data.filter((e) => e.status === 2).map((e) => e.name)}
          background="red"
        />
      </Card>

      <Popup
        title={initialValues?.id ? 'Cập nhật' : 'Tạo mới'}
        openPopup={openPopup}
        onClose={() => {
          setOpenPopup(false);
          setTodo(undefined);
        }}
      >
        <TodoForm onClose={() => setOpenPopup(false)} />
      </Popup>
    </>
  );
}
