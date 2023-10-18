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

export default function ModalAutoDebt(
  {
    closeModal,
    payload: {
      isActive,
      onAccept,
    },
  }: ModalProps,
) {
  const { t } = useTranslation();
  const account = useAppSelector(getSelectedAccount);
  const accountId = useMemo(() => account?.accountNumber.slice(-3), [account]);
  return (
    <DModal
      name="autoDebt"
      isCentered
      isStatic
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
      <DModalBody>
        <div className="bg-gray-soft mx-4 p-3 rounded-1">
          {!isActive
            ? <p className="">{t('modal.automaticDebt.onBody', { accountId })}</p>
            : <p className="">{t('modal.automaticDebt.offBody', { accountId })}</p>}
        </div>
        <div className="mx-4 p-3 pb-6">
          {!isActive
            ? <p>{t('modal.automaticDebt.onAuthorize')}</p>
            : <p>{t('modal.automaticDebt.offAuthorize')}</p>}
        </div>
      </DModalBody>
      <DModalFooter>
        <DButton
          className="flex-1 d-grid"
          text={t('button.cancel')}
          isPill
          theme="secondary"
          variant="outline"
          onClick={() => closeModal()}
        />
        <DButton
          className="flex-1 d-grid"
          text={isActive ? t('button.suspend') : t('button.authorize')}
          isPill
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onAccept(!isActive);
            closeModal();
          }}
        />
      </DModalFooter>
    </DModal>
  );
}
