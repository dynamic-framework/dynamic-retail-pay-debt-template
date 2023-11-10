import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setAccountToPay, setDebt } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';
import getAccountIdQueryString from '../utils/getAccountIdQueryString';
import useWidgetUtils from '../../hooks/useWidgetUtils';

export default function useLoanAccountEffect() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { navigateTo } = useWidgetUtils();
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
        } else {
          navigateTo('PAYMENTS');
        }

        setLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch, navigateTo]);

  return {
    loading,
  };
}
