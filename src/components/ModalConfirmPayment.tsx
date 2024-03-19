/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMemo } from 'react';
import {
  DButton,
  DModal,
  DModalHeader,
  DModalBody,
  DModalFooter,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { Trans, useTranslation } from 'react-i18next';

import type { ModalProps } from '@dynamic-framework/ui-react';

import classNames from 'classnames';
import { useAppSelector } from '../store/hooks';
import { getAmountUsed, getSelectedAccount } from '../store/selectors';
import usePayLoan from '../services/hooks/usePayLoan';

import type { ModalAvailablePayload } from '../interface';

const KEYS_PAYMENT_MESSAGE: Record<string, string> = {
  minimumOption: 'modal.pay.minimum',
  otherAmount: 'modal.pay.other',
  totalOption: 'modal.pay.total',
};

export default function ModalConfirmPayment(
  {
    closeModal,
    payload: {
      isAutoDebt,
      paymentType,
    },
  }: ModalProps<ModalAvailablePayload['confirmPayment']>,
) {
  const { t } = useTranslation();
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const { loading, callback: payDebt } = usePayLoan();
  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed);

  const keyPaymentMessage = useMemo<string>(
    () => KEYS_PAYMENT_MESSAGE[paymentType],
    [paymentType],
  );

  const handlePaid = async () => {
    await payDebt();
    closeModal();
  };

  const confirmationBody = useMemo(() => {
    if (!selectedAccount) {
      return '';
    }
    return (
      <Trans
        i18nKey={keyPaymentMessage}
        components={{ b: <strong /> }}
        values={{
          mask: selectedAccount.accountNumber.slice(-3),
        }}
      />
    );
  }, [keyPaymentMessage, selectedAccount]);

  return (
    <DModal
      name="modalConfirmPayment"
      centered
      staticBackdrop
      className="d-block"
    >
      <DModalHeader
        showCloseButton
        onClose={() => closeModal()}
      >
        <h4 className="fw-bold fs-5">
          {t('modal.pay.title', { amount: amountUsedFormatted })}
        </h4>
      </DModalHeader>
      <DModalBody>
        <div className="bg-gray-soft p-4 rounded-1">
          <p className={classNames({
            'mb-0': true,
            'pb-4': isAutoDebt,
          })}
          >
            {confirmationBody}
          </p>
          <p className="mb-0">
            {isAutoDebt
              ? t('modal.pay.autoDebt')
              : t('modal.pay.instantly')}
          </p>
        </div>
      </DModalBody>
      <DModalFooter>
        <DButton
          className="d-grid"
          text={t('button.cancel')}
          theme="secondary"
          variant="outline"
          onClick={() => closeModal()}
        />
        <DButton
          className="d-grid"
          loading={loading}
          text={t('button.pay')}
          theme="primary"
          onClick={handlePaid}
        />
      </DModalFooter>
    </DModal>
  );
}
