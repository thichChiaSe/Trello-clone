import React, { useEffect, useState } from 'react';
import { data } from '../../../api/dataFake';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Board } from 'models';
import CommonDialog from 'components/Common/CommonDialog';
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
  edit: { cursor: 'pointer', marginRight: '10px' },
  delete: { cursor: 'pointer' },
});

export interface TodoProps {
  toDoList: Board[];
  status: number;
  onEdit?: (board: Board) => void;
  onRemove?: (board: Board) => void;
}

export default function ItemsTask({ status, toDoList, onEdit, onRemove }: TodoProps) {
  // const handleEdit = ({ id }: any) => {
  //   console.log('aaa');
  //   const edits = todoList.find((e) => e.id === id);
  //   // setEdit(edits);
  // };
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Board>();
  const [todo, setTodo] = useState<Board>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (todo: Board) => {
    setSelected(todo);
    setOpen(true);
  };
  const handleRemoveConfirm = (todo: Board) => {
    onRemove?.(todo);
    setOpen(false);
  };
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
                <EditIcon onClick={() => onEdit?.(e)} />
              </div>
              <div className={classes.delete}>
                <DeleteIcon onClick={() => handleRemoveClick(e)} />
              </div>
            </div>
          </div>
        ))}{' '}
      <CommonDialog
        open={open}
        onClose={handleClose}
        item={selected}
        onConfirm={handleRemoveConfirm}
        subMessage="Đây là thao tác không thể hoàn tác	"
        mainMessage={''}
      />
    </div>
  );
}
