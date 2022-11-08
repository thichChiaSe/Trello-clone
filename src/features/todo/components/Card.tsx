import { Button, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { data } from '../../../api/dataFake';

export default function CardCpn({ task, onclick, children, background }: any) {
  return (
    <div>
      <CardContent style={{ backgroundColor: `${background}`, borderRadius: '5%' }}>
        <Typography variant="h6" component="div">
          {task}
        </Typography>
      </CardContent>
      {children}
      <CardActions>
        <Button size="small" onClick={onclick}>
          + Thêm mới
        </Button>
      </CardActions>
    </div>
  );
}
