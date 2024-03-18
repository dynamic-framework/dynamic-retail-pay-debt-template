import type { GenericAbortSignal } from 'axios';

import ApiClient from '../clients/apiClient';
import accountMapper from '../mappers/accountMapper';

import type { ApiAccount } from '../api-interface';
import { LoanAccount } from '../interface';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await ApiClient.request<Array<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example="CURRENT_ACCOUNT,REGULAR_SAVINGS"',
    },
  });
  return data.map((apiAccount: ApiAccount) => accountMapper(apiAccount));
}

export async function get(
  accountId: string,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiAccount>({
    url: '/loan/account',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: `code=200, example=${accountId}`,
    },
  });
  return accountMapper(data) as LoanAccount;
}
