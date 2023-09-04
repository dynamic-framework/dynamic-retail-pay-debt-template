import { useTranslation } from 'react-i18next';
import {
  MButton,
  MModal,
  MQuickActionButton,
  useModalContext,
} from '@dynamic-framework/ui-react';

export default function ModalPaymentAlternatives() {
  const { t } = useTranslation();
  const { closeModal } = useModalContext();

  return (
    <MModal
      name="paymentAlternatives"
      isCentered
      isStatic
    >
      <div
        slot="body"
      >
        <div className="payment-alternatives m-4 mb-0 d-flex flex-column">
          <MQuickActionButton
            line1={t('modal.paymentAlternatives.skip')}
            line2={t('modal.paymentAlternatives.skipLabel')}
          />
          <MQuickActionButton
            line1={t('modal.paymentAlternatives.flexible')}
            line2={t('modal.paymentAlternatives.flexibleLabel')}
          />
          <MQuickActionButton
            line1={t('modal.paymentAlternatives.renegotiate')}
            line2={t('modal.paymentAlternatives.renegotiateLabel')}
          />
        </div>
        <div className="m-4 d-flex justify-content-center">
          <MButton
            text={t('button.cancel')}
            theme="primary"
            isPill
            onMClick={() => closeModal()}
          />
        </div>
      </div>
    </MModal>
  );
}
