import liquidParser from '../utils/liquidParser';

export const SITE_URL = liquidParser.parse('{{site.url}}');
export const SITE_LANG = liquidParser.parse('{{site.language}}');
export const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

export const SITE_PATH = {
  PAYMENTS: liquidParser.parse('{{vars.payments-path}}'),
};

export type SitePath = keyof typeof SITE_PATH;

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
};
