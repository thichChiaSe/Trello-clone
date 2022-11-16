import { Button, IconButton, Paper, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';
import CommonDialog from 'components/Common/CommonDialog';
import { t } from 'i18next';
import { Districts } from 'models/district';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '250px',
    border: '1px solid #c5bf19',
  },
  table: {},
  edit: {
    marginRight: 4,
  },
  title: {
    backgroundColor: '#c5bf19',
  },
}));

export interface DistrictsTableProps {
  districtsList: Districts[];
  onEdit?: (districts: Districts) => void;
  onRemove?: (districts: Districts) => void;
}
export default function DistrictsTable({ districtsList, onEdit, onRemove }: DistrictsTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectDistricts, setSelectDistricts] = useState<Districts>();
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (districts: Districts) => {
    setSelectDistricts(districts);
    setOpen(true);
  };
  const handleRemoveConfirm = (districts: Districts) => {
    onRemove?.(districts);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className={classes.title}>
              <TableCell>Pending</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {districtsList?.length ? (
              districtsList.map((district, index) => (
                <TableRow key={district.id}>
                  <TableCell width={200}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {!district.alias ? t('No data to display') : district.alias}
                      <div style={{ marginLeft: '10px' }}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => onEdit?.(district)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: red[500] }}
                          onClick={() => handleRemoveClick(district)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </TableCell>
                  {/* <TableCell
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => onEdit?.(district)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(district)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  {t('No data to display')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <CommonDialog
        open={open}
        onClose={handleClose}
        item={selectDistricts}
        onConfirm={handleRemoveConfirm}
        mainMessage={t('ConfirmDeleteMessage', {
          type: t('District'),
          item: selectDistricts?.name,
        })}
        subMessage={t('SubConfirmDeleteMessage')}
      ></CommonDialog>
    </>
  );
}
