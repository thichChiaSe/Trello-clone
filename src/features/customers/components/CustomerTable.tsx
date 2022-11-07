import { Box, Grid, IconButton, Pagination, Paper, TablePagination, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import React, { useEffect, useState } from 'react';
import { red } from '@mui/material/colors';
import { t } from 'i18next';
import { CommonButton } from 'components/Common/CommonButton';
import CustomerFilters from '../components/CustomerFilters';
import AddIcon from '@mui/icons-material/Add';
import Popup from 'components/Common/PopUp';
import CustomerForm from './CustomerForm';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { customerActions, selectCustomerFilter, selectCustomerTotalRow } from '../customerSlice';
import { Customer, ListParams } from 'models';
import { CommonButtonWhite } from 'components/Common/CommonButtonWhite';
import CustomerImportForm from './CustomerImportForm';
import CommonDialog from 'components/Common/CommonDialog';

const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  container: {
    padding: '0px!important',
    marginTop: '24px!important',
  },
  edit: {
    marginRight: 4,
  },
  '&:hover button': {
    width: '200px',
    transition: '0.4s',
    borderRadius: '35px',
  },
  '&:hover buttonWhite': {
    color: '#fff!important',
    backgroundColor: '#5751E5!important',
  },
}));
const boxSX = {
  marginRight: '20px',
  color: '#5751E5',
  border: '1px solid #5751E5',
  '&:hover': {
    color: '#fff!important',
    backgroundColor: '#5751E5!important',
  },
};
export interface TableProps {
  customerList: Customer[];
  onEdit?: (province: Customer) => void;
  onRemove?: (province: Customer) => void;
}

export default function CustomerTable({ customerList, onEdit, onRemove }: TableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const filter = useAppSelector(selectCustomerFilter);

  const [selectCustomer, setSelectCustomer] = useState<Customer>();

  const [pageIndex, setPageIndex] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const totalRow = useAppSelector(selectCustomerTotalRow);

  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupImport, setOpenPopupImport] = useState(false);

  const customer = useState<Customer>();

  const handleRemoveClick = (customer: Customer) => {
    setSelectCustomer(customer);
    setOpen(true);
  };
  const handleRemoveConfirm = (customer: Customer) => {
    onRemove?.(customer);
    setOpen(false);
  };
  const initialValues: Customer = {
    name: '',
    unit: '',
    order: '',
    ...customer,
  } as unknown as Customer;

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(filter);
    dispatch(customerActions.fetchCustomerList(filter));
  }, [dispatch, filter]);

  const handleClose = () => {
    setOpen(false);
  };
  const handlePageChange = (e: any, page: number) => {
    var pageIndex = page - 1;
    setPageIndex(page);
    dispatch(
      customerActions.setFilter({
        ...filter,
        pageIndex,
      })
    );
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(customerActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(customerActions.setFilter(newFilter));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(1);
    dispatch(
      customerActions.setFilter({
        ...filter,
        pageIndex,
        pageSize,
      })
    );
  };
  return (
    <div style={{ marginTop: '30px' }}>
      <Grid container mb={3}>
        <Grid xs={6} width="100%" md={6}>
          <CustomerFilters
            filter={filter}
            onChange={handleFilterChange}
            onSearchChange={handleSearchChange}
          />
        </Grid>
        <Grid
          width="100%"
          xs={10}
          md={6}
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          display="flex"
        >
          <CommonButtonWhite
            onClick={() => setOpenPopupImport(true)}
            variant="contained"
            className={classes['&:hover buttonWhite']}
            sx={boxSX}
          >
            <AddIcon sx={{ marginRight: '10px' }} />
            {t('import data')}
          </CommonButtonWhite>
          <CommonButton onClick={() => setOpenPopup(true)} variant="contained">
            <AddIcon sx={{ marginRight: '10px' }} />
            {t('create new customer')}
          </CommonButton>
        </Grid>
      </Grid>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('uid')}</TableCell>
              <TableCell>{t('Fullname')}</TableCell>
              <TableCell>{t('Phone')}</TableCell>
              <TableCell>{t('identity card')}</TableCell>
              <TableCell>{t('passport')}</TableCell>
              <TableCell>{t('gender')}</TableCell>
              <TableCell>{t('yoB')}</TableCell>
              <TableCell>{t('bhyt')}</TableCell>
              <TableCell>{t('ARVCode')}</TableCell>
              <TableCell sx={{ padding: '0 40px 0 0!important' }} align="right">
                {t('Action')}
              </TableCell>
            </TableRow>
          </TableHead>
          {customerList?.length ? (
            customerList.map((customer: Customer, index: number) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.uid}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.cmnd}</TableCell>
                <TableCell>{customer.passport}</TableCell>
                <TableCell>{customer.gender}</TableCell>
                <TableCell>{customer.yoB}</TableCell>
                <TableCell>{customer.bhyt}</TableCell>
                <TableCell>{customer.ARVCode}</TableCell>
                <TableCell
                  component="div"
                  align="right"
                  sx={{
                    marginRight: '10px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton aria-label="{t('View')}" color="primary" onClick={() => {}}>
                    <RemoveRedEyeIcon />
                  </IconButton>
                </TableCell>
                <TableCell
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <IconButton aria-label="edit" color="primary" onClick={() => onEdit?.(customer)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: red[500] }}
                    onClick={() => handleRemoveClick(customer)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  {t('No data to display')}
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <CommonDialog
        open={open}
        onClose={handleClose}
        item={selectCustomer}
        onConfirm={handleRemoveConfirm}
        mainMessage={t('ConfirmDeleteMessage', {
          type: t('Customer'),
          item: selectCustomer?.name,
        })}
        subMessage={t('SubConfirmDeleteMessage')}
      />
      <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          count={Math.ceil(totalRow / pageSize)}
          page={pageIndex}
          onChange={handlePageChange}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRow}
          rowsPerPage={pageSize}
          page={pageIndex - 1}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Popup
        title={initialValues?.id ? t('create new') : t('edit')}
        subtitle={t('Please enter all information in the box below')}
        openPopup={openPopup}
        onClose={() => setOpenPopup(false)}
      >
        <CustomerForm onClose={() => setOpenPopup(false)} initialValues={initialValues} />
      </Popup>
      <Popup
        title={t('Import data customer')}
        openPopup={openPopupImport}
        onClose={() => setOpenPopupImport(false)}
      >
        <CustomerImportForm
          onClose={() => setOpenPopupImport(false)}
          initialValues={initialValues}
        />
      </Popup>
    </div>
  );
}
