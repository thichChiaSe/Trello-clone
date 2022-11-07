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
      text: t('Province'),
      link: '/provinces',
    },
    {
      text: t('District'),
      link: '/districts',
    },
    {
      text: t('Sites'),
      link: '/sites',
    },
    {
      text: t('Gender'),
      link: '/genders',
    },
    {
      text: t('Age groups'),
      link: '/age-groups',
    },
    {
      text: t('Key Population'),
      link: '/key-populations',
    },
    {
      text: t('Drug'),
      link: '/drugs',
    },
    {
      text: t('Synonyms'),
      link: '/synonyms',
    },
  ];

  const histories = [
    {
      text: t('Testing'),
      link: '/testing',
    },
    {
      text: t('PrEP'),
      link: '/prep',
    },
    {
      text: t('ART'),
      link: '/art',
    },
    // {
    //   text: t('SHI'),
    //   link: '/shi',
    // },
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
    <List component="nav" style={{ height: 'calc(100vh - 65px)', overflow: 'auto' }}>
      <Link to="/dashboard">
        <ListItemButton style={{ backgroundColor: '#F8F9FE', borderRadius: '5px', margin: '7px' }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('Dashboard')} />
        </ListItemButton>
      </Link>
      <Divider sx={{ my: 1 }} />
      <div style={{ backgroundColor: '#F8F9FE', borderRadius: '5px', margin: '7px' }}>
        <ListItemButton onClick={() => setOpenCate(!openCate)}>
          <ListItemIcon>
            <CategoryOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={t('Category')} />
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
        <Link to="/client">
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={t('Client')} />
          </ListItemButton>
        </Link>
        <ListItemButton onClick={() => setOpenHistory(!openHistory)}>
          <ListItemIcon>
            <WorkHistoryIcon />
          </ListItemIcon>
          <ListItemText primary={t('Treatment History')} />
          {openCate ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openHistory} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {histories.map((cate) => (
              <Link key={cate.link} to={cate.link}>
                <ListItemButton>
                  <ListItemIcon>
                    <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={cate.text} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
        <Link to="/drug-histories">
          <ListItemButton>
            <ListItemIcon>
              <MedicationIcon />
            </ListItemIcon>
            <ListItemText primary={t('Drug History')} />
          </ListItemButton>
        </Link>
      </div>
      <Divider sx={{ my: 1 }} />

      <div
        className="report"
        style={{ backgroundColor: '#F8F9FE', borderRadius: '5px', margin: '7px' }}
      >
        <Link to="/report">
          <ListItemButton>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={t('Report')} />
          </ListItemButton>
        </Link>
      </div>
      <div className="switch-language">
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
          style={{ marginTop: '220px' }}
        >
          <ButtonCountries />
        </ul>
      </div>
    </List>
  );
}
