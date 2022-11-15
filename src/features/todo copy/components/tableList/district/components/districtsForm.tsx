// import { yupResolver } from '@hookform/resolvers/yup';
// import { Alert } from '@mui/lab';
// import { Box, Button, CircularProgress } from '@mui/material';
// import districtsApi from 'api/districtsApi';
// import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { InputField } from 'components/FormFields';
// import {
//   districtsActions,
//   selectDistrictsFilter,
// } from 'features/categories/districts/districtsSlice';
// import { t } from 'i18next';
// import { Districts } from 'models';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import * as yup from 'yup';

// export interface DistrictsFormProps {
//   initialValues?: Districts;
//   onClose: () => void;
// }

// const schema = yup.object().shape({
//   alias: yup.string().required(t('Synonyms is required')),
// });

// export default function DistrictsForm({ initialValues, onClose }: DistrictsFormProps): JSX.Element {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [error, setError] = useState<string>('');
//   const isEdit = Boolean(initialValues?.id);
//   const dispatch = useAppDispatch();
//   const filter = useAppSelector(selectDistrictsFilter);

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<Districts>({
//     defaultValues: initialValues,
//     resolver: yupResolver(schema),
//   });

//   const handleDistrictsFormSubmit = async (formValues: Districts) => {
//     if (isEdit) {
//       await districtsApi.updateSyn(formValues);
//       toast.success(`${t('Update districts successfully')}!`);
//     } else {
//       await districtsApi.addSyn(formValues);
//       toast.success(`${t('Create districts successfully')}!`);
//     }
//     dispatch(districtsActions.fetchDistrictsList(filter));
//     onClose();
//   };

//   return (
//     <Box maxWidth={400}>
//       <form onSubmit={handleSubmit(handleDistrictsFormSubmit)}>
//         <InputField
//           name="alias"
//           control={control}
//           placeholder={t('Input synonyms')}
//           label={`${t('Input synonyms')}*`}
//         />
//         {error && <Alert severity="error">{error}</Alert>}
//         <Box mt={3}>
//           <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
//             {isSubmitting && <CircularProgress size={16} color="primary" />}
//             &nbsp;{t('Confirm')}
//           </Button>
//         </Box>
//       </form>
//     </Box>
//   );
// }
import React from 'react';

type Props = {};

const districtsForm = (props: Props) => {
  return <div>districtsForm</div>;
};
