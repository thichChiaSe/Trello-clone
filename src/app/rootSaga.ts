import { authSaga } from 'features/auth/authSaga';
import { districtsSaga } from 'features/todo copy/components/tableList/district/pendingSaga';
import { genderSaga } from 'features/todo copy/components/tableList/gender/genderSaga';
import provinceSaga from 'features/todo copy/components/tableList/province/inprogressSaga';
import { todoSaga } from 'features/todo/todoSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), todoSaga(), districtsSaga(), provinceSaga(), genderSaga()]);
}
