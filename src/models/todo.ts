export interface Board {
  id: string;
  name: string;
  members: string[];
  status: number;
  description: string;
}
export interface Columns {
  [x: string]: any;
  boardId: string;
  label: string;
  creater: string;
  fullName: string;
}
