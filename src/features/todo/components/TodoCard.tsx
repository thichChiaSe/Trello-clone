import * as React from 'react';
import Card from '@mui/material/Card';
import { data } from '../../../api/dataFake';
import CardCpn from './Card';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: ' space-around',
  },
  cardCpn: {
    border: '1px solid gray',
    borderRadius: '5%',
    width: '200px',
  },
});

export default function TodoCard() {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <div className={classes.cardCpn}>
          <CardCpn
            task="Cần làm"
            children={data.filter((e) => e.status === 0).map((e) => e.name)}
            background="red"
          />
        </div>
        <div className={classes.cardCpn}>
          <CardCpn
            task="Cần làm"
            children={data.filter((e) => e.status === 1).map((e) => e.name)}
            background="yellow"
          />
        </div>
        <div className={classes.cardCpn}>
          <CardCpn
            task="Cần làm"
            children={data.filter((e) => e.status === 2).map((e) => e.name)}
            background="green"
          />
        </div>
      </Card>
    </>
  );
}
