import * as React from 'react';
import Box from '@mui/material/Box';
import ListPageProvince from './tableList/province/pages/ListPageInprogress';
import ListPageDistrict from './tableList/district/pages/ListPagePending';
import ListPageSite from './tableList/site/pages/ListPageSite';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function SynonymsTabs() {
  return (
    <Box sx={{ width: '100%', padding: '0px !important' }}>
      <div style={{ display: 'flex' }}>
        <ListPageProvince />
        <ListPageDistrict />
        <ListPageSite />
      </div>
    </Box>
  );
}
