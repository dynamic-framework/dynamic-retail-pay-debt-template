import { useCallback } from 'react';
import { SITE_PATH, SITE_URL, SitePath } from '../config/widgetConfig';

export default function WidgetUtils() {
  const goToPath = useCallback((path: SitePath) => {
    window.location.href = `${SITE_URL}/${SITE_PATH[path]}`;
  }, []);

  return {
    goToPath,
  };
}
