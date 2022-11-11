import { PayloadAction } from '@reduxjs/toolkit';
import todoApi from 'api/todoApi';
import { ListParams, ListResponse, Todo } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { todoActions } from './todoSlice';

function* fetchTodoList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Todo> = yield call(todoApi.getAll, action.payload);
    console.log('aaa', response);
    yield put(todoActions.fetchTodoListSuccess(response));
  } catch (err) {
    yield put(todoActions.fetchTodoFailed());
    console.log(err);
  }
}
export function* todoSaga() {
  yield takeLatest(todoActions.fetchTodoList, fetchTodoList);
}
