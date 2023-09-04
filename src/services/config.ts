export enum AccountBaseType {
  Deposit = 'deposit',
  Loan = 'loan',
}

export enum AccountType {
  Saving = 'saving',
  Checking = 'checking',
  CreditCard = 'credit-card',
  Loan = 'loan',
}

export const AccountTypeConfig = {
  [AccountType.Checking]: {
    name: 'Checking',
    theme: 'orange',
    icon: 'cash-coin',
  },
  [AccountType.Saving]: {
    name: 'Savings',
    theme: 'blue',
    icon: 'piggy-bank',
  },
  [AccountType.CreditCard]: {
    name: 'Credit Cards',
    theme: 'indigo',
    icon: 'credit-card',
  },
  [AccountType.Loan]: {
    name: 'Loans',
    theme: 'yellow',
    icon: 'cash-stack',
  },
};

export const ApiAccountTypeConfig = {
  REGULAR_SAVINGS: AccountType.Saving,
  CURRENT_ACCOUNT: AccountType.Checking,
  LOAN: AccountType.Loan,
  CREDIT_CARD: AccountType.CreditCard,
};
