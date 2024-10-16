import { DButton } from '@dynamic-framework/ui-react';
import { Trans, useTranslation } from 'react-i18next';

import useCountdown from '../hooks/useCountDown';

type Props = {
  seconds: number;
};

export default function OtpCountDown(
  {
    seconds,
  }: Props,
) {
  const { secondsLeft, restartCountdown } = useCountdown(seconds);
  const { t } = useTranslation();

  return (
    <Trans
      i18nKey={secondsLeft > 0 ? 'otp.countdown' : 'otp.countdownResend'}
      values={{ value: secondsLeft }}
      components={{
        p: <p
          className="m-0"
        />,
        button: (
          <DButton
            text={t('otp.resend')}
            variant="link"
            className="p-0"
            onClick={() => restartCountdown()}
          />
        ),
      }}
    />
  );
}
