import { makeStyles } from '@mui/styles';
import Popup from 'components/Common/PopUp';
import { useState } from 'react';
import { ButtonComponent } from '../components/ButtonComponent';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

type Props = {};
const useStyles = makeStyles({});
export default function TestPage({}: Props) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div className="classes.btn">
      <ButtonComponent children="Add task" type="button" onClick={() => setOpenPopup(true)} />
      <TodoList />
      <Popup
        title={'Tạo bảng mới'}
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
