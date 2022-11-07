import { IconButton, Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Districts } from 'models/districts';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from '@mui/material/colors';
import { t } from 'i18next';
import CommonDialog from 'components/Common/CommonDialog';
const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    marginRight: 4,
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
  const [selectedDistricts, setSelectedDistricts] = useState<Districts>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (districts: Districts) => {
    setSelectedDistricts(districts);
    setOpen(true);
  };

  const handleRemoveConfirm = (districts: Districts) => {
    onRemove?.(districts);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('#')}</TableCell>
              <TableCell>{t('code')}</TableCell>
              <TableCell>{t('type')}</TableCell>
              <TableCell>{t('name')}</TableCell>
              <TableCell>{t('slug')}</TableCell>
              <TableCell>{t('nameWithType')}</TableCell>
              <TableCell align="right">{t('action')}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {districtsList?.length ? (
              districtsList.map((district, index) => (
                <TableRow key={district.id}>
                  <TableCell width={150}>{index + 1}</TableCell>
                  <TableCell width={150} sx={{ fontWeight: 'bold' }}>
                    {district.code}
                  </TableCell>
                  <TableCell>{district.slug}</TableCell>
                  <TableCell>{district.type}</TableCell>
                  <TableCell>{district.name}</TableCell>
                  <TableCell>{district.nameWithType}</TableCell>
                  <TableCell
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="right" colSpan={5}>
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
        item={selectedDistricts}
        onConfirm={handleRemoveConfirm}
        mainMessage={t('ConfirmDeleteMessage', {
          type: t('Districts'),
          item: selectedDistricts?.name,
        })}
        subMessage={t('SubConfirmDeleteMessage')}
      />
    </>
  );
}
