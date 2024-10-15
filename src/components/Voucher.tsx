import { DButton, DCard, DIcon } from '@dynamic-framework/ui-react';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import useScreenshotDownload from '../hooks/useScreenshotDownload';
import useScreenshotWebShare from '../hooks/useScreenshotWebShare';
import errorHandler from '../utils/errorHandler';

type Props = PropsWithChildren<{
  icon?: string;
  title: string;
  message: string;
  translate?: boolean;
  amount?: string;
}>;

export default function Voucher(
  {
    amount,
    icon = 'check-circle',
    title,
    message,
    translate,
    children,
  }: Props,
) {
  const { t } = useTranslation();
  const { shareRef, share } = useScreenshotWebShare();
  const { downloadRef, download } = useScreenshotDownload();

  return (
    <div
      className="mb-6"
      ref={(el) => {
        shareRef.current = el;
        downloadRef.current = el;
      }}
    >
      <DCard>
        <DCard.Body className="d-flex flex-column p-4 px-lg-16 py-lg-8 gap-6">
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <DIcon
              icon={icon}
              size="var(--bs-ref-spacer-8)"
              theme="success"
            />
            <div className="text-center">
              <h3 className="mb-2">{translate ? t(title) : title}</h3>
              <p className="m-0">{translate ? t(message) : message}</p>
            </div>
          </div>
          {amount && (
            <div className="bg-secondary-soft p-2 rounded-2">
              <p className="text-center text-gray fw-bold fs-3 m-0 p-0">
                {amount}
              </p>
            </div>
          )}

          <hr className="m-0" />
          {children}
          <hr className="m-0" />

          <div className="d-flex justify-content-center justify-content-sm-start gap-4">
            <DButton
              onClick={() => share().catch(errorHandler)}
              iconEnd="share"
              text={t('share')}
              variant="link"
              size="sm"
            />
            <DButton
              onClick={() => download().catch(errorHandler)}
              iconEnd="download"
              text={t('download')}
              variant="link"
              size="sm"
            />
          </div>
        </DCard.Body>
      </DCard>
    </div>
  );
}
