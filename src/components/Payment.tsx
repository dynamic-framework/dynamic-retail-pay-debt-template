/* eslint-disable react/jsx-props-no-spreading */
import {
  MCurrencyText,
  MInputSelect,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import type { Product } from '@modyo-dynamic/modyo-service-retail';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import {
  useAppDispatch,
  useAppSelector,
} from '../store/hooks';

import {
  getDebt,
  getProductToPay,
  getSelectedProduct,
} from '../store/selectors';

import { setSelectedProduct } from '../store/slice';

import PaymentPanel from './PaymentPanel';
import SkeletonLoader from './SkeletonLoader';
import useDepositAccounts from '../hooks/useDepositAccounts';

export default function Payment() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { products } = useDepositAccounts();
  const selectedProduct = useAppSelector(getSelectedProduct);
  const productToPay = useAppSelector(getProductToPay);
  const debt = useAppSelector(getDebt);

  const {
    values: [
      amountAvailable,
    ],
  } = useFormatCurrency(
    selectedProduct?.depositDetails?.balances.available || 0,
  );

  const dateToPay = useMemo(
    () => productToPay?.paymentDetails?.dueSinceDate,
    [productToPay?.paymentDetails?.dueSinceDate],
  );

  return (
    <div className="p-3 bg-white rounded shadow-sm">
      <h6 className="text-gray-700 fw-bold pb-3">{t('paymentTitle')}</h6>
      {(!productToPay || !products) && <SkeletonLoader />}
      {productToPay && (
        <>
          <div className="d-flex flex-column gap-2 bg-indigo-soft p-3 mb-3 rounded-1">
            <div className="d-flex justify-content-between">
              <span>{t('paymentDate')}</span>
              <span>
                {dateToPay
                  ? DateTime.fromISO(dateToPay).toFormat('MM/dd/yy')
                  : t('noDate')}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>{t('minimumPayment')}</span>
              <MCurrencyText
                className="fw-bold"
                value={debt.minimumPayment}
              />
            </div>
          </div>
          <div>
            <MInputSelect
              class="mb-1"
              mId="selectAccount"
              label={t('payFromLabel')}
              labelExtractor={({ name, productNumber }: Product) => `${name} *** ${productNumber.slice(-3)}`}
              valueExtractor={({ id }: Product) => id}
              selectedOption={selectedProduct}
              options={products}
              onMChange={({ detail: product }: CustomEvent<Product>) => {
                dispatch(setSelectedProduct(product));
              }}
              hint={t('available', { amount: amountAvailable })}
            />
            <PaymentPanel />
          </div>
        </>
      )}
    </div>
  );
}
