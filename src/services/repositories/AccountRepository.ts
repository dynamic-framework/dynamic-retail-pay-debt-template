import type { GenericAbortSignal } from 'axios';

import ApiClient from '../ApiClient';
import accountMapper from '../mappers/accountMapper';
import { AccountBaseType, ApiAccountTypeConfig } from '../config';

import type { ApiAccount } from '../api-interface';
import { LoanAccount } from '../interface';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await ApiClient.request<Array<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data
    // we make sure to only use accounts we can handle
    .filter((apiAccount: ApiAccount) => (
      Object.keys(ApiAccountTypeConfig).includes(apiAccount.accountType)
    ))
    // and we transform the account into the type of account that the widge uses
    .map((apiAccount: ApiAccount) => accountMapper(apiAccount));
}

export async function get(
  type: AccountBaseType,
  loanId: string,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<ApiAccount>({
    url: `/${type}/account`,
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: `code=200, example=${loanId}`,
    },
  });

  return accountMapper(data) as LoanAccount;
}
