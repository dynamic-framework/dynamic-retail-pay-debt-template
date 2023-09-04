import { useEffect, useState } from 'react';

import { ProductRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getProducts } from '../store/selectors';
import {
  setProducts,
  setSelectedProduct,
} from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useDepositAccounts() {
  const [loading, setLoading] = useState(false);
  const products = useAppSelector(getProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = ProductRepository.list(['checking', 'saving']);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const accountsPayFrom = await perform();
        dispatch(setProducts(accountsPayFrom));
        dispatch(setSelectedProduct(accountsPayFrom[0]));
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
    products,
  };
}
