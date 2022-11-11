import React, { useEffect, useState } from 'react';
import { data } from '../../../api/dataFake';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from 'models';
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

export interface TodoProps {
  toDoList: Todo[];
  status: number;
  onEdit?: (toDo: Todo) => void;
  onRemove?: (toDo: Todo) => void;
}

export default function ItemsTask({ status, toDoList, onEdit, onRemove }: TodoProps) {
  const [todoList, setTodoList] = useState(data);
  const [edit, setEdit] = useState(null);
  const handleDelete = (todolist: any) => {
    let deleteItem = todoList.filter((e) => {
      return !e.id;
    });
    setTodoList(deleteItem);
  };

  const handleEdit = ({ id }: any) => {
    console.log('aaa');
    const edits = todoList.find((e) => e.id === id);
    // setEdit(edits);
  };

  useEffect(() => {}, [setTodoList]);

  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      {toDoList
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
                <DeleteIcon onClick={() => handleDelete(todoList)} />
              </div>
            </div>
          </div>
        ))}{' '}
    </div>
  );
}
