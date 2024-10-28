import { ComponentProps } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  i18nKey: string;
  values?: ComponentProps<typeof Trans>['values'];
  components?: ComponentProps<typeof Trans>['components'];
};

export default function VoucherDetail(
  {
    i18nKey,
    values,
    components,
  }: Props,
) {
  const { t } = useTranslation();

  if (components === undefined) {
    return <p className="m-0">{t(i18nKey, { ...values })}</p>;
  }

  return (
    <Trans
      i18nKey={i18nKey}
      values={values}
      components={components}
    />
  );
}
