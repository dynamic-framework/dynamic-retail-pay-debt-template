import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccountToPay, getAmountUsed, getSelectedAccount } from '../../store/selectors';
import { setIsPaid, setResult } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { PaymentRepository } from '../repositories';

export default function usePayLoan() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const abortController = new AbortController();

  const selectedAccount = useAppSelector(getSelectedAccount);
  const accountToPay = useAppSelector(getAccountToPay);
  const amountUsed = useAppSelector(getAmountUsed);
  const { t } = useTranslation();

  const depositAccountId = selectedAccount?.id.toString() || '';
  const loanAccountId = accountToPay?.id.toString() || '';
  const amount = amountUsed;
  const notes = t('paymentNote');

  const callback = useCallback(
    async () => {
      try {
        setLoading(true);
        const data = await PaymentRepository.payDebt(
          depositAccountId,
          loanAccountId,
          amount,
          notes,
          { abortSignal: abortController.signal },
        );
        setLoading(false);
        dispatch(setResult(data));
        dispatch(setIsPaid(true));
      } catch (error) {
        errorHandler(error);
      }
    },
    [abortController.signal, amount, depositAccountId, dispatch, loanAccountId, notes],
  );

  return {
    loading,
    callback,
  };
}
