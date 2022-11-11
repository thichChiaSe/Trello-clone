export interface PaginationParams {
  pageSize: number;
  pageIndex: number;
  pageCount: number;
}
export interface ListResponse<T> {
  data: T[];
  errorMessage: string;
  totalPages: number;
  totalRows: number;
  succeed: boolean;
  pagination: PaginationParams;
}

export interface ResponseMessage<T> {
  data: T;
  errorMessage?: any;
  succeed: boolean;
}

export interface ListParams {
  name: string;
  pageIndex: number;
  pageSize: number;
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: any;
}

export interface RequestStatus {
  status?: number;
  index: number;
  message?: string;
}
