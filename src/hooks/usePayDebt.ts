import { useCallback, useState } from 'react';

import { PaymentRepository } from '@modyo-dynamic/modyo-service-retail';

import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import errorHandler from '../utils/errorHandler';
import {
  getAmountUsed,
  getProductToPay,
  getSelectedProduct,
} from '../store/selectors';
import { setIsPaid, setResult } from '../store/slice';

export default function usePayDebt() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(getSelectedProduct);
  const productToPay = useAppSelector(getProductToPay);
  const amountUsed = useAppSelector(getAmountUsed);
  const { t } = useTranslation();

  const depositAccountId = selectedProduct?.id.toString() || '';
  const loanAccountId = productToPay?.id.toString() || '';
  const amount = amountUsed;
  const notes = t('paymentNote');

  const callback = useCallback(
    async () => {
      const { perform } = PaymentRepository.pay(
        depositAccountId,
        loanAccountId,
        amount,
        notes,
      );
      try {
        setLoading(true);
        const data = await perform();
        dispatch(setResult({
          id: data.withdrawalId,
          name: '',
          date: new Date().toISOString(),
          amount: amountUsed,
          status: 'completed',
        }));
        setLoading(false);
        dispatch(setIsPaid(true));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
        dispatch(setResult({
          id: '0',
          name: '',
          date: new Date().toISOString(),
          amount: amountUsed,
          status: 'failed',
        }));
      }
    },
    [amount, amountUsed, depositAccountId, dispatch, loanAccountId, notes],
  );

  return {
    loading,
    callback,
  };
}
