const userModule = 'https://auth.quanlyhiv.vn/api';
const data = 'http://202.78.227.174:9091/swagger/index.html';
export const apiLinks = {
  auth: {
    login: `${userModule}/Users/Login`,
    changePassword: `${userModule}/Users/ChangePassword`,
    getUserInfo: `${userModule}/Users/GetUserInfo`,
  },
  todo: {
    listTodo: `${data}/api/Boards`,
    getById: (id: string) => {
      return `${data}/api/Boards/${id}`;
    },
  },
};
