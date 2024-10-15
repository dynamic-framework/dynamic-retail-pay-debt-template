/* eslint-disable react/jsx-props-no-spreading */
import {
  DCard,
  DCurrencyText,
  DSelect,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useDepositAccountsEffect from '../services/hooks/useDepositAccountsEffect';
import type { DepositAccount } from '../services/interface';
import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';
import {
  getAccountToPay,
  getDebt,
  getSelectedAccount,
} from '../store/selectors';
import { setSelectedAccount } from '../store/slice';

import PaymentLoader from './loaders/PaymentLoader';
import PaymentPanel from './PaymentPanel';

export default function Payment() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { accounts } = useDepositAccountsEffect();
  const selectedAccount = useAppSelector(getSelectedAccount);
  const accountToPay = useAppSelector(getAccountToPay);
  const debt = useAppSelector(getDebt);

  const { format } = useFormatCurrency();

  const dateToPay = useMemo(
    () => accountToPay?.paymentDueSinceDate,
    [accountToPay?.paymentDueSinceDate],
  );

  return (
    <DCard>
      <DCard.Body>
        <h6 className="text-gray-700 fw-bold pb-4">{t('paymentTitle')}</h6>
        {(!accountToPay || !accounts) && <PaymentLoader />}
        {accountToPay && (
        <>
          <div className="d-flex flex-column gap-2 bg-secondary-soft p-4 mb-4 rounded-1">
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
          <DSelect
            label={t('payFromLabel')}
            options={accounts}
            getOptionValue={(account) => account.id}
            getOptionLabel={({ name, accountNumber }) => `${name} *** ${accountNumber.slice(-3)}`}
            onChange={(account) => dispatch(setSelectedAccount(account as DepositAccount))}
            value={selectedAccount}
            hint={t('available', { amount: format(selectedAccount?.balanceAvailable || 0) })}
            classNames={{ menu: () => 'mt-2' }}
          />
          <PaymentPanel />
        </>
        )}
      </DCard.Body>
    </DCard>
  );
}
