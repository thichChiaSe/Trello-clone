import { IconButton, Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import CommonDialog from 'components/Common/CommonDialog';
import { t } from 'i18next';
import { Province } from 'models/province';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '250px',
    border: '1px solid #c5b90c',
  },
  table: {
    backgroundColor: '',
  },
  title: {
    backgroundColor: '#c5b90c',
  },
  edit: {
    marginRight: 4,
  },
}));

export interface ProvinceTableProps {
  provinceList: Province[];
  onEdit?: (province: Province) => void;
  onRemove?: (province: Province) => void;
}

export default function ProvinceTable({ provinceList, onEdit, onRemove }: ProvinceTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveClick = (province: Province) => {
    setSelectedProvince(province);
    setOpen(true);
  };
  const handleRemoveConfirm = (province: Province) => {
    onRemove?.(province);
    setOpen(false);
  };
  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className={classes.title}>
              <TableCell>Inprogress</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {provinceList?.length ? (
              provinceList.map((province, index) => (
                <TableRow key={province.id}>
                  <TableCell width={250}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {!province.alias ? t('No data to display') : province.alias}
                      <div style={{ marginLeft: '10px' }}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => onEdit?.(province)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: red[500] }}
                          onClick={() => handleRemoveClick(province)}
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
                      marginRight: '25px',
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => onEdit?.(province)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => handleRemoveClick(province)}
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

      {/* remove dialog */}
      <CommonDialog
        open={open}
        onClose={handleClose}
        item={selectedProvince}
        onConfirm={handleRemoveConfirm}
        mainMessage={t('ConfirmDeleteMessage', {
          type: t('Province'),
          item: selectedProvince?.name,
        })}
        subMessage={t('SubConfirmDeleteMessage')}
      ></CommonDialog>
    </>
  );
}
