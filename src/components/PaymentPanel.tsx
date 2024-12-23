/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  useFormatCurrency,
  useDPortalContext,
  useDToast,
  DQuickActionButton,
  DInputCurrency,
  DQuickActionSelect,
  DQuickActionSwitch,
} from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import usePaymentInput from '../hooks/usePaymentInput';
import type { PortalAvailablePayload } from '../interface';
import { useAppSelector } from '../store/hooks';
import {
  getSelectedAccount,
  getDebt,
} from '../store/selectors';

export default function PaymentPanel() {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext<PortalAvailablePayload>();
  const { toast } = useDToast();
  const selectedAccount = useAppSelector(getSelectedAccount);
  const debt = useAppSelector(getDebt);

  const {
    amount,
    setAmount,
  } = usePaymentInput(selectedAccount?.balanceAvailable);

  const [isAutoDebt, setIsAutoDebt] = useState(false);
  const [shortcut, setShortcut] = useState('');

  const {
    values: [
      minimumPayment,
      totalPayment,
    ],
  } = useFormatCurrency(
    debt.minimumPayment,
    debt.totalPayment,
  );

  const setSelectedOption = (value: string, amountValue: number) => {
    setShortcut(value);
    setAmount(amountValue);
  };

  const openToast = useCallback((key: string) => {
    toast(
      {
        title: t(key),
        theme: 'info',
        soft: true,
      },
      {
        duration: 5000,
      },
    );
  }, [t, toast]);

  const handlePaymentClick = useCallback(() => {
    if (!amount) {
      openToast('toast.required');
      return;
    }

    if (amount && amount > debt.totalPayment) {
      openToast('toast.overpay');
      return;
    }

    if (amount && selectedAccount && amount > selectedAccount.balanceAvailable) {
      openToast('toast.insufficient');
      return;
    }

    openPortal('modalConfirmPayment', {
      isAutoDebt,
      paymentType: shortcut,
    });
  }, [
    amount,
    debt.totalPayment,
    isAutoDebt,
    openPortal,
    openToast,
    selectedAccount,
    shortcut,
  ]);

  if (!selectedAccount) {
    return null;
  }

  return (
    <>
      <div className="py-4">
        <div className="d-flex flex-column gap-4 mx-auto">
          <DQuickActionSelect
            {...debt.minimumPayment === amount && { isSelected: true }}
            id="minimumOption"
            name="paymentOption"
            className="align-items-start gap-0"
            line1={t('shortcuts.minimum')}
            line2={minimumPayment}
            value="minimumOption"
            onChange={(event) => setSelectedOption(event.currentTarget.value, debt.minimumPayment)}
          />
          {shortcut === 'minimumOption' && (
            <DQuickActionSwitch
              id="automaticDebt"
              className="align-items-start gap-0"
              label={t('shortcuts.automaticDebt.title')}
              hint={t('shortcuts.automaticDebt.subtext')}
              checked={isAutoDebt}
              onClick={() => {
                openPortal('modalAutoDebt', { onAccept: setIsAutoDebt, isActive: isAutoDebt });
              }}
            />
          )}
          <DQuickActionSelect
            id="otherAmountOption"
            name="paymentOption"
            className="align-items-start gap-0"
            line1={t('shortcuts.other')}
            line2={t('shortcuts.amount')}
            value="otherAmount"
            onChange={(event) => setSelectedOption(event.currentTarget.value, 0)}
          />
          {shortcut === 'otherAmount' && (
            <DInputCurrency
              id="debtInput"
              placeholder={t('currencyInput.placeholder')}
              labelIcon="currency-dollar"
              minValue={debt.minimumPayment}
              maxValue={selectedAccount.accountingBalance}
              onChange={(value) => setAmount(value)}
              value={amount}
            />
          )}
          <DQuickActionSelect
            {...debt.totalPayment === amount && { isSelected: true }}
            id="totalOption"
            name="paymentOption"
            className="align-items-start gap-0"
            line1={t('shortcuts.total')}
            line2={totalPayment}
            value="totalOption"
            onChange={(event) => setSelectedOption(event.currentTarget.value, debt.totalPayment)}
          />
          <DQuickActionButton
            className="shadow-none"
            representativeIcon="credit-card"
            line1={t('shortcuts.paymentAlternatives')}
            line2={t('paymentAlternatives.subtext')}
            onClick={() => openPortal('modalPaymentAlternatives', undefined)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <DButton
          text={t('button.pay')}
          theme="primary"
          onClick={handlePaymentClick}
        />
      </div>
    </>
  );
}
