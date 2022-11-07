import { ListParams, ListResponse, ResponseMessage, Synonyms, Testing } from 'models';
import axiosClient from './axiosClient';
import { apiLinks } from 'utils';

const synonymsApi = {
  getAliasProvince(params: any): Promise<Synonyms> {
    // eslint-disable-next-line no-sequences
    return axiosClient.get(`${(apiLinks.synonyms, { params })}`);
  },
  // update(data: Partial<Synonyms>): Promise<Synonyms> {
  //   return)
  // },
};
export default synonymsApi;
