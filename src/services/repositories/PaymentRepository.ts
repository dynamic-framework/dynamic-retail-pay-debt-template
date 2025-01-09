import { GenericAbortSignal } from 'axios';

import { ApiTransaction } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { Transaction } from '../interface';

export async function payDebt(
  depositAccountId: string,
  loanAccountId: string,
  amount: number,
  notes: string,
  config: { abortSignal: GenericAbortSignal },
) {
  await ApiClient.request<ApiTransaction>({
    url: 'generics',
    method: 'POST',
    signal: config.abortSignal,
    data: {
      depositAccountId,
      loanAccountId,
      amount,
      notes,
    },
  });

  const response: Transaction = {
    amount,
    date: new Date().toISOString(),
    name: 'Elo',
    repaymentId: '123',
    status: 'completed',
  };

  return response;
}
