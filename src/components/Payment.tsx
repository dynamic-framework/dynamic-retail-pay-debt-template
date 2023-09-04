/* eslint-disable react/jsx-props-no-spreading */
import {
  DCurrencyText,
  DInputSelect,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';

import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Account } from '../services/interface';
import { setSelectedAccount } from '../store/slice';
import useDepositAccountsEffect from '../services/hooks/useDepositAccountsEffect';
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';

import {
  getAccountToPay,
  getDebt,
  getSelectedAccount,
} from '../store/selectors';

import PaymentPanel from './PaymentPanel';
import SkeletonLoader from './SkeletonLoader';

export default function Payment() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { accounts } = useDepositAccountsEffect();
  const selectedAccount = useAppSelector(getSelectedAccount);
  const accountToPay = useAppSelector(getAccountToPay);
  const debt = useAppSelector(getDebt);

  const {
    values: [
      amountAvailable,
    ],
  } = useFormatCurrency(
    selectedAccount?.depositDetails?.balances.available || 0,
  );

  const dateToPay = useMemo(
    () => accountToPay?.paymentDetails?.dueSinceDate,
    [accountToPay?.paymentDetails?.dueSinceDate],
  );

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <h6 className="text-gray-700 fw-bold pb-3">{t('paymentTitle')}</h6>
      {(!accountToPay || !accounts) && <SkeletonLoader />}
      {accountToPay && (
        <>
          <div className="d-flex flex-column gap-2 bg-indigo-soft p-3 mb-3 rounded-1">
            <div className="d-flex justify-content-between">
              <span>{t('paymentDate')}</span>
              <span>
                {dateToPay
                  ? DateTime.fromISO(dateToPay).toFormat('MM/dd/yy')
                  : t('noDate')}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>{t('minimumPayment')}</span>
              <DCurrencyText
                className="fw-bold"
                value={debt.minimumPayment}
              />
            </div>
          </div>
          <div>
            <DInputSelect
              class="mb-1"
              innerId="selectAccount"
              label={t('payFromLabel')}
              labelExtractor={({ name, accountNumber }: Account) => `${name} *** ${accountNumber.slice(-3)}`}
              valueExtractor={({ id }: Account) => id}
              selectedOption={selectedAccount}
              options={accounts}
              onEventChange={({ detail: account }: CustomEvent<Account>) => {
                dispatch(setSelectedAccount(account));
              }}
              hint={t('available', { amount: amountAvailable })}
            />
            <PaymentPanel />
          </div>
        </>
      )}
    </div>
  );
}
