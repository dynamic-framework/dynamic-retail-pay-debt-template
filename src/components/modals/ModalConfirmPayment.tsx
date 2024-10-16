import { useFormatCurrency } from '@dynamic-framework/ui-react';
import type { PortalProps } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import type { PortalAvailablePayload } from '../../interface';
import usePayLoan from '../../services/hooks/usePayLoan';
import { useAppSelector } from '../../store/hooks';
import { getAmountUsed, getSelectedAccount } from '../../store/selectors';
import { OtpModal } from '../otp';

const KEYS_PAYMENT_MESSAGE: Record<string, string> = {
  minimumOption: 'modal.pay.minimum',
  otherAmount: 'modal.pay.other',
  totalOption: 'modal.pay.total',
};

export default function ModalConfirmPayment(
  {
    payload: {
      isAutoDebt,
      paymentType,
    },
  }: PortalProps<PortalAvailablePayload['modalConfirmPayment']>,
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
    <OtpModal
      isLoading={loading}
      action={payDebt}
      title={t('modal.pay.title', { amount: amountUsedFormatted })}
    >
      <div className="bg-gray-50 p-4 rounded-1">
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
    </OtpModal>
  );
}
