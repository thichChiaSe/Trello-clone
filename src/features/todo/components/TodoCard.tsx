import * as React from 'react';
import Card from '@mui/material/Card';
import { data } from '../../../api/dataFake';
import CardComponent from './Card';
import { makeStyles } from '@mui/styles';
import ItemsTask from './ItemsTask';
import { selectTodoFilter, selectTodoList, todoActions } from '../todoSlice';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { Todo } from 'models';

const useStyles = makeStyles({
  wrapper: { marginTop: '200px' },
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: ' space-around',
  },
  cardComponent__1: {
    border: '1px solid red',
    borderRadius: '5%',
    width: '200px',
  },
  cardComponent__2: {
    border: '1px solid yellow',
    borderRadius: '5%',
    width: '200px',
  },
  cardComponent__3: {
    border: '1px solid green',
    borderRadius: '5%',
    width: '200px',
  },
});

export default function TodoCard() {
  const classes = useStyles();
  const toDoList = useAppSelector(selectTodoList);
  console.log('data', toDoList);
  const [todo, setToDo] = React.useState<Todo>();

  const filter = useAppSelector(selectTodoFilter);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(todoActions.fetchTodoList(filter));
    console.log(
      '🚀 ~ file: TodoCard.tsx ~ line 43 ~ React.useEffect ~ todoActions.fetchTodoList(filter)',
      todoActions.fetchTodoList(filter)
    );
  }, [dispatch, filter]);

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <div className={classes.cardComponent__1}>
          <CardComponent
            task="Cần làm"
            children={<ItemsTask status={0} toDoList={toDoList} />}
            background="red"
          />
        </div>
        <div className={classes.cardComponent__2}>
          <CardComponent
            task="Đang làm"
            children={<ItemsTask status={0} toDoList={toDoList} />}
            background="yellow"
          />
        </div>
        <div className={classes.cardComponent__3}>
          <CardComponent
            task="Đã xong"
            children={<ItemsTask status={0} toDoList={toDoList} />}
            background="green"
          />
        </div>
      </Card>
    </div>
  );
}
