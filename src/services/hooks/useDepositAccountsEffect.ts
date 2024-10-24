import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import { setAccounts, setSelectedAccount } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { DepositAccount } from '../interface';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useDepositAccountsEffect() {
  const [loading, setLoading] = useState(false);
  const accounts = useAppSelector(getAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const data = await AccountRepository.list({ abortSignal: abortController.signal });
        dispatch(setAccounts(data as Array<DepositAccount>));
        dispatch(setSelectedAccount(data[0] as DepositAccount));
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return {
    loading,
    accounts,
  };
}
