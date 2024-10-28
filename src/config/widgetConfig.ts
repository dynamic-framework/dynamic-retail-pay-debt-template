import liquidParser from '../utils/liquidParser';

export const SITE_URL = liquidParser.parse('{{site.url}}');
export const SITE_LANG = liquidParser.parse('{{site.language}}');
export const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

export const VARS_FORMAT_DATE = liquidParser.parse('{{vars.format-date}}');
export const VARS_FORMAT_DATE_FULL = liquidParser.parse('{{vars.format-date-full}}');

export const SITE_PATH = {
  PAYMENTS: liquidParser.parse('{{vars.payments-path}}'),
};

export type SitePath = keyof typeof SITE_PATH;

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
};
