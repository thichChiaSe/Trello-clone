import { PayloadAction } from '@reduxjs/toolkit';
import todoApi from 'api/todoApi';
import { ListParams, ListResponse, Board, Columns } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { todoActions } from './todoSlice';

function* fetchTodoList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Board> = yield call(todoApi.getAll, action.payload);
    yield put(todoActions.fetchTodoListSuccess(response));
  } catch (err) {
    yield put(todoActions.fetchTodoFailed());
    console.log(err);
  }
}
function* fetchTodoColumns(action: PayloadAction<ListParams>) {
  try {
    const res: ListResponse<Columns> = yield call(todoApi.getColumns, action.payload);
    console.log('🚀 ~ file: todoSaga.ts ~ line 19 ~ function*fetchTodoColumns ~ res', res);
    yield put(todoActions.fetchTodoColumnsSuccess(res));
  } catch (error) {
    yield put(todoActions.fetchTodoFailed());
    console.log(error);
  }
}
export function* todoSaga() {
  yield takeLatest(todoActions.fetchTodoList, fetchTodoList);
  yield takeLatest(todoActions.fetchTodoColumns, fetchTodoColumns);
}
