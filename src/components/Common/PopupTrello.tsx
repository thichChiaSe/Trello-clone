import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  dialogWrapper: {
    // padding: theme.spacing(2),
    padding: '16px',
    position: 'absolute',
    // top: theme.spacing(5),
    top: '40px',
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    // top: theme.spacing(2),
    // right: theme.spacing(2),
  },
}));
type Props = {
  title: string;
  subtitle?: string;
  children: any;
  openPopup: boolean;
  onClose: () => void;
  fullWith?: boolean;
  maxWidth?: Breakpoint;
  fullScreen?: boolean;
};
export default function Popup({
  title,
  subtitle,
  children,
  openPopup,
  onClose,
  fullWith,
  maxWidth,
  fullScreen,
}: Props) {
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth={fullWith}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            style={{ fontSize: '15px', color: 'gray' }}
          >
            {subtitle}
          </Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
