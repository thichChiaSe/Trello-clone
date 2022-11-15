//province model
export interface Province {
  id?: string;
  code: string;
  slug: string;
  type: string;
  name: string;
  alias: string[];
  standardName: string;
  nameWithType: string;
}
