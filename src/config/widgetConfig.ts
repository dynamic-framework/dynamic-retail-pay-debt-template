import liquidParser from '../utils/liquidParser';

export const SITE_URL = liquidParser.parse('{{site.url}}');
export const SITE_LANG = liquidParser.parse('{{site.language}}');

export const SITE_PATH = {
  PAYMENTS: liquidParser.parse('{{vars.payments-path}}'),
};

export type SitePath = keyof typeof SITE_PATH;
