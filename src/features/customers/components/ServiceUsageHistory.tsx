import { Box, Tab, Tabs, Theme, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import { t } from 'i18next';
import { CustomerDetail } from 'models';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      border: '1px solid #4A4FE4',
      backgroundColor: '#4A4FE4',
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
export default function ServiceUsageHistory() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#F7F8FC' }}>
            <TableRow>
              <TableCell>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                  <StyledTab className={classes.tab} label={t('testing')} {...a11yProps(0)} />
                  <StyledTab label={t('treatment PrEP')} {...a11yProps(1)} />
                  <StyledTab label={t('ART')} {...a11yProps(2)} />
                </StyledTabs>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Box>
              <TabPanel value={value} index={0}>
                tab 1
              </TabPanel>
              <TabPanel value={value} index={1}>
                tab 2
              </TabPanel>
              <TabPanel value={value} index={2}>
                tab 3
              </TabPanel>
            </Box>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
