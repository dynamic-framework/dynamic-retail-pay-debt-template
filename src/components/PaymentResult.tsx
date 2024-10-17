import {
  DButton,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { SITE_PATH, SITE_URL, VARS_FORMAT_DATE_FULL } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import {
  getAccountToPay,
  getAmountUsed,
  getResult,
} from '../store/selectors';

import { Voucher, VoucherDetail } from './voucher';

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
            <VoucherDetail
              i18nKey="result.paidTo"
              values={{ value: `${accountToPay?.name ?? ''} ${accountToPay?.accountNumber.slice(-3) ?? ''}` }}
            />
            <VoucherDetail
              i18nKey="result.transactionId"
              values={{ value: result?.repaymentId }}
            />
            <VoucherDetail
              i18nKey="result.timeDate"
              values={{
                value: DateTime
                  .fromISO(result?.date ?? DateTime.now().toISO()).toFormat(VARS_FORMAT_DATE_FULL),
              }}
            />
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
            <VoucherDetail
              i18nKey="result.paidTo"
              values={{ value: `${accountToPay?.name ?? ''} ${accountToPay?.accountNumber.slice(-3) ?? ''}` }}
            />
            <VoucherDetail
              i18nKey="result.transactionId"
              values={{ value: result?.repaymentId }}
            />
            <VoucherDetail
              i18nKey="result.timeDate"
              values={{
                value: DateTime
                  .fromISO(result?.date ?? DateTime.now().toISO()!).toFormat(VARS_FORMAT_DATE_FULL),
              }}
            />
          </div>
        </>
        )}
      </Voucher>

      <div className="d-flex flex-column flex-md-row-reverse justify-content-md-center align-items-md-center gap-4">
        {!paymentDone && (
          <DButton
            text={t('button.retry')}
            variant="outline"
          />
        )}
        <a
          className="btn btn-primary"
          href={`${SITE_URL}/${SITE_PATH.PAYMENTS}`}
        >
          {t('button.otherPayment')}
        </a>
        <a
          className="btn btn-outline-primary"
          href={`${SITE_URL}`}
        >
          {t('button.home')}
        </a>
      </div>
    </>
  );
}
