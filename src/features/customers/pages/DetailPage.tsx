import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, LinearProgress, Typography } from '@mui/material';
import { viVN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { t } from 'i18next';
import { Customer } from 'models';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ReportTable from '../components/ReportTable';
const theme = createTheme({}, viVN);

export default function DetailPage() {
  const history = useHistory();
  // const { uid } = useParams<{ uid: string }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [report, setReport] = useState<Customer>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
  }
  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         setLoading(true);
  //         const data: ResponseMessage<Customer> = await customerApi.getById(uid);
  //         setLoading(false);
  //         setReport(data.data);
  //       } catch (error) {
  //         toast.error(t('Get data failed'));
  //       }
  //     })();
  //   }, [uid]);
  const linkStyle = {
    textDecoration: 'none',
    color: '#747C8C',
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h6" align="left" sx={{ marginLeft: '20px' }}>
        {t('PERSONAL DATA MANAGEMENT')}
      </Typography>
      <div style={{ padding: 20, display: 'flex' }}>
        <Button
          sx={{
            minWidth: '45px',
            height: '40px',
            boxShadow:
              'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
          }}
          startIcon={
            <ArrowBackIcon sx={{ marginLeft: '8px!important', fontSize: '25px!important' }} />
          }
          onClick={() => {
            history.push('/drug-histories');
          }}
        />
        <div style={{ flexDirection: 'column', marginLeft: '50px' }}>
          <Typography variant="h4">
            {t('#UID')} {report?.uid}
          </Typography>
          <div style={{ marginTop: '10px' }} role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link style={linkStyle} to="/client">
                {t('personal data management')}
              </Link>
              <Link style={linkStyle} to="/client">
                {t('confirmatory test')}
              </Link>
              <Typography color="text.primary">{t('detail info personal')}</Typography>
            </Breadcrumbs>
          </div>
        </div>
      </div>
      <ReportTable />
      {loading && <LinearProgress />}
      {report && <></>}
      {!report && <p>{t('No data to display')}</p>}
    </ThemeProvider>
  );
}
