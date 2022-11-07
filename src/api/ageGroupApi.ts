import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { AgeGroup } from 'models/ageGroup';

const ageGroupApi = {
  getAll(params: ListParams): Promise<ListResponse<AgeGroup>> {
    return axiosClient.get(apiLinks.ageGroup.get, { params });
  },
  getById(id: string): Promise<AgeGroup> {
    return axiosClient.get(`${apiLinks.ageGroup.getById}/${id}`);
  },
  add(data: AgeGroup): Promise<AgeGroup> {
    return axiosClient.post(apiLinks.ageGroup.get, data);
  },
  addSyn(data: AgeGroup): Promise<AgeGroup> {
    return axiosClient.post(apiLinks.ageGroup.get, { ...data, alias: [data.alias] });
  },
  update(data: AgeGroup): Promise<AgeGroup> {
    const url = `${apiLinks.ageGroup.get}`;
    return axiosClient.put(url, data);
  },
  updateSyn(data: AgeGroup): Promise<AgeGroup> {
    const url = `${apiLinks.ageGroup.get}`;
    return axiosClient.put(url, { ...data, alias: [data.alias] });
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.ageGroup.get}/${id}`);
  },
};

export default ageGroupApi;
