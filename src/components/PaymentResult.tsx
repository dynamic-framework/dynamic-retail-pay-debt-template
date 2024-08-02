import {
  DButton,
  DIcon,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import useScreenshotDownload from '../hooks/useScreenshotDownload';
import useScreenshotWebShare from '../hooks/useScreenshotWebShare';
import { useAppSelector } from '../store/hooks';
import {
  getAccountToPay,
  getAmountUsed,
  getResult,
} from '../store/selectors';
import errorHandler from '../utils/errorHandler';
import WidgetUtils from '../utils/widgetUtils';

export default function PaymentResult() {
  const accountToPay = useAppSelector(getAccountToPay);
  const result = useAppSelector(getResult);
  const amountUsed = useAppSelector(getAmountUsed);

  const { t } = useTranslation();
  const { shareRef, share } = useScreenshotWebShare();
  const { downloadRef, download } = useScreenshotDownload();
  const paymentDone = result?.status === 'completed';

  const { format } = useFormatCurrency();
  const amountUsedFormatted = format(amountUsed);
  const { goToPath } = WidgetUtils();

  const redirectToDashboard = () => {
    goToPath('PAYMENTS');
  };

  return (
    <div className="bg-white rounded shadow-sm p-6">
      <div className="d-flex flex-column align-items-center gap-6">
        <div
          className="d-flex flex-column gap-6 bg-white rounded w-100"
          ref={(el) => {
            shareRef.current = el;
            downloadRef.current = el;
          }}
        >
          <div className="d-flex flex-column gap-2 align-items-center">
            <DIcon
              icon={paymentDone ? 'check-circle' : 'x-circle'}
              size="2rem"
              theme={paymentDone ? 'success' : 'danger'}
            />
            <h2 className="fs-5 fw-bold">
              {t(paymentDone ? 'result.paySuccess' : 'result.payFailed')}
            </h2>
          </div>
          {paymentDone && (
            <>
              <div className="text-center px-2 py-4 bg-secondary-soft rounded-1">
                <p className="text-gray fw-bold fs-3 mb-2">
                  {amountUsedFormatted}
                </p>
                <p className="sp mb-0">
                  {t('result.moneyPaid')}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex flex-column px-4 gap-2">
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.paidTo')}</div>
                  <div className="col-6 text-end">{`${accountToPay?.name ?? ''} ${accountToPay?.accountNumber.slice(-3) ?? ''}`}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transactionId')}</div>
                  <div className="col-6 text-end">{result?.repaymentId}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.timeDate')}</div>
                  <div className="col-6 text-end">{DateTime.fromISO(result?.date ?? DateTime.now().toISO()).toFormat('MM/dd/yy, hh:mm a')}</div>
                </div>
              </div>
            </>
          )}
          {!paymentDone && (
            <>
              <div className="text-center px-4 py-2 bg-light rounded-1">
                <p className="mb-0">
                  {t('result.payErrorMessage', {
                    message: result?.name,
                  })}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex flex-column px-4 gap-2">
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.paidTo')}</div>
                  <div className="col-6 text-end">{`${accountToPay?.name ?? ''} ${accountToPay?.accountNumber.slice(-3) ?? ''}`}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transactionId')}</div>
                  <div className="col-6 text-end">{result?.repaymentId}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.timeDate')}</div>
                  <div className="col-6 text-end">{DateTime.fromISO(result?.date ?? DateTime.now().toISO()!).toFormat('MM/dd/yy, hh:mm a')}</div>
                </div>
              </div>
            </>
          )}
          <div className="d-flex gap-4 align-items-center justify-content-center">
            <DIcon
              theme="secondary"
              icon="shield-check"
              size="1.5rem"
            />
            <small className="text-light-emphasis">
              {t('result.terms.text')}
              <span className="text-secondary ms-1">
                {t('result.terms.link')}
              </span>
            </small>
          </div>
        </div>
        <div className="row w-100">
          <div className="col-6 d-flex justify-content-end">
            <DButton
              onClick={() => {
                share().catch(errorHandler);
              }}
              iconEnd="share"
              text={t('share')}
              theme="secondary"
              variant="link"
            />
          </div>
          <div className="col-6 d-flex justify-content-start">
            <DButton
              onClick={() => {
                download().catch(errorHandler);
              }}
              iconEnd="download"
              text={t('download')}
              theme="secondary"
              variant="link"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-6 w-100">
          {!paymentDone && (
            <DButton
              className="flex-1 d-grid"
              text={t('button.retry')}
              theme="secondary"
              variant="outline"
            />
          )}
          <DButton
            className={!paymentDone ? 'flex-1 d-grid' : ''}
            text={t('button.otherPayment')}
            theme="primary"
            onClick={redirectToDashboard}
          />
        </div>
      </div>
    </div>
  );
}
