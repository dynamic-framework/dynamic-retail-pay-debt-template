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
    theme: 'danger',
    icon: 'cash-coin',
  },
  [AccountType.Saving]: {
    name: 'Savings',
    theme: 'info',
    icon: 'piggy-bank',
  },
  [AccountType.CreditCard]: {
    name: 'Credit Cards',
    theme: 'secondary',
    icon: 'credit-card',
  },
  [AccountType.Loan]: {
    name: 'Loans',
    theme: 'warning',
    icon: 'cash-stack',
  },
};

export const ApiAccountTypeConfig = {
  SAVINGS: AccountType.Saving,
  CHECKING: AccountType.Checking,
  LOAN: AccountType.Loan,
  CREDIT_CARD: AccountType.CreditCard,
};
