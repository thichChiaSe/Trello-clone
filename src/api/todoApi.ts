import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { Todo } from 'models/todo';
import axios from 'axios';
const todoApi = {
  getAll(params: ListParams): Promise<ListResponse<Todo>> {
    return axiosClient.get(apiLinks.todo.listTodo, { params });
  },
  getById(id: string): Promise<Todo> {
    return axiosClient.get(`${apiLinks.todo.getById}/${id}`);
  },
  add(data: Todo): Promise<Todo> {
    return axiosClient.post(apiLinks.todo.listTodo, data);
  },
  update(data: Todo): Promise<Todo> {
    const url = `${apiLinks.todo.listTodo}`;
    return axiosClient.put(url, data);
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.todo.listTodo}/${id}`);
  },
};

export default todoApi;
