import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Board, Columns } from 'models';
export interface TodoState {
  list: Board[];
  columns: Columns[];
  totalRows: number;
  totalPages: number;
  filter: ListParams;
  loading: boolean;
}

const initialState: TodoState = {
  loading: false,
  list: [],
  columns: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    name: '',
  },
  totalPages: 0,
  totalRows: 0,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetchTodoList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchTodoColumns(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },

    fetchTodoListSuccess(state, action: PayloadAction<ListResponse<Board>>) {
      state.list = action.payload.data;
      state.totalRows = action.payload.totalRows;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchTodoColumnsSuccess(state, action: PayloadAction<ListResponse<Columns>>) {
      state.columns = action.payload.data;
      console.log(
        '🚀 ~ file: todoSlice.ts ~ line 46 ~ fetchTodoColumnsSuccess ~ state.columns',
        state.columns
      );
      state.totalRows = action.payload.totalRows;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchTodoFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = {
        ...action.payload,
        name: action.payload.name,
      };
    },
  },
});

export const todoActions = todoSlice.actions;

export const selectTodoList = (state: RootState) => state.todo.list;
export const selectTodoColumns = (state: RootState) => state.todo.columns;
export const selectTodoLoading = (state: RootState) => state.todo.loading;
export const selectTodoFilter = (state: RootState) => state.todo.filter;
export const selectTodoTotalRow = (state: RootState) => state.todo.totalRows;
export const selectTodoTotalPages = (state: RootState) => state.todo.totalPages;

const todoReducer = todoSlice.reducer;
export default todoReducer;
