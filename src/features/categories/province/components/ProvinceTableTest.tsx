import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { Province } from 'models';
import EditIcon from '@mui/icons-material/Edit';
import CommonDialog from 'components/Common/CommonDialog';
import { red } from '@mui/material/colors';
import { t } from 'i18next';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
export interface ProvinceTableProps {
  provinceList: Province[];
  onEdit?: (province: Province) => void;
  onRemove?: (province: Province) => void;
}

// const useStyles = makeStyles((theme: Theme) => ({
//   table: {},
// }));

// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

type Order = 'asc' | 'desc';

// function getComparator<Key extends keyof any>(
//   order: Order,
//   orderBy: Key
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

interface HeadCell {
  disablePadding: boolean;
  id: keyof Province;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: '#',
  },
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'MÃ',
  },
  {
    id: 'slug',
    numeric: false,
    disablePadding: false,
    label: 'SLUG',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'LOẠI',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'TÊN',
  },
  {
    id: 'nameWithType',
    numeric: false,
    disablePadding: false,
    label: 'Tên Chuẩn',
  },
  {
    id: 'standardName',
    numeric: true,
    disablePadding: false,
    label: 'THAO TÁC',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Province) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Province) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProvince, setSelectedProvince] = React.useState<Province>();
  // const handleRemoveClick = (province: Province) => {
  //   setSelectedProvince(province);
  //   setOpen(true);
  // };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon aria-label="delete" sx={{ color: red[500] }} />
          </IconButton>
        </Tooltip>
      ) : (
        <div style={{ display: 'flex' }}>
          <Tooltip title={t('Create Report').toString()}>
            <IconButton color="primary" onClick={() => {}}>
              <PlaylistAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('Export Excel').toString()}>
            <IconButton color="primary" onClick={() => {}}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </Toolbar>
  );
};

export default function ProvinceTableTest({ provinceList, onEdit, onRemove }: ProvinceTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Province>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dense, setDense] = React.useState(false);
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedProvince, setSelectedProvince] = React.useState<Province>();
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Province) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = provinceList.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={0}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {provinceList?.length ? (
                provinceList.map((province, index) => {
                  const isItemSelected = isSelected(province.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, province.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={province.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{province.code}</TableCell>
                      <TableCell align="left">{province.slug}</TableCell>
                      <TableCell align="left">{province.type}</TableCell>
                      <TableCell align="left">{province.name}</TableCell>
                      <TableCell align="left">{province.nameWithType}</TableCell>
                      <TableCell
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          alignItems: 'left',
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
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    {t('No data to display')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <CommonDialog
          open={open}
          onClose={handleClose}
          item={selectedProvince}
          onConfirm={handleRemoveConfirm}
          mainMessage={t('ConfirmDeleteMessage', {
            type: t('Key Population'),
            item: selectedProvince?.name,
          })}
          subMessage={t('SubConfirmDeleteMessage')}
        ></CommonDialog>
      </Paper>
    </Box>
  );
}
