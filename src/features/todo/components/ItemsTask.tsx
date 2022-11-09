import React, { useEffect, useState } from 'react';
import { data } from '../../../api/dataFake';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const useStyles = makeStyles({
  wrap: {
    marginTop: '10px',
  },
  item: {
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
    padding: '5px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  right: { display: 'flex' },
  edit: { cursor: 'pointer' },
  delete: { cursor: 'pointer' },
});

export default function ItemsTask({ status, props }: any) {
  const [todo, setTodo] = useState(data);
  // const [todolist, setTodoList] = props;
  const [edit, setEdit] = useState(null);
  const handleDelete = (todolist: any) => {
    let deleteItem = todo.filter((e) => {
      return !e.id;
    });
    setTodo(deleteItem);
    // const index = todolist.findIndex((x: any) => x.id === todolist.id);
    // if (index < 0) return;
    // const newTodoList = [...todolist];
    // newTodoList.splice(index, 1);
    // setTodo(newTodoList);
  };

  const handleEdit = ({ id }: any) => {
    console.log('aaa');
    const edits = todo.find((e) => e.id === id);
    // setEdit(edits);
  };
  useEffect(() => {}, [setTodo]);
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      {todo
        .filter((e) => e.status === status)
        .map((e, index) => (
          <div key={e.id} className={classes.item}>
            <div>
              {index + 1} / {e.name}
            </div>
            <div className={classes.right}>
              <div className={classes.edit}>
                <EditIcon onClick={handleEdit} />
              </div>
              <div className={classes.delete}>
                <DeleteIcon
                  onClick={() => handleDelete(todo)}
                  // onClick={() => handleClick(todo)}
                />
              </div>
            </div>
          </div>
        ))}{' '}
    </div>
  );
}
