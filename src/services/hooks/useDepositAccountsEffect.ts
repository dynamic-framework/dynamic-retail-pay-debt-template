import { useEffect, useState } from 'react';

import { AccountRepository } from '../repositories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import { setAccounts } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { DepositAccount } from '../interface';

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
      } catch (error) {
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
