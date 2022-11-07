export interface History {
  customerId: string;
  type: string;
  id: string;
  isDeleted: boolean;
  dateCreated: Date;
}

export interface Customer {
  uid: number;
  name?: string;
  yoB: number;
  doB?: any;
  gender: number;
  phone?: any;
  cmnd: string;
  prEPCode: string;
  cardCode?: any;
  keyPopulationId: string;
  histories: History[];
  id: string;
  isDeleted: boolean;
  dateCreated: Date;
  codeARV: number;
  codeBHYT: number;
  job: string;
  passport: number;
  address: string;
  fistandlastname: string;
  ethnic: string;
  bhyt: string;
  ARVCode: string;
}
export interface CustomerDetail {
  drugName: string;
  details: CustomerSource[];
}
export interface CustomerSource {
  uid: number;
  fistandlastname: string;
  yoB: number;
  phone?: any;
  gender: number;
  cardCode?: any;
  passport: number;
  job: string;
  ethnic: string;
  address: string;
  bhyt: string;
  ARVCode: string;
}
