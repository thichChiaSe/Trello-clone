const userModule = 'https://auth.quanlyhiv.vn/api';
const data = 'http://202.78.227.174:9091/api';
const dataHubModule = 'https://datahub-api.bakco.vn/api';

export const apiLinks = {
  auth: {
    login: `${userModule}/Users/Login`,
    changePassword: `${userModule}/Users/ChangePassword`,
    getUserInfo: `${userModule}/Users/GetUserInfo`,
  },
  todo: {
    listTodo: `${data}/Boards`,
    getById: (id: string) => {
      return `${data}/Boards/${id}`;
    },
    columns: `${data}/Columns`,
  },
  site: {
    common: `${dataHubModule}/Sites`,
  },
  districts: {
    common: `${dataHubModule}/Districts`,
  },
  province: {
    common: `${dataHubModule}/Provinces`,
  },
};
