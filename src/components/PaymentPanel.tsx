/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  MButton,
  useFormatCurrency,
  useModalContext,
  useToast,
  MQuickActionButton,
  MInputCurrency,
  MQuickActionSelect,
  MQuickActionSwitch,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import usePaymentInput from '../hooks/usePaymentInput';
import { useAppSelector } from '../store/hooks';
import {
  getSelectedProduct,
  getDebt,
} from '../store/selectors';

export default function PaymentPanel() {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const { toast } = useToast();
  const selectedProduct = useAppSelector(getSelectedProduct);
  const debt = useAppSelector(getDebt);

  const {
    amount,
    setAmount,
  } = usePaymentInput(selectedProduct?.availableBalance);
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
    } else if (amount && selectedProduct && amount > selectedProduct.availableBalance) {
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

  if (!selectedProduct) {
    return null;
  }

  return (
    <>
      <div className="py-3">
        <div className="d-flex flex-column gap-3 mx-auto">
          <MQuickActionSelect
            {...debt.minimumPayment === amount && { isSelected: true }}
            mId="minimumOption"
            name="paymentOption"
            line1={t('shortcuts.minimum')}
            line2={minimumPayment}
            value="minimumOption"
            onMChange={(e: CustomEvent<string>) => setSelectedOption(e, debt.minimumPayment)}
          />
          {shortcut === 'minimumOption' && (
            <MQuickActionSwitch
              mId="automaticDebt"
              label={t('shortcuts.automaticDebt.title')}
              hint={t('shortcuts.automaticDebt.subtext')}
              isChecked={isAutoDebt}
              onMClick={() => {
                openModal('autoDebt', { payload: { onAccept: setIsAutoDebt, isActive: isAutoDebt } });
              }}
            />
          )}
          <MQuickActionSelect
            mId="otherAmountOption"
            name="paymentOption"
            line1={t('shortcuts.other')}
            line2={t('shortcuts.amount')}
            value="otherAmount"
            onMChange={(e: CustomEvent<string>) => setSelectedOption(e, 0)}
          />
          {shortcut === 'otherAmount' && (
            <MInputCurrency
              mId="debtInput"
              placeholder={t('currencyInput.placeholder')}
              labelIcon="currency-dollar"
              minValue={debt.minimumPayment}
              maxValue={selectedProduct.accountingBalance}
              onChange={(value) => setAmount(value)}
              value={amount}
            />
          )}
          <MQuickActionSelect
            {...debt.totalPayment === amount && { isSelected: true }}
            mId="totalOption"
            name="paymentOption"
            line1={t('shortcuts.total')}
            line2={totalPayment}
            value="totalOption"
            onMChange={(e: CustomEvent<string>) => setSelectedOption(e, debt.totalPayment)}
          />
          <MQuickActionButton
            className="shadow-none"
            representativeIcon="credit-card"
            line1={t('shortcuts.paymentAlternatives')}
            line2={t('paymentAlternatives.subtext')}
            onMClick={() => openModal('paymentAlternatives')}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <MButton
          text={t('button.pay')}
          isPill
          theme="primary"
          onMClick={handlePaymentClick}
        />
      </div>
    </>
  );
}
