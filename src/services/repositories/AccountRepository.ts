import type { ApiAccount, ApiResponseWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { LoanAccount } from '../interface';
import accountMapper from '../mappers/accountMapper';

import { RepositoryParams } from './repository';

export async function list(
  params: RepositoryParams,
) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiAccount[]>>(
    {
      url: 'accounts/DEPOSIT',
      method: 'GET',
      signal: params.config?.abortSignal,
    },
  );

  return data.content.map((apiAccount: ApiAccount) => accountMapper(apiAccount));
}

export async function get(
  params: RepositoryParams<{
    accountId: string
  }>,
) {
  const { data } = await ApiClient.request<ApiResponseWrapped<ApiAccount>>({
    url: 'accounts/LOAN/CREDIT_CARD/account',
    method: 'GET',
    signal: params.config?.abortSignal,
    params: {
      account_id: params.accountId,
    },
  });
  return accountMapper(data.content) as LoanAccount;
}
