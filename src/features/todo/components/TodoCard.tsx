import * as React from 'react';
import Card from '@mui/material/Card';
import { data } from '../../../api/dataFake';
import CardComponent from './Card';
import { makeStyles } from '@mui/styles';
import ItemsTask from './ItemsTask';
import { selectTodoColumns, selectTodoFilter, selectTodoList, todoActions } from '../todoSlice';
import { useAppSelector } from 'app/hooks';
import { useDispatch } from 'react-redux';
import { Board, Columns } from 'models';
import todoApi from 'api/todoApi';
import Popup from 'components/Common/PopUp';
import TodoForm from './TodoForm';

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
    border: '1px solid red',
    borderRadius: '5%',
    width: '200px',
  },
  cardComponent__3: {
    border: '1px solid red',
    borderRadius: '5%',
    width: '200px',
  },
});

export default function TodoCard() {
  const initialValues: Board = {
    id: '',
    name: '',
    members: [''],
    status: 0,
    description: '',
  };
  const classes = useStyles();
  const toDoList = useAppSelector(selectTodoList);
  const getColumns = useAppSelector(selectTodoColumns);
  console.log('🚀 ~ file: TodoCard.tsx ~ line 50 ~ TodoCard ~ getColumns', getColumns);

  const [openPopup, setOpenPopup] = React.useState(false);
  const [todo, setToDo] = React.useState<Board>();

  const filter = useAppSelector(selectTodoFilter);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(todoActions.fetchTodoList(filter));
    dispatch(todoActions.fetchTodoColumns(filter));
  }, [dispatch, filter]);

  const handleRemove = async (board: Board) => {
    try {
      await todoApi.remove(board?.id || '');

      // Trigger to re-fetch list with current filter
      const newFilter = { ...filter };
      dispatch(todoActions.fetchTodoList(newFilter));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (board: Board) => {
    setOpenPopup(true);
    setToDo(board);
  };
  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <div className={classes.cardComponent__1}>
          <CardComponent
            task={getColumns.map((e) => e.label)}
            children={
              <ItemsTask
                status={0}
                toDoList={toDoList}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            }
            background="red"
          />
        </div>
        <div className={classes.cardComponent__2}>
          <CardComponent
            task={getColumns.map((e) => e.label)}
            children={
              <ItemsTask
                status={0}
                toDoList={toDoList}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            }
            background="red"
          />
        </div>
        <div className={classes.cardComponent__3}>
          <CardComponent
            task={getColumns.map((e) => e.label)}
            children={
              <ItemsTask
                status={0}
                toDoList={toDoList}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            }
            background="red"
          />
        </div>
        <button onClick={(v) => console.log('daa', getColumns)}>Tạo mới</button>
        <Popup
          title={initialValues?.id ? 'Cập nhật' : 'Tạo mới'}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
          }}
        >
          <TodoForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Card>
    </div>
  );
}
