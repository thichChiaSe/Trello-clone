import { ListParams, ListResponse } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';
import { Site } from 'models/site';

const siteApi = {
  getAll(params: ListParams): Promise<ListResponse<Site>> {
    return axiosClient.get(apiLinks.site.common, { params });
  },

  getById(id: string): Promise<Site> {
    return axiosClient.get(`${apiLinks.site.common}/${id}`);
  },

  add(data: Site): Promise<Site> {
    return axiosClient.post(apiLinks.site.common, data);
  },
  addSyn(data: Site): Promise<Site> {
    return axiosClient.post(apiLinks.site.common, { ...data, alias: [data.alias] });
  },
  update(data: Partial<Site>): Promise<Site> {
    const url = `${apiLinks.site.common}`;
    return axiosClient.put(url, data);
  },
  updateSyn(data: Partial<Site>): Promise<Site> {
    const url = `${apiLinks.site.common}`;
    return axiosClient.put(url, { ...data, alias: [data.alias] });
  },
  remove(id: string): Promise<any> {
    return axiosClient.delete(`${apiLinks.site.common}/${id}`);
  },
};

export default siteApi;
