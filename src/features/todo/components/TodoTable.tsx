import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const data = [
  {
    name: 'Board số 2',
    background: null,
    backgroundType: 0,
    members: [
      {
        userName: 'superadmin',
        fullName: 'Nhật Duy',
        role: 0,
        id: '77b30de9-21cd-4f91-8f09-d3aca9e44960',
        description: null,
        isDeleted: false,
        dateCreated: '2022-10-28T04:19:12.225Z',
        dateUpdated: '2022-10-28T04:19:12.225Z',
      },
    ],
    status: 0,
    id: '5c04dbfb-7418-4177-ace7-30bcfe28febf',
    description: null,
    isDeleted: false,
    dateCreated: '2022-10-31T04:51:01.999Z',
    dateUpdated: '2022-10-31T04:51:01.999Z',
  },
  {
    name: 'string',
    background: null,
    backgroundType: 0,
    members: [
      {
        userName: 'superadmin',
        fullName: 'Nhật Duy',
        role: 0,
        id: '77b30de9-21cd-4f91-8f09-d3aca9e44960',
        description: null,
        isDeleted: false,
        dateCreated: '2022-10-28T04:19:12.225Z',
        dateUpdated: '2022-10-28T04:19:12.225Z',
      },
    ],
    status: 0,
    id: 'd0174a61-6d4a-4671-b761-f533680ac314',
    description: null,
    isDeleted: false,
    dateCreated: '2022-11-08T08:49:48.498Z',
    dateUpdated: '2022-11-08T08:49:48.498Z',
  },
];

export default function CustomPaginationActionsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {data.map((e) => (
            <TableRow key={e.name}>
              <TableCell component="th" scope="row">
                {e.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
