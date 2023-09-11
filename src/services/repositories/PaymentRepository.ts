import { GenericAbortSignal } from 'axios';
import type { Transaction } from '../interface';

import ApiClient from '../ApiClient';

export async function payDebt(
  depositAccountId: string,
  loanAccountId: string,
  amount: number,
  notes: string,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Transaction>({
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

  return data;
}
