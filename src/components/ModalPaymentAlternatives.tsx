import { useTranslation } from 'react-i18next';
import {
  DButton,
  DModal,
  DModalBody,
  DQuickActionButton,
} from '@dynamic-framework/ui-react';

import type { ModalProps } from '@dynamic-framework/ui-react';

import type { ModalAvailablePayload } from '../interface';

export default function ModalPaymentAlternatives({ closeModal }: ModalProps<ModalAvailablePayload['paymentAlternatives']>) {
  const { t } = useTranslation();

  return (
    <DModal
      name="paymentAlternatives"
      className="d-block"
      centered
      staticBackdrop
    >
      <DModalBody className="p-0">
        <div className="payment-alternatives m-4 mb-0 d-flex flex-column">
          <DQuickActionButton
            line1={t('modal.paymentAlternatives.skip')}
            line2={t('modal.paymentAlternatives.skipLabel')}
          />
          <DQuickActionButton
            line1={t('modal.paymentAlternatives.flexible')}
            line2={t('modal.paymentAlternatives.flexibleLabel')}
          />
          <DQuickActionButton
            line1={t('modal.paymentAlternatives.renegotiate')}
            line2={t('modal.paymentAlternatives.renegotiateLabel')}
          />
        </div>
        <div className="m-4 d-flex justify-content-center">
          <DButton
            text={t('button.cancel')}
            theme="primary"
            pill
            onClick={() => closeModal()}
          />
        </div>
      </DModalBody>
    </DModal>
  );
}
