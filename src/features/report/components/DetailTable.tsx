import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { t } from 'i18next';
import { Report } from 'models';

export interface TableProps {
  data: any;
  startIndex?: number;
  columns: any;
  sx: any;
  ads: any;
  onSelectReport?: (report: Report) => void;
}

export default function DetailTable({ sx, data, columns, ads }: TableProps) {
  return (
    <>
      <TableContainer component={Paper} sx={{ sx }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((head: any) => (
                <TableCell>{head.header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              data.map((body: any) => (
                <TableRow key={body.ads}>
                  {columns.map((col: any) => (
                    // <TableCell>formatter({body[col.field]})</TableCell>
                    <TableCell>{body[col.field]}</TableCell>
                  ))}
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
    </>
  );
}
