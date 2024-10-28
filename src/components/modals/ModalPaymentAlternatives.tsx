import {
  DButton,
  DModal,
  DQuickActionButton,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

export default function ModalPaymentAlternatives() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  return (
    <DModal
      name="modalPaymentAlternatives"
      centered
      staticBackdrop
    >
      <DModal.Body className="d-flex flex-column gap-2">
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
      </DModal.Body>
      <DModal.Footer actionPlacement="center">
        <DButton
          text={t('button.cancel')}
          variant="outline"
          onClick={closePortal}
        />
      </DModal.Footer>
    </DModal>
  );
}
