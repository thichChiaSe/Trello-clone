import { Card, CardContent, Grid, LinearProgress, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { t } from 'i18next';
import { ReportDetail } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dateUtils } from 'utils';
import { indicatorUtils } from 'utils/Common';
import DetailTable from '../components/DetailTable';
import { reportActions } from '../reportSlice';
import { makeStyles } from '@mui/styles';
// Accepts the array and key
const groupBy = (array: any[], key: string) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
const useStyle = makeStyles({
  loading: {
    position: 'absolute',
    top: -8,
    width: '100%',
  },
});
export function DetailPage() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<any>();
  const [keyPopulation, setKeyPopulation] = useState<any>();
  const [gender, setGender] = useState<any>();
  const [ageGroup, setAgeGroup] = useState<any>();
  const [total, setTotal] = useState<number>(0);
  const classes = useStyle();
  const report = useAppSelector((s) => s.report.selectedReport);
  const loading = useAppSelector((s) => s.report.loading);

  useEffect(() => {
    dispatch(reportActions.fetchReport(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (report?.reportDetails) {
      const process = (array: ReportDetail[], key: string): any[] => {
        const total = array.reduce((sum, current) => sum + current.total, 0);
        const group = groupBy(report?.reportDetails, key);
        const keys = Object.keys(group);
        let result: any[] = [];
        keys.forEach((s) => {
          let element_total = group[s].reduce(
            (sum: number, current: any) => sum + current.total,
            0
          );
          result.push({
            name: s,
            total: element_total,
            percent: element_total / total,
          });
        });
        return result;
      };
      setSite(process(report?.reportDetails, 'site'));
      setGender(process(report?.reportDetails, 'gender'));
      setKeyPopulation(process(report?.reportDetails, 'keyPopulation'));
      setAgeGroup(process(report?.reportDetails, 'ageGroup'));
      setTotal(report?.reportDetails.reduce((sum, current) => sum + current.total, 0));
    }
  }, [report]);

  // data
  const columns = [
    {
      field: 'name',
      header: t('Category site'),
    },
    {
      field: 'total',
      header: t('Value'),
    },
    {
      field: 'percent',
      header: t('percent'),
      // formatter:(value:any)=>value*10
    },
  ];
  const columns1 = [
    {
      field: 'name',
      header: t('Category gender'),
    },
    {
      field: 'total',
      header: t('Value'),
    },
    {
      field: 'percent',
      header: t('percent'),
    },
  ];
  const columns2 = [
    {
      field: 'name',
      header: t('Category ageGroup'),
    },
    {
      field: 'total',
      header: t('Value'),
    },
    {
      field: 'percent',
      header: t('percent'),
    },
  ];
  const columns3 = [
    {
      field: 'name',
      header: t('Category keyPopulation'),
    },
    {
      field: 'total',
      header: t('Value'),
    },
    {
      field: 'percent',
      header: t('percent'),
    },
  ];
  const columns4 = [
    {
      field: 'site',
      header: t('Site'),
    },
    {
      field: 'ageGroup',
      header: t('Age groups'),
    },
    {
      field: 'gender',
      header: t('gender'),
    },
    {
      field: 'keyPopulation',
      header: t('Key Population'),
    },
    {
      field: 'total',
      header: t('Value'),
    },
    {
      field: 'percent',
      header: t('percent'),
    },
  ];

  return (
    <div
      style={{
        padding: '5px',
      }}
    >
      {loading && <LinearProgress className={classes.loading} />}
      {console.log(report?.reportDetails)}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    label={t('numeral')}
                    value={report ? indicatorUtils.get(report?.indicatorCode ?? 0) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label={t('Year')}
                    value={report ? dateUtils.getYear(report?.reportPeriod) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label={t('Quarter')}
                    value={report ? dateUtils.getQuarter(report?.reportPeriod) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant="outlined"
                    label={t('Month')}
                    value={report ? dateUtils.getMonth(report?.reportPeriod) : ''}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DetailTable
                columns={columns}
                sx={{ maxHeight: 490 }}
                data={(site || []).map((e: any) => ({
                  ...e,
                  percent: Math.round(e.percent * 10000) / 100 + '%',
                }))}
                ads={(site || []).map((e: any) => ({
                  ...e,
                  ads: e.name,
                }))}
              />
            </Grid>
            <Grid item xs={12}>
              <DetailTable
                columns={columns1}
                sx={undefined}
                data={(gender || []).map((e: any) => ({
                  ...e,
                  percent: Math.round(e.percent * 10000) / 100 + '%',
                }))}
                ads={(gender || []).map((e: any) => ({
                  ...e,
                  ads: e.name,
                }))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DetailTable
                sx={{ maxHeight: 331 }}
                columns={columns2}
                data={(ageGroup || []).map((e: any) => ({
                  ...e,
                  percent: Math.round(e.percent * 10000) / 100 + '%',
                }))}
                ads={(ageGroup || []).map((e: any) => ({
                  ...e,
                  ads: e.name,
                }))}
              />
            </Grid>
            <Grid item xs={12}>
              <DetailTable
                columns={columns3}
                sx={{ maxHeight: 340 }}
                data={(keyPopulation || []).map((e: any) => ({
                  ...e,
                  percent: Math.round(e.percent * 10000) / 100 + '%',
                }))}
                ads={(keyPopulation || []).map((e: any) => ({
                  ...e,
                  ads: e.name,
                }))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DetailTable
            columns={columns4}
            sx={{ maxHeight: 'calc(100vh - 75px)' }}
            data={(report?.reportDetails || []).map((e: any) => ({
              ...e,
              percent: Math.round((e.total / total) * 10000) / 100 + '%',
            }))}
            ads={(report?.reportDetails || []).map((e: any) => ({
              ...e,
              ads: e.site + e.ageGroup + e.gender + e.keyPopulation,
            }))}
          />
        </Grid>
      </Grid>
    </div>
  );
}
