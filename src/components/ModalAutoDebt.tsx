import { useTranslation } from 'react-i18next';
import {
  MButton,
  MModal,
  ModalProps,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { getSelectedProduct } from '../store/selectors';
import { useAppSelector } from '../store/hooks';

export default function ModalAutoDebt({
  closeModal,
  payload: {
    isActive,
    onAccept,
  },
}: ModalProps) {
  const { t } = useTranslation();
  const product = useAppSelector(getSelectedProduct);
  const accountId = useMemo(() => product?.productNumber.slice(-3), [product]);
  return (
    <MModal
      name="autoDebt"
      isCentered
      isStatic
      showCloseButton
      onMClose={() => closeModal()}
    >
      <div slot="header">
        <h4 className="fw-bold">
          {isActive ? t('modal.automaticDebt.offTitle') : t('modal.automaticDebt.onTitle')}
        </h4>
      </div>
      <div slot="body">
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
      </div>
      <div slot="footer">
        <MButton
          className="flex-1 d-grid"
          text={t('button.cancel')}
          isPill
          theme="secondary"
          variant="outline"
          onMClick={() => closeModal()}
        />
        <MButton
          className="flex-1 d-grid"
          text={isActive ? t('button.suspend') : t('button.authorize')}
          isPill
          onMClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            onAccept(!isActive);
            closeModal();
          }}
        />
      </div>
    </MModal>
  );
}
