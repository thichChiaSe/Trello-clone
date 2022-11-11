import { authSaga } from 'features/auth/authSaga';
import { todoSaga } from 'features/todo/todoSaga';

import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([authSaga(), todoSaga()]);
}
