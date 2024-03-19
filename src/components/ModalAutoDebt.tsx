import { useTranslation } from 'react-i18next';
import {
  DButton,
  DModal,
  DModalHeader,
  DModalBody,
  DModalFooter,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';

import type { ModalProps } from '@dynamic-framework/ui-react';

import { getSelectedAccount } from '../store/selectors';
import { useAppSelector } from '../store/hooks';

import type { ModalAvailablePayload } from '../interface';

export default function ModalAutoDebt(
  {
    closeModal,
    payload: {
      isActive,
      onAccept,
    },
  }: ModalProps<ModalAvailablePayload['autoDebt']>,
) {
  const { t } = useTranslation();
  const account = useAppSelector(getSelectedAccount);
  const accountId = useMemo(() => account?.accountNumber.slice(-3), [account]);
  return (
    <DModal
      name="autoDebt"
      centered
      staticBackdrop
      className="d-block"
    >
      <DModalHeader
        showCloseButton
        onClose={() => closeModal()}
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
          pill
          theme="secondary"
          variant="outline"
          onClick={() => closeModal()}
        />
        <DButton
          className="flex-1 d-grid"
          text={isActive ? t('button.suspend') : t('button.authorize')}
          pill
          onClick={() => {
            onAccept(!isActive);
            closeModal();
          }}
        />
      </DModalFooter>
    </DModal>
  );
}
