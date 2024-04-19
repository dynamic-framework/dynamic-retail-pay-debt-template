import { useTranslation } from 'react-i18next';
import {
  DButton,
  DModal,
  DModalHeader,
  DModalBody,
  DModalFooter,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';

import type { PortalProps } from '@dynamic-framework/ui-react';

import { getSelectedAccount } from '../store/selectors';
import { useAppSelector } from '../store/hooks';

import type { PortalAvailablePayload } from '../interface';

export default function ModalAutoDebt(
  {
    payload: {
      isActive,
      onAccept,
    },
  }: PortalProps<PortalAvailablePayload['autoDebtModal']>,
) {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const account = useAppSelector(getSelectedAccount);
  const accountId = useMemo(() => account?.accountNumber.slice(-3), [account]);
  return (
    <DModal
      name="autoDebtModal"
      centered
      staticBackdrop
      className="d-block"
    >
      <DModalHeader
        showCloseButton
        onClose={closePortal}
      >
        <h4 className="fw-bold">
          {isActive ? t('modal.automaticDebt.offTitle') : t('modal.automaticDebt.onTitle')}
        </h4>
      </DModalHeader>
      <DModalBody className="pt-0">
        <div className="bg-gray-soft p-4 rounded-1">
          {!isActive
            ? <p className="mb-0">{t('modal.automaticDebt.onBody', { accountId })}</p>
            : <p className="mb-0">{t('modal.automaticDebt.offBody', { accountId })}</p>}
        </div>
        <div className="mx-6 pt-4">
          {!isActive
            ? <p className="mb-0">{t('modal.automaticDebt.onAuthorize')}</p>
            : <p className="mb-0">{t('modal.automaticDebt.offAuthorize')}</p>}
        </div>
      </DModalBody>
      <DModalFooter>
        <DButton
          className="flex-1 d-grid"
          text={t('button.cancel')}
          theme="secondary"
          variant="outline"
          onClick={closePortal}
        />
        <DButton
          className="flex-1 d-grid"
          text={isActive ? t('button.suspend') : t('button.authorize')}
          onClick={() => {
            onAccept(!isActive);
            closePortal();
          }}
        />
      </DModalFooter>
    </DModal>
  );
}
