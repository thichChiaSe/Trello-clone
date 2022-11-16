import { Button, IconButton, Paper, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
import { t } from 'i18next';
import { Site } from 'models/site';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '250px',
    border: '1px solid #08ab3b',
  },
  title: {
    backgroundColor: '#08ab3b',
  },
  table: {},
  edit: {
    marginRight: 4,
  },
}));

export interface SiteTableProps {
  siteList: Site[];
  onEdit?: (site: Site) => void;
  onRemove?: (site: Site) => void;
}

export default function SiteTable({ siteList, onEdit, onRemove }: SiteTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (site: Site) => {
    setSelectedSite(site);
    setOpen(true);
  };

  const handleRemoveConfirm = (site: Site) => {
    onRemove?.(site);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className={classes.title}>
              <TableCell>Success</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siteList?.length ? (
              siteList.map((site, index) => (
                <TableRow key={site.id}>
                  <TableCell width={250}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {!site.alias ? t('No data to display') : site.alias}
                      <div style={{ marginLeft: '10px' }}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => onEdit?.(site)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          sx={{ color: red[500] }}
                          onClick={() => {
                            handleRemoveClick(site);
                          }}
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
                    <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(site)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      sx={{ color: red[500] }}
                      onClick={() => {
                        handleRemoveClick(site);
                      }}
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <ClearIcon sx={{ fontSize: 60 }} color="error" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('ConfirmDeleteMessage')} "{selectedSite?.name}"?. <br />
            {`${t('SubConfirmDeleteMessage')}.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedSite as Site)}
            color="error"
            variant="contained"
            autoFocus
          >
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
