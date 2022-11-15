import { PayloadAction } from '@reduxjs/toolkit';
import districtsApi from 'api/districtApi';
import { ListParams, ListResponse } from 'models';
import { Districts } from 'models/district';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { districtsActions } from './districtSlice';

function* fetchDistrictsList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Districts> = yield call(districtsApi.getAll, action.payload);
    yield put(districtsActions.fetchDistrictsListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch key populations list', error);
    yield put(districtsActions.fetchDistrictsListFailed());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(districtsActions.setFilter(action.payload));
}

export function* districtsSaga() {
  yield takeLatest(districtsActions.fetchDistrictsList, fetchDistrictsList);

  yield debounce(500, districtsActions.setFilterWithDebounce.type, handleSearchDebounce);
}
