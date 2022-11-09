import * as React from 'react';
import Card from '@mui/material/Card';
import { data } from '../../../api/dataFake';
import CardComponent from './Card';
import { makeStyles } from '@mui/styles';
import ItemsTask from './ItemsTask';

const useStyles = makeStyles({
  wrapper: { marginTop: '200px' },
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: ' space-around',
  },
  cardComponent: {
    border: '1px solid gray',
    borderRadius: '5%',
    width: '200px',
  },
});

export default function TodoCard() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <div className={classes.cardComponent}>
          <CardComponent task="Cần làm" children={<ItemsTask status={0} />} background="red" />
        </div>
        <div className={classes.cardComponent}>
          <CardComponent task="Đang làm" children={<ItemsTask status={1} />} background="yellow" />
        </div>
        <div className={classes.cardComponent}>
          <CardComponent task="Đã xong" children={<ItemsTask status={2} />} background="green" />
        </div>
      </Card>
    </div>
  );
}
