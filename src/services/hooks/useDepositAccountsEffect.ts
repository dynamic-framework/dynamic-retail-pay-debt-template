import { useEffect, useState } from 'react';

import { AccountRepository } from '../repositories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import { setAccounts } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useDepositAccountsEffect() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getAccounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const response = await AccountRepository.list({ abortSignal: abortController.signal });
        setLoading(false);
        dispatch(setAccounts(response));
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
    data,
  };
}
