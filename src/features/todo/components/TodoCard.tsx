import * as React from 'react';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
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
import TodoFormAddItem from './TodoForm';
import { CommonButton } from 'components/Common/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import InputAddPerson from './InputAddPerson';
import InputAddTask from './InputAddTask';
const useStyles = makeStyles({
  wrapper: { marginTop: '80px' },
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: ' space-around',
  },
  cardComponent: {
    marginLeft: '10px',
    border: '1px solid red',
    borderRadius: '5%',
    width: '200px',
  },
  cardComponent__1: {
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
  const [{ items }, setItems] = React.useState({ items: [] });
  // const addItem = () => {
  //   items.push(
  //     <>
  //       <div className={classes.cardComponent}>
  //         <CardComponent
  //           task={getColumns.map((e) => e.label)}
  //           children={
  //             <ItemsTask
  //               status={0}
  //               toDoList={toDoList}
  //               onEdit={handleEdit}
  //               onRemove={handleRemove}
  //             />
  //           }
  //           background="red"
  //         />
  //         <InputAddPerson />
  //       </div>
  //     </>
  //   );
  //   setItems({ items: [...items] });
  // };
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
      {/* <button onClick={addItem}>add</button> */}
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
          <InputAddPerson />
        </div>
        {items}
        <Popup
          title={initialValues?.id ? 'Cập nhật' : 'Thêm mới'}
          openPopup={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setToDo(undefined);
          }}
        >
          <TodoForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
        </Popup>
      </Card>
    </div>
  );
}
