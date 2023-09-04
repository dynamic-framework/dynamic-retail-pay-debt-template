import { useEffect, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setAccountToPay, setDebt } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useLoanInfo() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idAccountToPay = urlParams.get('account_id');
    if (!idAccountToPay) {
      return () => {};
    }
    const {
      perform,
      abort,
    } = AccountRepository.get('loan', idAccountToPay);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const accountToPay = await perform();
        const debt = {
          minimumPayment: accountToPay.loanDetails?.due || 0,
          totalPayment: accountToPay.loanDetails?.balances.owed || 0,
        };
        dispatch(setAccountToPay(accountToPay));
        dispatch(setDebt(debt));
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch]);

  return {
    loading,
  };
}
