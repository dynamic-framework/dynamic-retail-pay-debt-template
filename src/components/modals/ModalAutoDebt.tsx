import {
  DAlert,
  DButton,
  DModal,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import type { PortalProps } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { PortalAvailablePayload } from '../../interface';
import { useAppSelector } from '../../store/hooks';
import { getSelectedAccount } from '../../store/selectors';

export default function ModalAutoDebt(
  {
    payload: {
      isActive,
      onAccept,
    },
  }: PortalProps<PortalAvailablePayload['modalAutoDebt']>,
) {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const account = useAppSelector(getSelectedAccount);
  const accountId = useMemo(() => account?.accountNumber.slice(-3), [account]);
  return (
    <DModal
      name="modalAutoDebt"
      staticBackdrop
      centered
    >
      <DModal.Header
        showCloseButton
        onClose={closePortal}
      >
        <h4>
          {isActive
            ? t('modal.automaticDebt.offTitle')
            : t('modal.automaticDebt.onTitle')}
        </h4>
      </DModal.Header>
      <DModal.Body className="d-flex flex-column gap-4">
        <DAlert theme="info">
          {!isActive
            ? <p className="mb-0">{t('modal.automaticDebt.onBody', { accountId })}</p>
            : <p className="mb-0">{t('modal.automaticDebt.offBody', { accountId })}</p>}
        </DAlert>

        <div className="text-center">
          {!isActive
            ? <p className="mb-0">{t('modal.automaticDebt.onAuthorize')}</p>
            : <p className="mb-0">{t('modal.automaticDebt.offAuthorize')}</p>}
        </div>
      </DModal.Body>
      <DModal.Footer>
        <DButton
          text={t('button.cancel')}
          variant="outline"
          onClick={closePortal}
        />
        <DButton
          text={isActive ? t('button.suspend') : t('button.authorize')}
          onClick={() => {
            onAccept(!isActive);
            closePortal();
          }}
        />
      </DModal.Footer>
    </DModal>
  );
}
