/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  DButton,
  useFormatCurrency,
  useModalContext,
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

export default function PaymentPanel() {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const { toast } = useToast();
  const selectedAccount = useAppSelector(getSelectedAccount);
  const debt = useAppSelector(getDebt);

  const {
    amount,
    setAmount,
  } = usePaymentInput(selectedAccount?.availableBalance);
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

  const setSelectedOption = ({ detail }: CustomEvent<string>, value: number) => {
    setShortcut(detail);
    setAmount(value);
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
    } else if (amount && selectedAccount && amount > selectedAccount.availableBalance) {
      openToast('toast.insufficient');
    } else {
      openModal('confirmPayment', {
        payload: {
          isAutoDebt,
          paymentType: shortcut,
        },
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
            innerId="minimumOption"
            name="paymentOption"
            line1={t('shortcuts.minimum')}
            line2={minimumPayment}
            value="minimumOption"
            onEventChange={(e: CustomEvent<string>) => setSelectedOption(e, debt.minimumPayment)}
          />
          {shortcut === 'minimumOption' && (
            <DQuickActionSwitch
              innerId="automaticDebt"
              label={t('shortcuts.automaticDebt.title')}
              hint={t('shortcuts.automaticDebt.subtext')}
              isChecked={isAutoDebt}
              onEventClick={() => {
                openModal('autoDebt', { payload: { onAccept: setIsAutoDebt, isActive: isAutoDebt } });
              }}
            />
          )}
          <DQuickActionSelect
            innerId="otherAmountOption"
            name="paymentOption"
            line1={t('shortcuts.other')}
            line2={t('shortcuts.amount')}
            value="otherAmount"
            onEventChange={(e: CustomEvent<string>) => setSelectedOption(e, 0)}
          />
          {shortcut === 'otherAmount' && (
            <DInputCurrency
              innerId="debtInput"
              placeholder={t('currencyInput.placeholder')}
              labelIcon="currency-dollar"
              minValue={debt.minimumPayment}
              maxValue={selectedAccount.accountingBalance}
              onEventChange={(value) => setAmount(value)}
              value={amount}
            />
          )}
          <DQuickActionSelect
            {...debt.totalPayment === amount && { isSelected: true }}
            innerId="totalOption"
            name="paymentOption"
            line1={t('shortcuts.total')}
            line2={totalPayment}
            value="totalOption"
            onEventChange={(e: CustomEvent<string>) => setSelectedOption(e, debt.totalPayment)}
          />
          <DQuickActionButton
            className="shadow-none"
            representativeIcon="credit-card"
            line1={t('shortcuts.paymentAlternatives')}
            line2={t('paymentAlternatives.subtext')}
            onEventClick={() => openModal('paymentAlternatives')}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <DButton
          text={t('button.pay')}
          isPill
          theme="primary"
          onEventClick={handlePaymentClick}
        />
      </div>
    </>
  );
}
