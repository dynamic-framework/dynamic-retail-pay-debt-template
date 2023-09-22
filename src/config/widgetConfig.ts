import { liquidParser } from '@dynamic-framework/ui-react';

export const SITE_URL = liquidParser.parse('{{site.url}}');

export const SITE_PATH = {
  PAYMENTS: liquidParser.parse('{{vars.payments-path}}'),
};

export type SitePath = keyof typeof SITE_PATH;
