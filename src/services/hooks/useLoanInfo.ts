import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setAccountToPay, setDebt } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';
import getAccountIdQueryString from '../utils/getAccountIdQueryString';
import { AccountBaseType } from '../config';

export default function useLoanInfo() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      try {
        setLoading(true);
        const loanQueryId = getAccountIdQueryString();
        if (!loanQueryId) {
          return () => {};
        }
        const loanToPay = await AccountRepository.get(
          AccountBaseType.Loan,
          loanQueryId,
          { abortSignal: abortController.signal },
        );
        const debt = {
          minimumPayment: loanToPay.due || 0,
          totalPayment: loanToPay.balanceOwed || 0,
        };
        dispatch(setAccountToPay(loanToPay));
        dispatch(setDebt(debt));
        setLoading(false);
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
  };
}
