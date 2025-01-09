import type { ApiAccount } from '../api-interface';
import {
  AccountBaseType,
  ApiAccountTypeConfig,
} from '../config';
import type { Account } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): Account {
  const baseType = apiAccount.type.toLowerCase() as AccountBaseType;

  const commonProps = {
    id: apiAccount.id,
    name: apiAccount.account_holder_name,
    alias: apiAccount.account_name,
    accountNumber: apiAccount.number,
    type: ApiAccountTypeConfig[apiAccount.group],
  };

  if (baseType === AccountBaseType.Loan) {
    return {
      ...commonProps,
      baseType,
      balanceOwed: apiAccount.loan?.details.balance.owed as number,
      due: apiAccount.loan?.details.amount_due as number,
      paymentDueSinceDate: apiAccount.loan?.dates.due_since as string,
      balanceRemaining: apiAccount.loan?.details.balance.remaining as number,
    };
  }

  return {
    ...commonProps,
    baseType,
    accountingBalance: apiAccount.deposit?.balance.total as number,
    balanceAvailable: apiAccount.deposit?.balance.available.total as number,
  };
}
