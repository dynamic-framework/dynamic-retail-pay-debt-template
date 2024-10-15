import {
  DButton,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { SITE_PATH, SITE_URL } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import {
  getAccountToPay,
  getAmountUsed,
  getResult,
} from '../store/selectors';

import Voucher from './Voucher';

export default function PaymentResult() {
  const accountToPay = useAppSelector(getAccountToPay);
  const result = useAppSelector(getResult);
  const amountUsed = useAppSelector(getAmountUsed);

  const { t } = useTranslation();
  const paymentDone = result?.status === 'completed';

  const { format } = useFormatCurrency();
  const amountUsedFormatted = format(amountUsed);

  return (
    <>
      <Voucher
        icon={paymentDone ? 'check-circle' : 'x-circle'}
        title={t(paymentDone ? 'result.paySuccess' : 'result.payFailed')}
        message="You will receive an invoice in the email associated with your account."
        amount={paymentDone ? amountUsedFormatted : undefined}
      >
        {paymentDone && (
          <div>
            <p className="m-0">
              {t(
                'result.paidTo',
                {
                  value: `${accountToPay?.name ?? ''} ${accountToPay?.accountNumber.slice(-3) ?? ''}`,
                },
              )}
            </p>
            <p className="m-0">
              {t(
                'result.transactionId',
                {
                  value: result?.repaymentId,
                },
              )}
            </p>
            <p className="m-0">
              {t(
                'result.timeDate',
                {
                  value: DateTime.fromISO(result?.date ?? DateTime.now().toISO()).toFormat('MM/dd/yy, hh:mm a'),
                },
              )}
            </p>
          </div>
        )}
        {!paymentDone && (
        <>
          <div className="text-center bg-secondary-soft px-2 py-4 rounded-2">
            <p className="text-center m-0">
              {t('result.payErrorMessage', { message: result?.name })}
            </p>
          </div>
          <hr className="m-0" />
          <div>
            <p className="m-0">
              {t(
                'result.paidTo',
                {
                  value: `${accountToPay?.name ?? ''} ${accountToPay?.accountNumber.slice(-3) ?? ''}`,
                },
              )}
            </p>
            <p className="m-0">
              {t(
                'result.transactionId',
                {
                  value: result?.repaymentId,
                },
              )}
            </p>
            <p className="m-0">
              {t(
                'result.timeDate',
                {
                  value: DateTime.fromISO(result?.date ?? DateTime.now().toISO()!).toFormat('MM/dd/yy, hh:mm a'),
                },
              )}
            </p>
          </div>
        </>
        )}
      </Voucher>

      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4">
        {!paymentDone && (
          <DButton
            text={t('button.retry')}
            variant="outline"
          />
        )}
        <a
          className="btn btn-outline-primary"
          href={`${SITE_URL}`}
        >
          {t('button.home')}
        </a>
        <a
          className="btn btn-primary"
          href={`${SITE_URL}/${SITE_PATH.PAYMENTS}`}
        >
          {t('button.otherPayment')}
        </a>
      </div>
    </>
  );
}
