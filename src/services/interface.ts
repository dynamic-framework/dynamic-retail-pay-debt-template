import { AccountBaseType, AccountType } from './config';

export type BaseAccount<T extends AccountBaseType> = {
  id: string;
  name: string;
  alias?: string;
  accountNumber: string;
  type: AccountType;
  baseType: T;
};

export type DepositAccount = BaseAccount<AccountBaseType.Deposit> & {
  accountingBalance: number;
  balanceAvailable: number;
};

export type LoanAccount = BaseAccount<AccountBaseType.Loan> & {
  balanceOwed: number;
  balanceRemaining: number;
  dueSinceDate: string;
  due: number;
};

export type Account = DepositAccount | LoanAccount;

export type Transaction = {
  repaymentId: string;
  name: string;
  date: string;
  amount: number;
  status: string;
};
