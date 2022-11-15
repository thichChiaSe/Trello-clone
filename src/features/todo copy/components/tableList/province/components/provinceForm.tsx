// import { yupResolver } from '@hookform/resolvers/yup';
// import { Alert } from '@mui/lab';
// import { Box, Button, CircularProgress } from '@mui/material';
// import provinceApi from 'api/provinceApi';
// import { useAppDispatch, useAppSelector } from 'app/hooks';
// import { InputField } from 'components/FormFields';
// import { provinceActions, selectProvinceFilter } from 'features/categories/province/provinceSlice';
// import { t } from 'i18next';
// import { Province } from 'models';
// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import * as yup from 'yup';

// export interface ProvinceFormProps {
//   initialValues?: Province;
//   onClose: () => void;
// }

// const schema = yup.object().shape({
//   alias: yup.string().required(t('Key population name is required')),
// });

// export default function ProvinceForm({ initialValues, onClose }: ProvinceFormProps): JSX.Element {
//   const error = useState<string>('');
//   const isEdit = Boolean(initialValues?.id);
//   const dispatch = useAppDispatch();
//   const filter = useAppSelector(selectProvinceFilter);

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<Province>({
//     defaultValues: initialValues,
//     resolver: yupResolver(schema),
//   });

//   const handleProvinceFormSubmit = async (formValues: Province) => {
//     if (isEdit) {
//       await provinceApi.updateSyn(formValues);
//       toast.success(t('Update key population successfully'));
//     } else {
//       await provinceApi.addSyn(formValues);
//       toast.success(t('Create key population successfully'));
//     }
//     dispatch(provinceActions.fetchProvinceList(filter));
//     onClose();
//   };

//   return (
//     <Box maxWidth={400}>
//       <form onSubmit={handleSubmit(handleProvinceFormSubmit)}>
//         <InputField
//           name="alias"
//           control={control}
//           placeholder={t('Input synonyms')}
//           label={`${t('Synonyms')}*`}
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

export default function provinceForm({}: Props) {
  return <div>provinceForm</div>;
}
