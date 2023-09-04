import { useTranslation } from 'react-i18next';
import {
  DButton,
  DModal,
  DQuickActionButton,
  useModalContext,
} from '@dynamic-framework/ui-react';

export default function ModalPaymentAlternatives() {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  return (
    <DModal
      name="paymentAlternatives"
      isCentered
      isStatic
    >
      <div
        slot="body"
      >
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
            isPill
            onEventClick={() => closeModal()}
          />
        </div>
      </div>
    </DModal>
  );
}
