import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setAccountToPay, setDebt } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';
import getAccountIdQueryString from '../utils/getAccountIdQueryString';

export default function useLoanAccountEffect() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        const accountId = getAccountIdQueryString();
        setLoading(true);

        if (accountId) {
          const loanToPay = await AccountRepository.get(
            accountId,
            { abortSignal: abortController.signal },
          );
          const debt = {
            minimumPayment: loanToPay.due || 0,
            totalPayment: loanToPay.balanceOwed || 0,
          };
          dispatch(setAccountToPay(loanToPay));
          dispatch(setDebt(debt));
        }

        setLoading(false);
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
  };
}
