export interface Board {
  id: string;
  name: string;
  members: string[];
  status: number;
  description: string;
}
export interface Columns {
  boardId: string;
  label: string;
}
