import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import authReducer from 'features/auth/authSlice';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { history } from 'utils';
import rootSaga from './rootSaga';

import changePasswordReducer from '../features/auth/changePasswordSlice';
import todoReducer from 'features/todo/todoSlice';
import districtsReducer from 'features/todo copy/components/tableList/district/districtSlice';
import provinceReducer from 'features/todo copy/components/tableList/province/provinceSlice';
import siteReducer from 'features/todo copy/components/tableList/site/siteSlice';
const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  changePassword: changePasswordReducer,
  todo: todoReducer,
  district: districtsReducer,
  province: provinceReducer,
  site: siteReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
