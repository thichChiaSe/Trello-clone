import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { Districts } from 'models/district';

const districtsApi = {
  getAll(params: ListParams): Promise<ListResponse<Districts>> {
    return axiosClient.get(apiLinks.districts.common, { params });
  },

  getById(id: string): Promise<Districts> {
    return axiosClient.get(`${apiLinks.districts.common}/${id}`);
  },

  add(data: Districts): Promise<Districts> {
    return axiosClient.post(apiLinks.districts.common, data);
  },
  addSyn(data: Districts): Promise<Districts> {
    return axiosClient.post(apiLinks.districts.common, { ...data, alias: [data.alias] });
  },
  update(data: Partial<Districts>): Promise<Districts> {
    const url = `${apiLinks.districts.common}`;
    return axiosClient.put(url, data);
  },
  updateSyn(data: Partial<Districts>): Promise<Districts> {
    const url = `${apiLinks.districts.common}`;
    return axiosClient.put(url, { ...data, alias: [data.alias] });
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.districts.common}/${id}`);
  },
};

export default districtsApi;
