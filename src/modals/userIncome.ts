export default interface IUserIncome {
  pageNum: number;
  pageSize: number;
  totalPage: number;
  total: number;
  list: IUserIncomeList[];
}

export interface IUserIncomeList {
  source: number;
  tradeTime: Date;
  type: number;
  value: number;
}
