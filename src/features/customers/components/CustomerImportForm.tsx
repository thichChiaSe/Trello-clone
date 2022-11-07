import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, LocalizationProvider } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import customerApi from 'api/customerApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { DownloadButton, FileUpload, UploadFileStatus } from 'components/Common/FileUpload';
import LinearProgressWithLabel from 'components/Common/LinearProgressWithLabel';
import { InputField } from 'components/FormFields';
import { t } from 'i18next';
import { Customer } from 'models';
import React, { ChangeEvent, DragEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { customerActions, selectCustomerFilter } from '../customerSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { stringUtils } from 'utils';

export interface CustomerFormProps {
  initialValues?: Customer;
  onClose: () => void;
}

const schema = yup.object().shape({});

export default function CustomerImportForm({
  initialValues,
  onClose,
}: CustomerFormProps): JSX.Element {
  const [error, setError] = useState<string>('');
  const isEdit = Boolean(initialValues?.id);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectCustomerFilter);
  const [currency, setCurrency] = React.useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  const [open, setOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFileStatus[]>();
  const [onUpload, setOnUpload] = useState<boolean>();
  const [doneUpload, setDoneUpload] = useState<boolean>();
  const [progress, setProgress] = useState<number>();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Customer>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFileChange = (files: FileList) => {
    let items: UploadFileStatus[] = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      items.push({
        succeed: undefined,
        file: file,
        index: index,
      } as UploadFileStatus);
    }
    setUploadFiles(items);
  };

  const handleUploadStatus = (index: number, status: number) => {
    if (uploadFiles) {
      let clone = [...uploadFiles];
      clone[index].status = status;
      setUploadFiles(clone);
    }
  };
  const handleClose = () => {
    // if (onUpload) {
    //   if (doneUpload) {
    //     setUploadFiles(undefined);
    //   }
    //   return;
    // }
    setOpen(!open);
    console.log('click');
  };

  const handleCustomerFormSubmit = async (formValues: Customer) => {
    // await customerApi.import(formValues);
    // dispatch(customerActions.fetchCustomerList(filter));
    // onClose();
  };

  return (
    <Box maxWidth={666}>
      <form onSubmit={handleSubmit(handleCustomerFormSubmit)}>
        {!onUpload && (
          <div
            style={{
              height: '90px',
              margin: '15px',
            }}
          >
            <FileUpload
              accept={
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              }
              hoverLabel={t('choose file upload').toString()}
              dropLabel={t('Drop file here').toString()}
              height="100px"
              width="400px"
              border="dashed 2px gainsboro"
              backgroundColor="#EAEBEE"
              multiple={true}
              onChange={function (event: ChangeEvent<HTMLInputElement>): void {
                if (event.target.files !== null && event.target?.files?.length > 0) {
                  handleFileChange(event.target.files);
                }
              }}
              onDrop={function (event: DragEvent<HTMLElement>): void {
                handleFileChange(event.dataTransfer.files);
              }}
            />
          </div>
        )}
        {uploadFiles && (
          /*
                  List of file
                 */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignContent: 'center',
              marginLeft: '15px',
              textAlign: 'center',
            }}
          >
            {onUpload && (
              <div
                style={{
                  marginBottom: '15px',
                }}
              >
                <LinearProgressWithLabel value={progress ?? 0} total={uploadFiles.length} />
              </div>
            )}
            <List
              sx={{
                width: '100%',
                maxHeight: onUpload ? 'calc(100vh - 190px)' : 'calc(100vh - 380px)',
                overflow: 'auto',
              }}
            >
              {uploadFiles.map((item) => (
                <ListItem
                  key={item.file.name}
                  secondaryAction={
                    item.status === 1 ? (
                      <CircularProgress size={15} />
                    ) : item.status === 2 ? (
                      <CheckCircleIcon color="success" />
                    ) : item.status === 3 ? (
                      <ErrorIcon color="error" />
                    ) : (
                      ''
                    )
                  }
                  style={{
                    backgroundColor:
                      item.status === 2 ? '#eaf6f0' : item.status === 3 ? '#fbe8e8' : '',
                  }}
                >
                  <ListItemAvatar>
                    <InsertDriveFileIcon
                      color={
                        item.status === 2 ? 'success' : item.status === 3 ? 'error' : 'inherit'
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText primary={stringUtils.getName(item.file.name, 38)} />
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <Divider />
        <div style={{ marginTop: '20px', width: 'calc(100% - 28px)', marginLeft: '15px' }}>
          <DownloadButton />
        </div>
        {error && <Alert severity="error">{error}</Alert>}

        <div
          style={{
            height: '35px',
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
            justifyContent: 'end',
          }}
        >
          {onUpload && (
            <>
              <Button
                style={{
                  marginLeft: '25px',
                }}
                onClick={() => {
                  handleClose();
                }}
                variant="contained"
                disabled={!doneUpload}
              >
                {t('done')}
              </Button>
            </>
          )}
          {!onUpload && (
            <>
              <Button
                style={{
                  marginLeft: '25px',
                }}
                onClick={() => {
                  handleClose();
                }}
              >
                {t('cancel')}
              </Button>
              <Button
                style={{
                  marginRight: '25px',
                }}
                disabled={!uploadFiles}
                variant="contained"
                // onClick={async () => {
                //   if (uploadFiles) {
                //     for (let index = 0; index < uploadFiles.length; index++) {
                //       const item = uploadFiles[index];
                //       try {
                //         handleUploadStatus(index, 1);
                //         const response = await customerApi.importFile(item.file);
                //         if (response.succeed) {
                //           handleUploadStatus(index, 2);
                //         } else {
                //           handleUploadStatus(index, 3);
                //         }
                //       } catch (error) {
                //         handleUploadStatus(index, 3);
                //       }
                //       setUploadFiles(uploadFiles);
                //     }
                //   }
                // }}
              >
                {t('Confirm')}
              </Button>
            </>
          )}
        </div>
      </form>
    </Box>
  );
}
