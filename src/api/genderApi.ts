import { ListParams, ListResponse, Gender } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const genderApi = {
  getAll(params: ListParams): Promise<ListResponse<Gender>> {
    return axiosClient.get(apiLinks.gender.common, { params });
  },

  getById(id: string): Promise<Gender> {
    return axiosClient.get(`${apiLinks.gender.common}/${id}`);
  },

  add(data: Gender): Promise<Gender> {
    return axiosClient.post(apiLinks.gender.common, data);
  },
  addSyn(data: Gender): Promise<Gender> {
    return axiosClient.post(apiLinks.gender.common, { ...data, alias: [data.alias] });
  },
  update(data: Partial<Gender>): Promise<Gender> {
    const url = `${apiLinks.gender.common}`;
    return axiosClient.put(url, data);
  },
  updateSyn(data: Partial<Gender>): Promise<Gender> {
    const url = `${apiLinks.gender.common}`;
    return axiosClient.put(url, { ...data, alias: [data.alias] });
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.gender.common}/${id}`);
  },
};

export default genderApi;
