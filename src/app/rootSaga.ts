import { authSaga } from 'features/auth/authSaga';
import { districtsSaga } from 'features/todo copy/components/tableList/district/pendingSaga';
import provinceSaga from 'features/todo copy/components/tableList/province/inprogressSaga';
import { siteSaga } from 'features/todo copy/components/tableList/site/successSaga';
import { todoSaga } from 'features/todo/todoSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), todoSaga(), districtsSaga(), provinceSaga(), siteSaga()]);
}
