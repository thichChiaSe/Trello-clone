import { Box, Paper, Tab, Tabs, Theme, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { makeStyles, styled } from '@mui/styles';
import { t } from 'i18next';
import { CustomerDetail } from 'models';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ServiceUsageHistory from './ServiceUsageHistory';

interface StyledTabProps {
  label: string;
}
interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export interface ReportTableProps {
  data: CustomerDetail[];
  startIndex?: number;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  marginLeft: '25px!important',

  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
  },
});
const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'fontWeightRegular',
    fontSize: '15px',
    color: '#000',
    '&.Mui-selected': {
      border: '1px solid #1E72FC',
      backgroundColor: '#1E72FC',
      borderRadius: '5px',
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'red',
    },
  })
);
const useStyles = makeStyles((theme: Theme) => ({
  table: {},
  edit: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  tab: {
    marginRight: '20px',
  },
}));
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function ReportTable() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ bgcolor: '#F5F5F5', marginTop: '10px' }}>
          <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
            <StyledTab
              className={classes.tab}
              label={t('personal information')}
              {...a11yProps(0)}
            />
            <StyledTab label={t('service usage history')} {...a11yProps(1)} />
          </StyledTabs>
          <Box />
          <Box>
            <TabPanel value={value} index={0}>
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 'calc(100vh - 250px)', maxWidth: 'calc(100vw-20px)' }}
              >
                <Table stickyHeader className={classes.table} size="small">
                  <TableHead>
                    <div className={classes.edit}>
                      <Button sx={{ alignItem: 'right', textDecoration: 'underline' }}>
                        <EditIcon sx={{ fontSize: '20px', marginRight: '5px' }} />
                        {t('edit')}
                      </Button>
                    </div>
                  </TableHead>
                  <TableBody
                    sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0 10px 0' }}
                  >
                    <TableCell sx={{ textAlign: 'right' }}>
                      <TableRow>{t('uid')}:</TableRow>
                      <TableRow>{t('first and last name')}:</TableRow>
                      <TableRow>{t('birthyear')}:</TableRow>
                      <TableRow>{t('number phone')}:</TableRow>
                      <TableRow>{t('gender')}:</TableRow>
                      <TableRow>{t('cmnd')}:</TableRow>
                      <TableRow>{t('passport')}:</TableRow>
                      <TableRow>{t('job')}:</TableRow>
                      <TableRow>{t('ethnic')}:</TableRow>
                      <TableRow>{t('address')}:</TableRow>
                      <TableRow>{t('code BHYT')}:</TableRow>
                      <TableRow>{t('code ARV')}:</TableRow>
                    </TableCell>
                    <TableCell>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                      <TableRow>#</TableRow>
                    </TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ServiceUsageHistory />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
}
