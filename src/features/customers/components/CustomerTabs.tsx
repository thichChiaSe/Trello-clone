import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { t } from 'i18next';
import CustomerTable from './CustomerTable';
import { customerActions, selectCustomerFilter, selectCustomerList } from '../customerSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Theme } from '@mui/material';
import { Customer } from 'models';
import { selectPrepList } from 'features/customerHistories/prep/prepSlice';
import PrepTable from '../../customerHistories/prep/components/PrEPTable';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const useStyles = makeStyles((theme: Theme) => ({}));
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
        <Box sx={{ p: 0 }}>
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

export default function CustomerTabs() {
  const [value, setValue] = React.useState(0);
  const PrEPList = useAppSelector(selectPrepList);
  const customerList = useAppSelector(selectCustomerList);
  const classes = useStyles();
  const filter = useAppSelector(selectCustomerFilter);
  const dispatch = useAppDispatch();

  const [openPopup, setOpenPopup] = React.useState(false);
  const [customer, setCustomer] = React.useState<Customer>();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleRemoveCustomer = async (customer: Customer) => {
    try {
      const newFilter = { ...filter };
      dispatch(customerActions.fetchCustomerList(newFilter));
    } catch (error) {
      console.log('Failed to fetch customer', error);
    }
  };
  const handleEditCustomer = async (customer: Customer) => {
    // history.push(`${match.url}/${customer.id}`);
    setCustomer(customer);
    setOpenPopup(true);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('testing')} {...a11yProps(0)} />
          <Tab label={t('treatment PrEP')} {...a11yProps(1)} />
          <Tab label={t('treatment ARV')} {...a11yProps(2)} />
          <Tab label={t('drug')} {...a11yProps(3)} />
          <Tab label={t('Health Insurance')} {...a11yProps(4)} />
          <Tab label={t('service quality')} {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CustomerTable
          customerList={customerList}
          onRemove={handleRemoveCustomer}
          onEdit={handleEditCustomer}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PrepTable data={PrEPList} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Three
      </TabPanel>
    </Box>
  );
}
