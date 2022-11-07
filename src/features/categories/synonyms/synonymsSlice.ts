import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, Synonyms } from 'models';

export interface SynonymsState {
  loading: boolean;
  list: Synonyms[];
  filter: ListParams;
  pageCount: number;
  totalRow: number;
}
const initialState: SynonymsState = {
  loading: false,
  list: [],
  filter: {
    pageIndex: 0,
    pageSize: 10,
    search: '',
  },
  pageCount: 0,
  totalRow: 0,
};

const synonymsSlice = createSlice({
  name: 'synonyms',
  initialState,
  reducers: {
    // sử dụng PayloadAction để khai báo nội dụng của <ListParams>
    fetchSynonymsList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchSynonymsListSuccess(state, action: PayloadAction<ListResponse<Synonyms>>) {
      state.loading = false;
      state.pageCount = action.payload.pageCount;
      state.totalRow = action.payload.totalRow;
    }, // tạo models
    fetchSynonymsListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = {
        ...action.payload,
        pageIndex: action.payload.pageIndex > 0 ? action.payload.pageIndex - 1 : 0,
        searchName: action.payload.searchName,
      };
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {}, //??
  },
});

//Actions
export const synonymsActions = synonymsSlice;
// Selectors
export const selectSynonymsFilter = (state: RootState) => state.synonyms.filter;
export const selectSynonymsList = (state: RootState) => state.synonyms.list;
export const selectSynonymsLoading = (state: RootState) => state.synonyms.loading;
export const selectSynonymsPageCount = (state: RootState) => state.synonyms.pageCount;
export const selectSynonymsTotalRow = (state: RootState) => state.synonyms.totalRow;
// Reducer
const synonymsReducer = synonymsSlice.reducer;
export default synonymsReducer;
