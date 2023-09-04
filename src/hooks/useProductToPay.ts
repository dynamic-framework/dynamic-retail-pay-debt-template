import { useEffect, useState } from 'react';

import { ProductRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch } from '../store/hooks';
import {
  setDebt,
  setProductToPay,
} from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useProductToPay() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProductToPay = urlParams.get('product_id');
    if (!idProductToPay) {
      return () => {};
    }
    const {
      perform,
      abort,
    } = ProductRepository.get('loan', idProductToPay);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const productToPay = await perform();
        const debt = {
          minimumPayment: productToPay.loanDetails?.due || 0,
          totalPayment: productToPay.loanDetails?.balances.owed || 0,
        };
        dispatch(setProductToPay(productToPay));
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
