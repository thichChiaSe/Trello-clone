import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { Province } from 'models/province';

const provinceApi = {
  getAll(params: ListParams): Promise<ListResponse<Province>> {
    return axiosClient.get(apiLinks.province.common, { params });
  },

  getById(id: string): Promise<Province> {
    return axiosClient.get(`${apiLinks.province.common}/${id}`);
  },

  add(data: Province): Promise<Province> {
    return axiosClient.post(apiLinks.province.common, data);
  },
  addSyn(data: Province): Promise<Province> {
    return axiosClient.post(apiLinks.province.common, { data, alias: [...data.alias] });
  },
  update(data: Partial<Province>): Promise<Province> {
    const url = `${apiLinks.province.common}`;
    return axiosClient.put(url, data);
  },
  updateSyn(data: Partial<Province>): Promise<Province> {
    const url = `${apiLinks.province.common}`;
    return axiosClient.put(url, { ...data, alias: [data.alias] });
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.province.common}/${id}`);
  },
};

export default provinceApi;
