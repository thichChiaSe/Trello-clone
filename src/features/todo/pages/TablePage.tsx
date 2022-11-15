import { Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from 'app/hooks';
import Popup from 'components/Common/PopUp';
import { Board } from 'models/todo';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardComponent from '../components/Card';
import ItemsTask from '../components/ItemsTask';
import TodoCard from '../components/TodoCard';
import TodoFormAddItem from '../components/TodoFormAddTask';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  cardComponent: {
    border: '1px solid red',
    borderRadius: '5%',
    width: '200px',
  },
  btn: { display: 'flex', justifyContent: 'center', paddingTop: '10px' },
}));
export default function TablePage() {
  const classes = useStyles();
  const history = useHistory();

  const [todo, setTodo] = useState<Board>();
  const [openPopup, setOpenPopup] = useState(false);

  const [{ items }, setItems] = React.useState({ items: [] });
  // const addItem = () => {
  //   items.push(
  //     <div key={items.length}>
  //       <div className={classes.cardComponent}>
  //         <CardComponent
  //           task="sss"
  //           children={<ItemsTask status={0} toDoList={[]} />}
  //           background="red"
  //         />
  //       </div>
  //     </div>
  //   );
  //   setItems({ items: [...items] });
  // };

  // const initialValues: Todo = {
  //   name: '',
  //   ...todo,
  // } as Todo;

  // const handleClick = () => {
  //   history.push('/todo-detail');
  // };

  return (
    <>
      <div
        className="classes.btn"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      >
        <Button sx={{ border: ' 1px solid #096dd9' }} onClick={() => setOpenPopup(true)}>
          Tạo bảng mới
        </Button>
      </div>
      <div className="classes.wrapper" style={{ display: 'flex', alignItems: 'center' }}>
        <TodoCard />
        {items}
        <Popup
          title={'Tạo bảng mới'}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setTodo(undefined);
          }}
        >
          <TodoFormAddItem onClose={() => setOpenPopup(false)} />
        </Popup>
      </div>
    </>
  );
}
