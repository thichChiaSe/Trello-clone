import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { t } from 'i18next';
import ListPageProvince from './tableList/province/pages/ListPageProvince';
import ListPageDistrict from './tableList/district/pages/ListPageDistrict';
import ListPageSite from './tableList/site/pages/ListPageSite';
import ListPageGender from './tableList/gender/pages/ListPageGender';
import ListPageAgeGroup from './tableList/ageGroup/pages/ListPageAgeGroup';
import ListPageKeyPopulation from './tableList/keyPopulation/pages/ListPageKeyPopulation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function SynonymTab(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ marginTop: '15px' }}
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

export default function SynonymsTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <Box sx={{ width: '100%', padding: '0px !important' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label={t('Province')} {...a11yProps(0)} />
          <Tab label={t('District')} {...a11yProps(1)} />
          <Tab label={t('Sites')} {...a11yProps(2)} />
          <Tab label={t('Gender')} {...a11yProps(3)} />
          <Tab label={t('Age groups')} {...a11yProps(4)} />
          <Tab label={t('Key Population')} {...a11yProps(5)} />
        </Tabs>
      </Box>
      <SynonymTab value={value} index={0}>
        <ListPageProvince />
      </SynonymTab>
      <SynonymTab value={value} index={1}>
        <ListPageDistrict />
      </SynonymTab>
      <SynonymTab value={value} index={2}>
        <ListPageSite />
      </SynonymTab>
      <SynonymTab value={value} index={3}>
        <ListPageGender />
      </SynonymTab>
      <SynonymTab value={value} index={4}>
        <ListPageAgeGroup />
      </SynonymTab>
      <SynonymTab value={value} index={5}>
        <ListPageKeyPopulation />
      </SynonymTab>
    </Box>
  );
}
