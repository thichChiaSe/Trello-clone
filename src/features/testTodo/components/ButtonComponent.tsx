/* eslint-disable import/no-anonymous-default-export */
import { makeStyles } from '@mui/styles';
import React from 'react';
import Button from '@mui/material/Button';
import { type } from 'os';
type props = {
  children: string;
  type: string;
  onClick: any;
};
const useStyles = makeStyles({});
export const ButtonComponent = ({ children, type, onClick, ...rest }: props) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      type={type === 'submit' ? 'submit' : 'button'}
      {...rest}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const SelectButton = ({ children, ...rest }: props) => {
  return;
};
