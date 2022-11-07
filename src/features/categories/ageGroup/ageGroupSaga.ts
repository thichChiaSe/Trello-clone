import { PayloadAction } from '@reduxjs/toolkit';
import ageGroupApi from 'api/ageGroupApi';
import { ListParams, ListResponse } from 'models';
import { AgeGroup } from 'models/ageGroup';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { ageGroupActions } from './ageGroupSlice';

function* fetchAgeGroupList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<AgeGroup> = yield call(ageGroupApi.getAll, action.payload);
    yield put(ageGroupActions.fetchAgeGroupListSuccess(response));
  } catch (error) {
    yield put(ageGroupActions.fetchAgeGroupListFailed());
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(ageGroupActions.setFilter(action.payload));
}
export function* ageGroupSaga() {
  yield takeLatest(ageGroupActions.fetchAgeGroupList, fetchAgeGroupList);
  yield debounce(500, ageGroupActions.setFilterWithDebounce.type, handleSearchDebounce);
}
