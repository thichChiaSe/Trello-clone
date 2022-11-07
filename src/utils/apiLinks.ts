const userModule = 'https://auth.quanlyhiv.vn/api'; //1
const dataHubModule = 'https://datahub-api.bakco.vn/api';

export const apiLinks = {
  drugHistory: {
    get: `${dataHubModule}/DrugUseAndStorages`,
    import: `${dataHubModule}/DrugUseAndStorages/ImportByExcel`,
  },
  auth: {
    login: `${userModule}/Users/Login`,
    changePassword: `${userModule}/Users/ChangePassword`,
    getUserInfo: `${userModule}/Users/GetUserInfo`,
  },
  drug: {
    listDrugs: `${dataHubModule}/Medicine`,
    deleteDrugs: `${dataHubModule}/Medicine/`,
    common: `${dataHubModule}/Medicine/`,
  },
  keyPopulation: {
    common: `${dataHubModule}/KeyPopulations`,
  },
  site: {
    common: `${dataHubModule}/Sites`,
  },
  art: {
    get: `${dataHubModule}/Art`,
    getById: (id: string) => {
      return `${dataHubModule}/Art`;
    },
    import: `${dataHubModule}`,
  },
  gender: {
    common: `${dataHubModule}/Gender`,
  },
  customer: {
    get: `${dataHubModule}/Customers`,
    getById: (id: string) => {
      return `${dataHubModule}/Customers/${id}`;
    },
    getByCode: (code: string) => {
      return `${dataHubModule}/Customers/Code/${code}`;
    },
  },
  testings: {
    get: `${dataHubModule}/Testings`,
    getById: (id: string) => {
      return `${dataHubModule}/Testings/${id}`;
    },
    import: `${dataHubModule}/Testings/ImportByExcel`,
  },
  preps: {
    get: `${dataHubModule}/PrEPs`,
    getById: (id: string) => {
      return `${dataHubModule}/PrEPs/${id}`;
    },
    import: `${dataHubModule}/PrEPs/ImportByExcel`,
  },

  reports: {
    report: `${dataHubModule}/Reports`,
    exportReports: `${dataHubModule}/Reports/ExportReports`,
    exportReportDetails: `${dataHubModule}/Reports/ExportReportDetails`,
    exportCustomers: `${dataHubModule}/Reports/ExportCustomers`,
    calculateReport: `${dataHubModule}/Reports/CalculateReport`,
  },
  ageGroup: {
    get: `${dataHubModule}/AgeGroups`,
    getById: (id: string) => {
      return `${dataHubModule}/AgeGroups/${id}`;
    },
  },
  districts: {
    common: `${dataHubModule}/Districts`,
  },
  province: {
    common: `${dataHubModule}/Provinces`,
  },
  synonyms: {},
};
