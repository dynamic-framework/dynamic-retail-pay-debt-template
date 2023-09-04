import {
  MButton,
  MIcon,
  useFormatCurrency,
  useScreenshotWebShare,
  useScreenshotDownload,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import { liquidParser } from '@dynamic-framework/ui';

import { useAppSelector } from '../store/hooks';
import {
  getProductToPay,
  getResult,
} from '../store/selectors';
import errorHandler from '../utils/errorHandler';

export default function PaymentResult() {
  const productToPay = useAppSelector(getProductToPay);
  const result = useAppSelector(getResult);
  const { t } = useTranslation();
  const { shareRef, share } = useScreenshotWebShare();
  const { downloadRef, download } = useScreenshotDownload();
  const paymentDone = result?.status === 'completed';

  const { values: [amountUsedFormatted] } = useFormatCurrency(result?.amount || 0);

  const redirectToDashboard = () => {
    window.location.href = `${liquidParser.parse('{{site.url}}')}/${liquidParser.parse('{{vars.payments-path}}')}`;
  };

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="d-flex flex-column align-items-center gap-4">
        <div
          className="d-flex flex-column gap-4 bg-white rounded w-100"
          ref={(el) => {
            shareRef.current = el;
            downloadRef.current = el;
          }}
        >
          <div className="d-flex flex-column gap-2 align-items-center">
            <MIcon
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
              <div className="text-center px-2 py-3 bg-light rounded-1">
                <p className="text-gray fw-bold fs-3 mb-2">
                  {amountUsedFormatted}
                </p>
                <p className="subparagraph">
                  {t('result.moneyPaid')}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex flex-column px-3 gap-2">
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.paidTo')}</div>
                  <div className="col-6 text-end">{`${productToPay?.name ?? ''} ${productToPay?.productNumber.slice(-3) ?? ''}`}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transactionId')}</div>
                  <div className="col-6 text-end">{result?.id}</div>
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
              <div className="text-center px-3 py-2 bg-light rounded-1">
                <p>
                  {t('result.payErrorMessage', {
                    message: result?.name,
                  })}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex flex-column px-3 gap-2">
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.paidTo')}</div>
                  <div className="col-6 text-end">{`${productToPay?.name ?? ''} ${productToPay?.productNumber.slice(-3) ?? ''}`}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transactionId')}</div>
                  <div className="col-6 text-end">{result?.id}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.timeDate')}</div>
                  <div className="col-6 text-end">{DateTime.fromISO(result?.date ?? DateTime.now().toISO()).toFormat('MM/dd/yy, hh:mm a')}</div>
                </div>
              </div>
            </>
          )}
          <div className="d-flex gap-3 align-items-center justify-content-center">
            <MIcon
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
            <MButton
              onMClick={() => {
                share().catch(errorHandler);
              }}
              iconEnd="share"
              text={t('share')}
              theme="secondary"
              variant="link"
            />
          </div>
          <div className="col-6 d-flex justify-content-start">
            <MButton
              onMClick={() => {
                download().catch(errorHandler);
              }}
              iconEnd="download"
              text={t('download')}
              theme="secondary"
              variant="link"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          {!paymentDone && (
            <MButton
              className="flex-1 d-grid"
              text={t('button.retry')}
              theme="secondary"
              variant="outline"
              isPill
            />
          )}
          <MButton
            className={!paymentDone ? 'flex-1 d-grid' : ''}
            text={t('button.otherPayment')}
            theme="primary"
            isPill
            onMClick={redirectToDashboard}
          />
        </div>
      </div>
    </div>
  );
}
