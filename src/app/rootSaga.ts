import { authSaga } from 'features/auth/authSaga';
import { districtsSaga } from 'features/todo copy/components/tableList/district/districtSaga';
import provinceSaga from 'features/todo copy/components/tableList/province/provinceSaga';
import { siteSaga } from 'features/todo copy/components/tableList/site/siteSaga';
import { todoSaga } from 'features/todo/todoSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), todoSaga(), districtsSaga(), provinceSaga(), siteSaga()]);
}
