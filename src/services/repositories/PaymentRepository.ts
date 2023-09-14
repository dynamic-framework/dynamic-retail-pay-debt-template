import { GenericAbortSignal } from 'axios';

import ApiClient from '../ApiClient';
import { ApiTransaction } from '../api-interface';
import transactionMapper from '../mappers/transactionMapper';

export async function payDebt(
  depositAccountId: string,
  loanAccountId: string,
  amount: number,
  notes: string,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiTransaction>({
    url: '/loan/repayment',
    method: 'POST',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200',
    },
    data: {
      depositAccountId,
      loanAccountId,
      amount,
      notes,
    },
  });

  return transactionMapper(data);
}
