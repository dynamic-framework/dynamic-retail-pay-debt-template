import { useTranslation } from 'react-i18next';
import {
  DButton,
  DModal,
  DModalBody,
  DQuickActionButton,
  useDPortalContext,
} from '@dynamic-framework/ui-react';

export default function ModalPaymentAlternatives() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  return (
    <DModal
      name="modalPaymentAlternatives"
      className="d-block"
      centered
      staticBackdrop
    >
      <DModalBody className="p-0">
        <div className="payment-alternatives m-6 mb-0 d-flex flex-column">
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
        <div className="m-6 d-flex justify-content-center">
          <DButton
            text={t('button.cancel')}
            theme="primary"
            onClick={closePortal}
          />
        </div>
      </DModalBody>
    </DModal>
  );
}
