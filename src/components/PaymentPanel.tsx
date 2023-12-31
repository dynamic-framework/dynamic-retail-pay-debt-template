/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  DButton,
  useFormatCurrency,
  useDModalContext,
  useToast,
  DQuickActionButton,
  DInputCurrency,
  DQuickActionSelect,
  DQuickActionSwitch,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import usePaymentInput from '../hooks/usePaymentInput';
import { useAppSelector } from '../store/hooks';
import {
  getSelectedAccount,
  getDebt,
} from '../store/selectors';

import type { ModalAvailablePayload } from '../interface';

export default function PaymentPanel() {
  const { t } = useTranslation();
  const { openModal } = useDModalContext<ModalAvailablePayload>();
  const { toast } = useToast();
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

  const openToast = (key: string) => {
    toast(t(key), {
      type: 'info',
      showClose: true,
    });
  };

  const handlePaymentClick = () => {
    if (!amount) {
      openToast('toast.required');
    } else if (amount && amount > debt.totalPayment) {
      openToast('toast.overpay');
    } else if (amount && selectedAccount && amount > selectedAccount.balanceAvailable) {
      openToast('toast.insufficient');
    } else {
      openModal('confirmPayment', {
        isAutoDebt,
        paymentType: shortcut,
      });
    }
  };

  if (!selectedAccount) {
    return null;
  }

  return (
    <>
      <div className="py-3">
        <div className="d-flex flex-column gap-3 mx-auto">
          <DQuickActionSelect
            {...debt.minimumPayment === amount && { isSelected: true }}
            id="minimumOption"
            name="paymentOption"
            line1={t('shortcuts.minimum')}
            line2={minimumPayment}
            value="minimumOption"
            onChange={(event) => setSelectedOption(event.currentTarget.value, debt.minimumPayment)}
          />
          {shortcut === 'minimumOption' && (
            <DQuickActionSwitch
              id="automaticDebt"
              label={t('shortcuts.automaticDebt.title')}
              hint={t('shortcuts.automaticDebt.subtext')}
              checked={isAutoDebt}
              onClick={() => {
                openModal('autoDebt', { onAccept: setIsAutoDebt, isActive: isAutoDebt });
              }}
            />
          )}
          <DQuickActionSelect
            id="otherAmountOption"
            name="paymentOption"
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
            onClick={() => openModal('paymentAlternatives', undefined)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <DButton
          text={t('button.pay')}
          pill
          theme="primary"
          onClick={handlePaymentClick}
        />
      </div>
    </>
  );
}
