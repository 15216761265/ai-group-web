export default interface ILibraryList {
  total: number;
  list: ILibraryData[];
}

export interface ILibraryData {
  code: string;
  name: string;
  desc: string;
  create_time: string;
  update_time: string;
}
