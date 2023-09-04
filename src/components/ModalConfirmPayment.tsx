/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  MButton,
  MModal,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import type { ModalProps } from '@dynamic-framework/ui-react';
import { Trans, useTranslation } from 'react-i18next';

import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';

import {
  getSelectedProduct,
  getAmountUsed,
} from '../store/selectors';
import usePayDebt from '../hooks/usePayDebt';

const KEYS_PAYMENT_MESSAGE: Record<string, string> = {
  minimumOption: 'modal.pay.minimum',
  otherAmount: 'modal.pay.other',
  totalOption: 'modal.pay.total',
};

export default function ModalConfirmPayment({
  closeModal,
  payload: {
    isAutoDebt,
    paymentType,
  },
}: ModalProps) {
  const { t } = useTranslation();
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const { loading, callback: payDebt } = usePayDebt();
  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed);

  const keyPaymentMessage = useMemo<string>(
    () => KEYS_PAYMENT_MESSAGE[paymentType as string],
    [paymentType],
  );

  const handlePaid = async () => {
    await payDebt();
    closeModal();
  };

  const confirmationBody = useMemo(() => {
    if (!selectedProduct) {
      return '';
    }
    return (
      <Trans
        i18nKey={keyPaymentMessage}
        components={{ b: <strong /> }}
        values={{
          mask: selectedProduct.productNumber.slice(-3),
        }}
      />
    );
  }, [keyPaymentMessage, selectedProduct]);

  return (
    <MModal
      name="modalConfirmPayment"
      isCentered
      isStatic
      showCloseButton
      onMClose={() => closeModal()}
    >
      <div slot="header">
        <h4 className="fw-bold fs-5">
          {t('modal.pay.title', { amount: amountUsedFormatted })}
        </h4>
      </div>
      <div slot="body">
        <div className="bg-gray-soft mx-4 mb-4 p-3 rounded-1">
          <p className={isAutoDebt ? 'pb-3' : ''}>{confirmationBody}</p>
          <p>
            {isAutoDebt
              ? t('modal.pay.autoDebt')
              : t('modal.pay.instantly')}
          </p>
        </div>
      </div>
      <div slot="footer">
        <MButton
          className="d-grid"
          text={t('button.cancel')}
          theme="secondary"
          variant="outline"
          isPill
          onMClick={() => closeModal()}
        />
        <MButton
          className="d-grid"
          isLoading={loading}
          text={t('button.pay')}
          theme="primary"
          isPill
          onMClick={handlePaid}
        />
      </div>
    </MModal>
  );
}
