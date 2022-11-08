import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import { ButtonCountries } from 'components/Common/ButtonCountries';

const Link = styled(NavLink)({
  textDecoration: 'none',
  color: 'inherit',

  '&.active > div': {
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  },
});
export function MenuList() {
  const { t } = useTranslation();
  const [openCate, setOpenCate] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const categories = [
    {
      text: t('Bảng'),
      link: '/todo',
    },
    {
      text: t('Cài đặt'),
      link: '/districts',
    },
  ];

  // const useStyles = makeStyles({
  //   nav: {
  //     boxShadow:
  //       'rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px',
  //     backgroundColor: 'white',
  //     borderRadius: '15px',
  //   },
  // });
  // const classes = useStyles();
  return (
    <List component="nav" style={{ height: 'calc(100vh - 10px)', overflow: 'auto' }}>
      <Link to="/dashboard">
        <ListItemButton style={{ backgroundColor: '#F8F9FE', borderRadius: '5px', margin: '7px' }}>
          <ListItemIcon style={{ minWidth: '40px' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('Dashboard')} />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />
      <div style={{ backgroundColor: '#F8F9FE', borderRadius: '5px', margin: '7px' }}>
        <ListItemButton onClick={() => setOpenCate(!openCate)}>
          <ListItemIcon style={{ minWidth: '40px' }}>
            <CategoryOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t('Không gian làm việc')} style={{ minWidth: '160px' }} />
          {openCate ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse className="Open" in={openCate} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 0 }}>
            {categories.map((cate) => (
              <Link key={cate.link} to={cate.link}>
                <ListItemButton>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ fontSize: 10, listStyleType: 'none' }} />
                  </ListItemIcon>
                  <ListItemText primary={cate.text} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      </div>
      <Divider sx={{ my: 1 }} />
    </List>
  );
}
