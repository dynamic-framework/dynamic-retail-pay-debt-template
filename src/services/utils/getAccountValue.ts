import { AccountBaseType, AccountType } from '../config';

import type { Account } from '../interface';

export default function getAccountValue(account: Account): number {
  switch (account.baseType) {
    case AccountBaseType.Loan: {
      if (account.type === AccountType.Loan) {
        return account.balanceOwed || 0;
      }

      if (account.type === AccountType.CreditCard) {
        return account.balanceRemaining || 0;
      }

      return 0;
    }

    case AccountBaseType.Deposit: {
      return account.balanceAvailable || 0;
    }

    default: {
      return 0;
    }
  }
}
