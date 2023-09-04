import {
  AccountBaseType,
  ApiAccountTypeConfig,
} from '../config';

import type { ApiAccount } from '../api-interface';
import type { Account } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): Account {
  const baseType = apiAccount.type.toLowerCase() as AccountBaseType;

  const commonProps = {
    id: apiAccount.id,
    name: apiAccount.nickName,
    alias: apiAccount.nickName,
    accountNumber: apiAccount.accountNumber,
    type: ApiAccountTypeConfig[apiAccount.accountType],
  };

  if (baseType === AccountBaseType.Loan) {
    return {
      ...commonProps,
      baseType,
      balanceOwed: apiAccount.loanDetails?.balances.owed as number,
      balanceRemaining: apiAccount.loanDetails?.balances.remaining as number,
    };
  }

  return {
    ...commonProps,
    baseType,
    balanceAvailable: apiAccount.depositDetails?.balances.available as number,
  };
}
