import { useStore } from '@nanostores/react';

import { getTranslation } from '@/i18n/utils';
import { $language } from '@/stores/language';

export function useTranslation() {
  const lang = useStore($language);
  return { t: getTranslation(lang), lang };
}
