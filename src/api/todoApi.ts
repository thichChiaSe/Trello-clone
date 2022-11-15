import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { Board, Columns } from 'models/todo';
import axios from 'axios';
const todoApi = {
  getAll(params: ListParams): Promise<ListResponse<Board>> {
    return axiosClient.get(apiLinks.todo.listTodo, { params });
  },
  getById(id: string): Promise<Board> {
    return axiosClient.get(`${apiLinks.todo.getById}`);
  },
  getColumns(params: ListParams): Promise<ListResponse<Columns>> {
    return axiosClient.get(apiLinks.todo.columns, { params });
  },
  add(data: Board): Promise<Board> {
    return axiosClient.post(apiLinks.todo.listTodo, data);
  },
  addColumns(data: Columns): Promise<Columns> {
    return axiosClient.post(apiLinks.todo.columns, data);
  },
  update(data: Board): Promise<Board> {
    const url = `${apiLinks.todo.listTodo}`;
    return axiosClient.put(url, data);
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.todo.listTodo}/${id}`);
  },
  // removeColums(id: string): Promise<any> {
  //   return axiosClient.delete(`${apiLinks.todo.listTodo}/${id}`);
  // },
};

export default todoApi;
