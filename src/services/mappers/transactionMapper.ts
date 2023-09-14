import type { ApiTransaction } from '../api-interface';
import type { Transaction } from '../interface';

export default function transactionMapper(apiTransaction: ApiTransaction): Transaction {
  return {
    ...apiTransaction,
  };
}
