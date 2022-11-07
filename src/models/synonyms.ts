export interface Synonyms {
  id: string;
  alias: [string];
  descriptions: string;
  order: number;
  lowestAge: number;
  olderAge: number;
  name: string;
  provinceID: string;
  siteCode: string;
  dateCreated: Date;
  districtID: string;
  searchValue: string;
  pageIndex: number;
  pageSize: number;
  slug: string;
  type: string;
  standardName: string;
  nameWithType: string;
  unit: string;
  code: string;
  provinceCode: string;
  path: string;
  pathWithType: string;
  centralLat: number;
  centralLon: number;
}
